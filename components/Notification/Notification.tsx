import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  useColorScheme,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  AnimateProps,
  runOnJS,
} from 'react-native-reanimated';
import { Colors, Globals, MarginsPaddings } from '../Themes';
import { Typography } from '../Typography';
import NotificationManager, { useNotification } from './NotificationManager';

export interface NotificationProps {
  title: string;
  message: string;
  top?: number;
  parentTop?: number;
  customStyles?: NotificationStyles;
  customLightStyles?: NotificationStyles;
  customDarkStyles?: NotificationStyles;
  index?: number;
  duration?: number;
  type?: 'info' | 'success' | 'warning' | 'error';
  calculatePosition?: (index: number, height: number) => void;
  hideNotification?: (index: number) => void;
}

export interface NotificationStyles {
  root?: ViewStyle;
}

const styles = StyleSheet.create<NotificationStyles>({
  root: {
    position: 'absolute',
    top: 0,
    left: MarginsPaddings.mp_5,
    right: MarginsPaddings.mp_5,
    padding: MarginsPaddings.mp_5,
    borderRadius: Globals.rounded_lg,
    borderWidth: 1,
    elevation: 1,
  },
});
const lightStyles = StyleSheet.create<NotificationStyles>({
  root: {
    backgroundColor: '#fff',
    borderColor: Colors.brand_900,
  },
});
const darkStyles = StyleSheet.create<NotificationStyles>({
  root: {
    backgroundColor: '#121212',
    borderColor: Colors.brand_100,
  },
});

function Notification({
  title,
  message,
  top = 0,
  parentTop = -1,
  customStyles,
  customDarkStyles,
  customLightStyles,
  index = 0,
  duration = 3000,
  type = 'info',
  calculatePosition,
  hideNotification,
}: NotificationProps) {
  const notificationContext = useNotification();
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const translateY = useSharedValue(-Dimensions.get('screen').height); // Starts off-screen at the top
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const stylesByType = {
    info: {},
    success: { borderColor: Colors.green_900 },
    warning: { borderColor: Colors.yellow_900 },
    error: { borderColor: Colors.red_900 },
  };

  useEffect(() => {
    if (currentIndex !== index) {
      const topWithPadding = top + MarginsPaddings.mp_5;
      translateY.value = withTiming(
        topWithPadding,
        {
          duration: 150,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        },
        () => {
          runOnJS(setCurrentIndex)(index);
        }
      );
    }

    const timeout = setTimeout(() => {
      const parentTopWithPadding = parentTop + MarginsPaddings.mp_5;
      translateY.value = withTiming(
        parentTopWithPadding,
        {
          duration: 150,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        },
        () => {
          if (hideNotification) {
            runOnJS(hideNotification)(index);
          }
        }
      );
    }, duration);
    return () => clearTimeout(timeout);
  }, [
    duration,
    translateY,
    index,
    top,
    notificationContext,
    hideNotification,
    parentTop,
    currentIndex,
  ]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value + MarginsPaddings.mp_3 * index },
      ],
    };
  });

  return (
    <Animated.View
      onLayout={(e) => {
        e.currentTarget.measure((x, y, width, height, pageX, pageY) => {
          calculatePosition?.(index, height);
        });
      }}
      style={[
        styles.root,
        customStyles?.root ?? {},
        ...(isDarkTheme
          ? [darkStyles?.root, customDarkStyles?.root ?? {}]
          : [lightStyles?.root, customLightStyles?.root ?? {}]),
        stylesByType[type],
        animatedStyles,
      ]}
    >
      <Typography.Title level={4}>{title}</Typography.Title>
      <Typography.Text>{message}</Typography.Text>
    </Animated.View>
  );
}

Notification.Manager = NotificationManager;

export default Notification;