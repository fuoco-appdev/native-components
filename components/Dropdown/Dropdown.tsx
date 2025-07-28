import { BlurView } from '@react-native-community/blur';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Keyboard,
  LayoutRectangle,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewProps,
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
  AnimateProps,
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Button, ButtonStyles } from '../Button';
import { Portal } from '../Portal';
import { Globals } from '../Themes';

export enum DropdownAlignment {
  Left,
  Center,
  Right,
}

export interface DropdownStyles {
  root?: ViewStyle;
  dropdown?: ViewStyle;
  scrollView?: ViewStyle;
  backdrop?: ViewStyle;
}

export interface DropdownProps {
  id: string;
  open: boolean;
  anchorLayout: {
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  };
  dropdownWidth?: number;
  dropdownYOffset?: number;
  alignment?: DropdownAlignment;
  defaultSheetHeight?: number;
  duration?: number;
  customStyles?: DropdownStyles;
  customDarkStyles?: DropdownStyles;
  customLightStyles?: DropdownStyles;
  children?: React.ReactNode;
  gestureRefs?: React.MutableRefObject<any>[];
  onPanGestureRef?: (ref: GestureType) => void;
  onClose?: () => void;
}

const styles = StyleSheet.create<DropdownStyles>({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 24,
  },
  dropdown: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    borderRadius: Globals.rounded_lg,
    zIndex: 2,
  },
  backdrop: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  scrollView: {},
});
const lightStyles = StyleSheet.create<DropdownStyles>({
  dropdown: {
    backgroundColor: '#fff',
  },
});
const darkStyles = StyleSheet.create<DropdownStyles>({
  dropdown: {
    backgroundColor: '#121212',
  },
});

function Dropdown({
  customStyles,
  customDarkStyles,
  customLightStyles,
  anchorLayout,
  dropdownWidth = 144,
  dropdownYOffset = 144,
  alignment = DropdownAlignment.Left,
  duration = 75,
  id,
  open = false,
  gestureRefs,
  onPanGestureRef,
  children,
  onClose,
}: DropdownProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { height, width } = Dimensions.get('window');
  const [layout, setLayout] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const panGestureRef = React.useRef<GestureType>(Gesture.Pan());
  const scrollRef = React.useRef<any>();
  const onGestureEventRef = React.useRef<PanGesture>(Gesture.Pan());

  const scaleValue = useSharedValue(0);
  const elevationValue = useSharedValue(0);

  onGestureEventRef.current = Gesture.Pan()
    .withRef(panGestureRef)
    .simultaneousWithExternalGesture(scrollRef);

  const onAnimatedClose = () => {
    elevationValue.value = withTiming(0, {
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      duration: duration,
    });
    scaleValue.value = withTiming(
      0,
      { easing: Easing.bezier(0.0, 0.0, 0.2, 1), duration: duration },
      () => {
        if (onClose) {
          runOnJS(onClose)();
        }
        runOnJS(setIsOpen)(false);
      }
    );
  };

  const onAnimatedOpen = () => {
    elevationValue.value = withTiming(5, {
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      duration: duration,
    });
    scaleValue.value = withTiming(
      1,
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

  useEffect(() => {
    if (alignment === DropdownAlignment.Left) {
      const dropdownX = anchorLayout.pageX;
      const dropdownY = anchorLayout.pageY + anchorLayout.height;
      setLayout({
        x: Math.max(Math.min(dropdownX, width - dropdownWidth), 0),
        y: Math.max(Math.min(dropdownY, height - dropdownYOffset), 0),
      });
    } else if (alignment === DropdownAlignment.Right) {
      const dropdownX = anchorLayout.pageX + anchorLayout.width;
      const dropdownY = anchorLayout.pageY + anchorLayout.height;
      setLayout({
        x: Math.max(Math.min(dropdownX, width - dropdownWidth), 0),
        y: Math.max(Math.min(dropdownY, height - dropdownYOffset), 0),
      });
    } else if (alignment === DropdownAlignment.Center) {
      const dropdownX =
        anchorLayout.pageX - dropdownWidth / 2 + anchorLayout.width / 2;
      const dropdownY = anchorLayout.pageY + anchorLayout.height;
      setLayout({
        x: Math.max(Math.min(dropdownX, width - dropdownWidth), 0),
        y: Math.max(Math.min(dropdownY, height - dropdownYOffset), 0),
      });
    }
  }, [alignment, anchorLayout, dropdownYOffset]);

  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scaleValue.value,
      },
    ],
    elevation: elevationValue.value,
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

    if (isOpen) {
      onAnimatedOpen();
    }
  }, [isOpen]);

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
          <TouchableOpacity style={[{ flex: 1 }]} onPress={onAnimatedClose} />
        </Animated.View>
        <GestureDetector gesture={onGestureEventRef.current}>
          <Animated.View
            style={[
              ...(isDarkTheme
                ? [
                    {
                      ...darkStyles?.dropdown,
                      ...(customDarkStyles?.dropdown ?? {}),
                    },
                  ]
                : [
                    {
                      ...lightStyles?.dropdown,
                      ...(customLightStyles?.dropdown ?? {}),
                    },
                  ]),
              {
                ...styles.dropdown,
                ...(customStyles?.dropdown ?? {}),
                top: layout.y,
                left: layout.x,
                width: dropdownWidth,
              },
              sheetAnimatedStyle,
            ]}
          >
            {children}
          </Animated.View>
        </GestureDetector>
      </View>
    </Portal>
  );
}

export interface DropdownItemStyles {
  root?: ViewStyle;
}

export interface ExtraDropdownItemStyles {
  button?: ButtonStyles;
}

export interface DropdownItemProps {
  customStyles?: DropdownItemStyles;
  customLightStyles?: DropdownItemStyles;
  customDarkStyles?: DropdownItemStyles;
  customExtraStyles?: ExtraDropdownItemStyles;
  customExtraDarkStyles?: ExtraDropdownItemStyles;
  customExtraLightStyles?: ExtraDropdownItemStyles;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

const itemStyles = StyleSheet.create<DropdownItemStyles>({});
const itemLightStyles = StyleSheet.create<DropdownItemStyles>({});
const itemDarkStyles = StyleSheet.create<DropdownItemStyles>({});

function DropdownItem({
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  customExtraStyles = {},
  customExtraDarkStyles = {},
  customExtraLightStyles = {},
  children,
  icon,
  onPress,
}: DropdownItemProps) {
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

Dropdown.Item = DropdownItem;
export default Dropdown;
