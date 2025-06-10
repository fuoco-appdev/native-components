import React, { useEffect, useState } from 'react';
import {
  GestureResponderEvent,
  KeyboardAvoidingView,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import {
  FlatList,
  Gesture,
  GestureDetector,
  GestureType,
  PanGesture,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Button, ButtonStyles } from '../Button';
import { Portal } from '../Portal';
import { Globals } from '../Themes';
import { BlurView } from '@react-native-community/blur';

export type SheetPositions = 'minimised' | 'maximised' | 'expanded';

export interface BottomSheetStyles {
  root?: ViewStyle;
  sheet?: ViewStyle;
  backdrop?: ViewStyle;
  scrollView?: ViewStyle;
}

export interface BottomSheetProps {
  id: string;
  open: boolean;
  type?: 'scroll-view' | 'flat-list';
  defaultSheetHeight?: number;
  duration?: number;
  blurType?:
    | 'xlight'
    | 'light'
    | 'dark'
    | 'extraDark'
    | 'regular'
    | 'prominent';
  blurAmount?: number;
  reducedTransparencyFallbackColor?: string;
  overlayColor?: string;
  customStyles?: BottomSheetStyles;
  customDarkStyles?: BottomSheetStyles;
  customLightStyles?: BottomSheetStyles;
  children?: React.ReactNode;
  data?: ArrayLike<any> | null;
  gestureRefs?: React.MutableRefObject<any>[];
  onPanGestureRef?: (ref: GestureType) => void;
  renderItem?: ListRenderItem<any> | null;
  keyExtractor?: (item: any, index: number) => string;
  onClose?: () => void;
}

const styles = StyleSheet.create<BottomSheetStyles>({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  sheet: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: Globals.rounded_md,
    borderTopLeftRadius: Globals.rounded_md,
    zIndex: 2,
    maxHeight: '89%',
    flex: 1,
  },
  backdrop: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  scrollView: {},
});
const lightStyles = StyleSheet.create<BottomSheetStyles>({
  sheet: {
    backgroundColor: '#fff',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
  },
});
const darkStyles = StyleSheet.create<BottomSheetStyles>({
  sheet: {
    backgroundColor: '#121212',
  },
  backdrop: {
    backgroundColor: 'rgba(255, 255, 255, 0.34)',
  },
});

