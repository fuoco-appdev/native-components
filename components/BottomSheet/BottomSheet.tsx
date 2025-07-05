import { BlurView } from '@react-native-community/blur';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Keyboard,
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
    zIndex: 24,
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
  const { height } = Dimensions.get('window');
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [sheetHeight, setSheetHeight] = useState<number>(0);
  const panGestureRef = React.useRef<GestureType>(Gesture.Pan());
  const scrollRef = React.useRef<any>();
  const onGestureEventRef = React.useRef<PanGesture>(Gesture.Pan());

  const translateY = useSharedValue(height);
  const sheetHeightValue = useSharedValue(0);
  const isScrolling = useSharedValue(false);

  onGestureEventRef.current = Gesture.Pan()
    .onUpdate((event) => {
      if (isScrolling.value) {
        return;
      }

      translateY.value = Math.max(
        Math.min(event.translationY, sheetHeightValue.value),
        0
      );
    })
    .onEnd(() => {
      if (translateY.value < sheetHeightValue.value / 1.5) {
        translateY.value = withTiming(0, {
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
          duration: duration,
        });
      } else if (translateY.value > sheetHeightValue.value / 2) {
        if (onClose) {
          runOnJS(onClose)();
        }
        translateY.value = withTiming(
          sheetHeightValue.value,
          { easing: Easing.bezier(0.0, 0.0, 0.2, 1), duration: duration },
          () => {
            runOnJS(setIsOpen)(false);
          }
        );
      }
    })
    .withRef(panGestureRef)
    .simultaneousWithExternalGesture(scrollRef);

  const onAnimatedClose = () => {
    if (onClose) {
      runOnJS(onClose)();
    }
    translateY.value = withTiming(
      sheetHeight,
      { easing: Easing.bezier(0.0, 0.0, 0.2, 1), duration: duration },
      () => {
        runOnJS(setIsOpen)(false);
      }
    );
  };

  const onAnimatedOpen = () => {
    translateY.value = withTiming(
      0,
      { easing: Easing.bezier(0.0, 0.0, 0.2, 1), duration: duration },
      () => {}
    );
  };

  useEffect(() => {
    if (open && !isOpen) {
      setIsOpen(true);
    } else if (!open && isOpen) {
      setIsOpen(false);
    }
  }, [open, isOpen]);

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    maxHeight: sheetHeightValue.value,
  }));

  useEffect(() => {
    for (const ref of gestureRefs ?? []) {
      onGestureEventRef.current =
        onGestureEventRef.current?.simultaneousWithExternalGesture(ref);
    }
  }, [gestureRefs]);

  useEffect(() => {
    if (!isOpen) {
      onAnimatedClose();
      return;
    }

    if (sheetHeight > 0) {
      onAnimatedOpen();
    }
  }, [isOpen, sheetHeight]);

  useEffect(() => {
    onPanGestureRef?.(panGestureRef.current);
  }, [onPanGestureRef]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        if (scrollHeight > event.endCoordinates.height) {
          setSheetHeight(scrollHeight - event.endCoordinates.height);
        }
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (scrollHeight > 0) {
          setSheetHeight(scrollHeight);
        }
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [scrollHeight]);

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
            blurAmount={blurAmount ?? 5}
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
            {type === 'scroll-view' && (
              <ScrollView
                ref={scrollRef}
                simultaneousHandlers={panGestureRef}
                onScroll={(e) => {
                  isScrolling.value = e.nativeEvent.contentOffset.y > 0;
                }}
                style={[
                  {
                    maxHeight: sheetHeight > 0 ? sheetHeight : height * 0.6,
                  },
                ]}
                onContentSizeChange={(contentWidth, contentHeight) => {
                  setScrollHeight(Math.min(contentHeight, height * 0.6));
                  setSheetHeight(Math.min(contentHeight, height * 0.6));
                  sheetHeightValue.value = Math.min(
                    contentHeight,
                    height * 0.6
                  );
                }}
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
                  onScroll={(e) => {
                    isScrolling.value = e.nativeEvent.contentOffset.y > 0;
                  }}
                  style={[
                    {
                      maxHeight: sheetHeight > 0 ? sheetHeight : height * 0.6,
                    },
                  ]}
                  onContentSizeChange={(contentWidth, contentHeight) => {
                    setSheetHeight(Math.min(contentHeight, height * 0.6));
                    setScrollHeight(Math.min(contentHeight, height * 0.6));
                    sheetHeightValue.value = Math.min(
                      contentHeight,
                      height * 0.6
                    );
                  }}
                  simultaneousHandlers={panGestureRef}
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
