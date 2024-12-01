import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Button, ButtonStyles } from '../Button';
import { Portal } from '../Portal';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Globals } from '../Themes';
import { SpringConfig } from 'react-native-reanimated/lib/typescript/animation/springUtils';

export type SheetPositions = 'minimised' | 'maximised' | 'expanded';

export interface BottomSheetStyles {
  root?: ViewStyle;
  sheet?: ViewStyle;
  backdrop?: ViewStyle;
}

export interface BottomSheetProps {
  id: string;
  open: boolean;
  duration?: number;
  customStyles?: BottomSheetStyles;
  customDarkStyles?: BottomSheetStyles;
  customLightStyles?: BottomSheetStyles;
  children?: React.ReactNode;
  onClose?: () => void;
}

const styles = StyleSheet.create<BottomSheetStyles>({
  root: {
    height: '100%',
    width: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: Globals.rounded_md,
    borderTopLeftRadius: Globals.rounded_md,
    zIndex: 2,
  },
  backdrop: {
    height: '100%',
    width: '100%',
  },
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
  duration = 150,
  id,
  open = false,
  children,
  onClose,
}: BottomSheetProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const translateY = useSharedValue(0);
  const sheetHeight = useSharedValue(0);

  useEffect(() => {
    if (open && !isOpen) {
      setIsOpen(true);
    }
  }, [open]);

  const onAnimatedClose = () => {
    onClose?.();
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

  const onGestureEvent = Gesture.Pan()
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
    });

  return (
    <Portal name={id}>
      {isOpen && (
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
              height: Dimensions.get('screen').height,
              width: Dimensions.get('screen').width,
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
            <TouchableOpacity style={[{ flex: 1 }]} onPress={onAnimatedClose} />
          </Animated.View>
          <GestureDetector gesture={onGestureEvent}>
            <Animated.View
              onLayout={(e) => {
                sheetHeight.value = e.nativeEvent.layout.height;
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
                { ...styles.sheet, ...(customStyles?.sheet ?? {}) },
                sheetAnimatedStyle,
              ]}
            >
              {children}
            </Animated.View>
          </GestureDetector>
        </View>
      )}
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
