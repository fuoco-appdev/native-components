import {
  FlexStyle,
  GestureResponderEvent,
  ImageStyle,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextStyle,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import Colors from '../Themes/colors';
import MarginsPaddings from '../Themes/margins_paddings';
import Globals from '../Themes/globals';
import { darkTheme } from '@storybook/react-native-theming';

export interface ButtonStyles {
  root?: ViewStyle | TextStyle | ImageStyle;
  button?: ViewStyle | TextStyle | ImageStyle;
  loading?: ViewStyle | TextStyle | ImageStyle;
  leftIconContainer?: ViewStyle | TextStyle | ImageStyle;
  rightIconContainer?: ViewStyle | TextStyle | ImageStyle;
  children?: ViewStyle | TextStyle | ImageStyle;
}

export interface ButtonProps {
  children?: React.ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
  pressableProps?: PressableProps;
  block?: boolean;
  customStyles?: ButtonStyles;
  customLightStyles?: ButtonStyles;
  customDarkStyles?: ButtonStyles;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge' | 'full';
  rounded?: boolean;
  type?:
    | 'primary'
    | 'default'
    | 'secondary'
    | 'outline'
    | 'dashed'
    | 'link'
    | 'text'
    | 'rounded';
  danger?: boolean;
  textAlign?: 'left' | 'center' | 'right';
}

const styles = StyleSheet.create<ButtonStyles>({
  root: {
    position: 'relative',
    height: 'auto',
    width: 'auto',
  },
  button: {
    position: 'relative',
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    paddingTop: MarginsPaddings.mp_4,
    paddingBottom: MarginsPaddings.mp_4,
    paddingLeft: MarginsPaddings.mp_6,
    paddingRight: MarginsPaddings.mp_6,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRadius: Globals.rounded_base,
    height: 'auto',
    width: 'auto',
    overflow: 'hidden',
  },
  loading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    minHeight: 21,
  },
  leftIconContainer: {},
  rightIconContainer: {
    marginLeft: MarginsPaddings.mp_4,
  },
  children: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
    textTransform: 'capitalize',
    fontSize: Globals.font_size_sm,
    fontWeight: Globals.font_weight_bold,
  },
});

const lightStyles = StyleSheet.create<ButtonStyles>({
  root: {},
  button: {},
  loading: {},
  leftIconContainer: {
    color: Colors.gray_900,
  },
  rightIconContainer: {
    color: Colors.gray_900,
  },
  children: {},
});

const darkStyles = StyleSheet.create<ButtonStyles>({
  root: {},
  button: {},
  loading: {},
  leftIconContainer: {
    color: Colors.gray_100,
  },
  rightIconContainer: {
    color: Colors.gray_100,
  },
  children: {
    color: Colors.gray_100,
  },
});

