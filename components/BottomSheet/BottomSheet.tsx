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
  minHeight?: number;
  maxHeight?: number;
  expandedHeight?: number;
  springConfig?: SpringConfig;
  dragBuffer?: number;
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
  minHeight = 120,
  maxHeight = Dimensions.get('screen').height,
  expandedHeight = Dimensions.get('screen').height * 0.6,
  springConfig = {
    damping: 50,
    mass: 0.3,
    stiffness: 120,
    overshootClamping: true,
    restSpeedThreshold: 0.3,
    restDisplacementThreshold: 0.3,
  },
  dragBuffer = 40,
  duration = 150,
  id,
  open = false,
  children,
  onClose,
}: BottomSheetProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const screenHeight = Dimensions.get('screen').height;
  const translateY = useSharedValue(0);
  const sheetHeight = useSharedValue(0);
  const context = useSharedValue({
    y: 0,
  });

  useEffect(() => {
    if (open && !isOpen) {
      setIsOpen(true);
    }
  }, [open]);

  const onAnimatedClose = () => {
    onClose?.();
    translateY.value = withSpring(0, springConfig, () => {
      setIsOpen(false);
    });
  };

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    zIndex: open ? 1 : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  const onGestureEvent = Gesture.Pan()
    .onStart(() => {
      context.value = {
        y: translateY.value,
      };
    })
    .onUpdate((event) => {
      translateY.value = Math.max(
        event.translationY + context.value.y,
        sheetHeight.value
      );
    })
    .onEnd(() => {
      if (translateY.value < -sheetHeight.value / 1.5) {
        translateY.value = withSpring(-sheetHeight.value, springConfig);
      } else if (translateY.value > -sheetHeight.value / 2) {
        translateY.value = withSpring(0, springConfig);
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
            { ...styles.root, ...(customStyles?.root ?? {}) },
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
              backdropStyle,
            ]}
          >
            <TouchableOpacity style={[{ flex: 1 }]} onPress={onAnimatedClose} />
          </Animated.View>
          <GestureDetector gesture={onGestureEvent}>
            <Animated.View
              onLayout={(e) => {
                sheetHeight.value = e.nativeEvent.layout.height;
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