function BottomSheet({
  customStyles,
  customDarkStyles,
  customLightStyles,
  blurType,
  blurAmount,
  reducedTransparencyFallbackColor,
  overlayColor,
  type = 'scroll-view',
  duration = 150,
  defaultSheetHeight,
  id,
  open = false,
  data,
  gestureRefs,
  renderItem,
  keyExtractor,
  onPanGestureRef,
  children,
  onClose,
}: BottomSheetProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const panGestureRef = React.useRef<GestureType>(Gesture.Pan());
  const scrollRef = React.useRef<any>();
  const onGestureEventRef = React.useRef<PanGesture>();

  const translateY = useSharedValue(0);
  const sheetHeight = useSharedValue(defaultSheetHeight ?? 0);

  useEffect(() => {
    if (open && !isOpen) {
      setIsOpen(true);
    } else if (!open && isOpen) {
      onAnimatedClose();
    }
  }, [open, isOpen]);

  const onAnimatedClose = () => {
    if (onClose) {
      runOnJS(onClose)();
    }
    translateY.value = withTiming(
      sheetHeight.value,
      { easing: Easing.bezier(0.0, 0.0, 0.2, 1), duration: duration },
      () => {
        runOnJS(setIsOpen)(false);
      }
    );
  };

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  onGestureEventRef.current = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = Math.max(
        Math.min(event.translationY, sheetHeight.value),
        0
      );
    })
    .onEnd(() => {
      if (translateY.value < sheetHeight.value / 1.5) {
        translateY.value = withTiming(0, {
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          duration: duration,
        });
      } else if (translateY.value > sheetHeight.value / 2) {
        if (onClose) {
          runOnJS(onClose)();
        }
        translateY.value = withTiming(
          sheetHeight.value,
          { easing: Easing.bezier(0.0, 0.0, 0.2, 1), duration: duration },
          () => {
            runOnJS(setIsOpen)(false);
          }
        );
      }
    })
    .withRef(panGestureRef)
    .simultaneousWithExternalGesture(scrollRef);

  useEffect(() => {
    for (const ref of gestureRefs ?? []) {
      onGestureEventRef.current =
        onGestureEventRef.current?.simultaneousWithExternalGesture(ref);
    }
  }, [gestureRefs]);

  useEffect(() => {
    onPanGestureRef?.(panGestureRef.current);
  }, [onPanGestureRef]);

  return (
    <Portal name={id} visible={isOpen}>
      <View
        style={[
          ...(isDarkTheme
            ? [
                {
                  ...darkStyles?.root,
                  ...(customDarkStyles?.root ?? {}),
                },
              ]
            : [
                {
                  ...lightStyles?.root,
                  ...(customLightStyles?.root ?? {}),
                },
              ]),
          {
            ...styles.root,
            ...(customStyles?.root ?? {}),
          },
        ]}
      >
        <Animated.View
          style={[
            ...(isDarkTheme
              ? [
                  {
                    ...darkStyles?.backdrop,
                    ...(customDarkStyles?.backdrop ?? {}),
                  },
                ]
              : [
                  {
                    ...lightStyles?.backdrop,
                    ...(customLightStyles?.backdrop ?? {}),
                  },
                ]),
            { ...styles.backdrop, ...(customStyles?.backdrop ?? {}) },
          ]}
        >
          <BlurView
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
            blurType={blurType ?? 'light'}
            blurAmount={blurAmount ?? 10}
            reducedTransparencyFallbackColor={
              reducedTransparencyFallbackColor ?? 'white'
            }
            overlayColor={overlayColor ?? 'rgba(0, 0, 0, 0.13)'}
          />
          <TouchableOpacity style={[{ flex: 1 }]} onPress={onAnimatedClose} />
        </Animated.View>
        <GestureDetector gesture={onGestureEventRef.current}>
          <Animated.View
            onLayout={(e) => {
              sheetHeight.value = !defaultSheetHeight
                ? e.nativeEvent.layout.height
                : defaultSheetHeight;
              setTimeout(() => {
                translateY.value = withTiming(0, {
                  easing: Easing.bezier(0.4, 0.0, 0.2, 1),
                  duration: duration,
                });
              }, 75);
            }}
            style={[
              ...(isDarkTheme
                ? [
                    {
                      ...darkStyles?.sheet,
                      ...(customDarkStyles?.sheet ?? {}),
                    },
                  ]
                : [
                    {
                      ...lightStyles?.sheet,
                      ...(customLightStyles?.sheet ?? {}),
                    },
                  ]),
              {
                ...styles.sheet,
                ...(customStyles?.sheet ?? {}),
                ...(defaultSheetHeight && { height: defaultSheetHeight }),
              },
              sheetAnimatedStyle,
            ]}
          >
            <KeyboardAvoidingView behavior={'height'}>
              {type === 'scroll-view' && (
                <ScrollView
                  ref={scrollRef}
                  simultaneousHandlers={panGestureRef}
                  keyboardShouldPersistTaps={'always'}
                  contentContainerStyle={[
                    ...(isDarkTheme
                      ? [
                          {
                            ...darkStyles?.scrollView,
                            ...(customDarkStyles?.scrollView ?? {}),
                          },
                        ]
                      : [
                          {
                            ...lightStyles?.scrollView,
                            ...(customLightStyles?.scrollView ?? {}),
                          },
                        ]),
                    {
                      ...styles.scrollView,
                      ...(customStyles?.scrollView ?? {}),
                    },
                  ]}
                >
                  {children}
                </ScrollView>
              )}
              {type === 'flat-list' && (
                <>
                  {children}
                  <FlatList
                    ref={scrollRef}
                    simultaneousHandlers={panGestureRef}
                    keyboardShouldPersistTaps={'always'}
                    contentContainerStyle={[
                      ...(isDarkTheme
                        ? [
                            {
                              ...darkStyles?.scrollView,
                              ...(customDarkStyles?.scrollView ?? {}),
                            },
                          ]
                        : [
                            {
                              ...lightStyles?.scrollView,
                              ...(customLightStyles?.scrollView ?? {}),
                            },
                          ]),
                      {
                        ...styles.scrollView,
                        ...(customStyles?.scrollView ?? {}),
                      },
                    ]}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                  />
                </>
              )}
            </KeyboardAvoidingView>
          </Animated.View>
        </GestureDetector>
      </View>
    </Portal>
  );
}

export interface BottomSheetItemStyles {
  root?: ViewStyle;
}

export interface ExtraBottomSheetItemStyles {
  button?: ButtonStyles;
}

export interface BottomSheetItemProps {
  customStyles?: BottomSheetItemStyles;
  customLightStyles?: BottomSheetItemStyles;
  customDarkStyles?: BottomSheetItemStyles;
  customExtraStyles?: ExtraBottomSheetItemStyles;
  customExtraDarkStyles?: ExtraBottomSheetItemStyles;
  customExtraLightStyles?: ExtraBottomSheetItemStyles;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

const itemStyles = StyleSheet.create<BottomSheetItemStyles>({});
const itemLightStyles = StyleSheet.create<BottomSheetItemStyles>({});
const itemDarkStyles = StyleSheet.create<BottomSheetItemStyles>({});

function BottomSheetItem({
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  customExtraStyles = {},
  customExtraDarkStyles = {},
  customExtraLightStyles = {},
  children,
  icon,
  onPress,
}: BottomSheetItemProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  return (
    <View
      style={[
        ...(isDarkTheme
          ? [{ ...itemDarkStyles?.root, ...(customDarkStyles?.root ?? {}) }]
          : [{ ...itemLightStyles?.root, ...(customLightStyles?.root ?? {}) }]),
        { ...itemStyles.root, ...(customStyles?.root ?? {}) },
      ]}
    >
      <Button
        customStyles={customExtraStyles.button}
        customDarkStyles={customExtraDarkStyles.button}
        customLightStyles={customExtraLightStyles.button}
        block={true}
        type={'text'}
        size={'full'}
        onPress={onPress}
        icon={icon}
      >
        {children}
      </Button>
    </View>
  );
}

BottomSheet.Item = BottomSheetItem;
export default BottomSheet;