export function Button({
  pressableProps = {},
  onPress,
  block,
  danger,
  disabled = false,
  icon,
  iconRight,
  loading = false,
  loadingComponent,
  size = 'tiny',
  rounded = false,
  type = 'primary',
  textAlign = 'center',
  children,
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
}: ButtonProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const showIcon = loading || icon;

  let textStyle: TextStyle = {};
  let textDarkStyle: TextStyle = {};
  let textLightStyle: TextStyle = {};
  let typeStyle: ViewStyle = {};
  let typeDarkStyle: ViewStyle = {};
  let typeLightStyle: ViewStyle = {};
  if (type === 'primary') {
    typeLightStyle = {
      backgroundColor: Colors.brand_500,
    };
    typeDarkStyle = {
      backgroundColor: Colors.dark_2,
    };
    textLightStyle = {
      color: Colors.gray_100,
    };
    textDarkStyle = {
      color: Colors.gray_100,
    };
  } else if (type === 'dashed') {
    typeStyle = {
      borderStyle: 'dashed',
      borderWidth: 1,
    };
    textLightStyle = {
      color: Colors.gray_800,
    };
    textDarkStyle = {
      color: Colors.gray_200,
    };
    typeLightStyle = {
      backgroundColor: 'transparent',
      borderColor: Colors.gray_800,
    };
    typeDarkStyle = {
      backgroundColor: 'transparent',
      borderColor: Colors.gray_200,
    };
  } else if (type === 'default') {
    typeLightStyle = {
      backgroundColor: Colors.gray_100,
      borderColor: Colors.gray_200,
    };
    typeDarkStyle = {
      backgroundColor: Colors.dark_2,
      borderColor: Colors.gray_200,
    };
    textLightStyle = {
      color: Colors.gray_500,
    };
    textDarkStyle = {
      color: Colors.gray_100,
    };
  } else if (type === 'link') {
    typeLightStyle = {
      backgroundColor: 'transparent',
    };
    typeDarkStyle = {
      backgroundColor: 'transparent',
    };
    textLightStyle = {
      color: Colors.brand_600,
    };
    textDarkStyle = {
      color: Colors.gray_100,
    };
  } else if (type === 'outline') {
    typeStyle = {
      borderStyle: 'solid',
      borderWidth: 1,
    };
    typeLightStyle = {
      backgroundColor: 'transparent',
      borderColor: Colors.gray_900,
    };
    typeDarkStyle = {
      backgroundColor: 'transparent',
      borderColor: Colors.gray_200,
    };
    textLightStyle = {
      color: Colors.gray_900,
    };
    textDarkStyle = {
      color: Colors.gray_100,
    };
  } else if (type === 'rounded') {
    typeStyle = {
      borderRadius: Globals.rounded_full,
    };
    textLightStyle = {
      color: Colors.gray_900,
    };
    textDarkStyle = {
      color: Colors.gray_100,
    };
  } else if (type === 'secondary') {
    typeLightStyle = {
      backgroundColor: Colors.gray_600,
    };
    typeDarkStyle = {
      backgroundColor: Colors.dark_2,
    };
    textLightStyle = {
      color: Colors.gray_100,
    };
    textDarkStyle = {
      color: Colors.gray_100,
    };
  } else if (type === 'text') {
    typeLightStyle = {
      backgroundColor: 'transparent',
    };
    typeDarkStyle = {
      backgroundColor: 'transparent',
    };
    textLightStyle = {
      color: Colors.gray_900,
    };
    textDarkStyle = {
      color: Colors.gray_100,
    };
  }

  let sizeStyle: ViewStyle = {};
  let sizeWithChildrenStyle: TextStyle = {};
  if (size === 'tiny') {
    sizeStyle = {
      paddingTop: MarginsPaddings.mp_4,
      paddingBottom: MarginsPaddings.mp_4,
      paddingLeft: MarginsPaddings.mp_4,
      paddingRight: MarginsPaddings.mp_4,
    };
    sizeWithChildrenStyle = {
      paddingTop: MarginsPaddings.mp_3,
      paddingBottom: MarginsPaddings.mp_3,
      paddingLeft: MarginsPaddings.mp_5,
      paddingRight: MarginsPaddings.mp_5,
    };
    textStyle = {
      ...textStyle,
      fontSize: Globals.font_size_sm,
      lineHeight: Globals.font_line_height_sm,
    };
  } else if (size === 'small') {
    sizeStyle = {
      paddingTop: MarginsPaddings.mp_5,
      paddingBottom: MarginsPaddings.mp_5,
      paddingLeft: MarginsPaddings.mp_5,
      paddingRight: MarginsPaddings.mp_5,
    };
    sizeWithChildrenStyle = {
      paddingTop: MarginsPaddings.mp_4,
      paddingBottom: MarginsPaddings.mp_4,
      paddingLeft: MarginsPaddings.mp_6,
      paddingRight: MarginsPaddings.mp_6,
    };
    textStyle = {
      ...textStyle,
      fontSize: Globals.font_size_sm,
      lineHeight: Globals.font_line_height_sm,
    };
  } else if (size === 'medium') {
    sizeStyle = {
      paddingTop: MarginsPaddings.mp_7,
      paddingBottom: MarginsPaddings.mp_7,
      paddingLeft: MarginsPaddings.mp_7,
      paddingRight: MarginsPaddings.mp_7,
    };
    sizeWithChildrenStyle = {
      paddingTop: MarginsPaddings.mp_4,
      paddingBottom: MarginsPaddings.mp_4,
      paddingLeft: MarginsPaddings.mp_7,
      paddingRight: MarginsPaddings.mp_7,
    };
    textStyle = {
      ...textStyle,
      fontSize: Globals.font_size_sm,
      lineHeight: Globals.font_line_height_sm,
    };
  } else if (size === 'large') {
    sizeStyle = {
      paddingTop: MarginsPaddings.mp_10,
      paddingBottom: MarginsPaddings.mp_10,
      paddingLeft: MarginsPaddings.mp_10,
      paddingRight: MarginsPaddings.mp_10,
    };
    sizeWithChildrenStyle = {
      paddingTop: MarginsPaddings.mp_4,
      paddingBottom: MarginsPaddings.mp_4,
      paddingLeft: MarginsPaddings.mp_8,
      paddingRight: MarginsPaddings.mp_8,
    };
    textStyle = {
      ...textStyle,
      fontSize: Globals.font_size_sm,
      lineHeight: Globals.font_line_height_sm,
    };
  } else if (size === 'xlarge') {
    sizeStyle = {
      paddingTop: MarginsPaddings.mp_10,
      paddingBottom: MarginsPaddings.mp_10,
      paddingLeft: MarginsPaddings.mp_10,
      paddingRight: MarginsPaddings.mp_10,
    };
    sizeWithChildrenStyle = {
      paddingTop: MarginsPaddings.mp_5,
      paddingBottom: MarginsPaddings.mp_5,
      paddingLeft: MarginsPaddings.mp_8,
      paddingRight: MarginsPaddings.mp_8,
    };
    textStyle = {
      ...textStyle,
      fontSize: Globals.font_size_base,
      lineHeight: Globals.font_line_height_base,
    };
  } else if (size === 'full') {
    sizeStyle = {
      width: '100%',
      height: '100%',
    };
    sizeWithChildrenStyle = {
      width: '100%',
      height: '100%',
    };
    textStyle = {
      ...textStyle,
      fontSize: Globals.font_size_sm,
      lineHeight: Globals.font_line_height_sm,
    };
  }

  return (
    <View
      style={[
        styles.root,
        block && {
          width: '100%',
        },
        customStyles?.root ?? {},
        ...(isDarkTheme
          ? [darkStyles?.root, customDarkStyles?.root ?? {}]
          : [lightStyles?.root, customLightStyles?.root ?? {}]),
      ]}
    >
      <Pressable
        disabled={disabled}
        style={[
          styles.button,
          typeStyle,
          children ? sizeWithChildrenStyle : sizeStyle,
          rounded && {
            borderRadius: Globals.rounded_full,
          },
          danger && {
            borderColor: Colors.red_500,
          },
          customStyles?.button ?? {},
          ...(isDarkTheme
            ? [darkStyles.button, typeDarkStyle, customDarkStyles?.button ?? {}]
            : [
                lightStyles.button,
                typeLightStyle,
                customLightStyles?.button ?? {},
              ]),
        ]}
        onPress={onPress}
        android_ripple={{
          radius: rounded ? Globals.rounded_full : Globals.rounded_md,
          borderless: false,
          foreground: true,
          color: darkTheme
            ? 'rgba(255, 255, 255, 0.34)'
            : 'rgba(0, 0, 0, 0.34)',
        }}
        {...pressableProps}
      >
        <>
          {showIcon &&
            (loading ? (
              <View />
            ) : (
              icon && (
                <View
                  style={[
                    styles.leftIconContainer,
                    children !== undefined && {
                      marginRight: MarginsPaddings.mp_4,
                    },
                    customStyles?.leftIconContainer ?? {},
                    ...(isDarkTheme
                      ? [
                          darkStyles.leftIconContainer,
                          customDarkStyles?.leftIconContainer ?? {},
                        ]
                      : [
                          lightStyles.leftIconContainer,
                          customLightStyles?.leftIconContainer ?? {},
                        ]),
                  ]}
                >
                  {icon}
                </View>
              )
            ))}
          {loading && (
            <View
              style={[
                styles.loading,
                customStyles?.loading ?? {},
                ...(isDarkTheme
                  ? [darkStyles.loading, customDarkStyles?.loading ?? {}]
                  : [lightStyles.loading, customLightStyles?.loading ?? {}]),
              ]}
            >
              {loadingComponent}
            </View>
          )}
          {!loading && children && (
            <Text
              style={[
                styles.children,
                textStyle,
                danger && {
                  color: Colors.red_500,
                },
                customStyles?.children ?? {},
                ...(isDarkTheme
                  ? [
                      darkStyles.children,
                      textDarkStyle,
                      customDarkStyles?.children ?? {},
                    ]
                  : [
                      lightStyles.children,
                      textLightStyle,
                      customLightStyles?.children ?? {},
                    ]),
              ]}
            >
              {children}
            </Text>
          )}
          {iconRight && !loading && (
            <View
              style={[
                styles.rightIconContainer,
                children !== undefined && {
                  marginLeft: MarginsPaddings.mp_4,
                },
                customStyles?.rightIconContainer ?? {},
                ...(isDarkTheme
                  ? [
                      darkStyles.rightIconContainer,
                      customDarkStyles?.rightIconContainer ?? {},
                    ]
                  : [
                      lightStyles.rightIconContainer,
                      customLightStyles?.rightIconContainer ?? {},
                    ]),
              ]}
            >
              {iconRight}
            </View>
          )}
        </>
      </Pressable>
    </View>
  );
}
