import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  useColorScheme,
} from 'react-native';
import Colors from '../Themes/colors';

export interface ButtonStyles {
  root?: StyleSheet.NamedStyles<any>;
  button?: StyleSheet.NamedStyles<any>;
  loading?: StyleSheet.NamedStyles<any>;
  leftIconContainer?: StyleSheet.NamedStyles<any>;
  rightIconContainer?: StyleSheet.NamedStyles<any>;
  children?: StyleSheet.NamedStyles<any>;
}

export interface ButtonProps {
  children?: React.ReactNode;
  touchableOpacityProps?: TouchableOpacityProps;
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
  root: {},
  button: {},
  loading: {},
  leftIconContainer: {},
  rightIconContainer: {},
  children: {},
});

const lightStyles = StyleSheet.create<ButtonStyles>({
  root: {},
  button: {},
  loading: {},
  leftIconContainer: {},
  rightIconContainer: {},
  children: {},
});

const darkStyles = StyleSheet.create<ButtonStyles>({
  root: {},
  button: {},
  loading: {},
  leftIconContainer: {},
  rightIconContainer: {},
  children: {},
});

export function Button({
  touchableOpacityProps,
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
  console.log(isDarkTheme);
  const showIcon = loading || icon;

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
      <TouchableOpacity
        style={[
          styles.button,
          customStyles?.button ?? {},
          ...(isDarkTheme
            ? [
                darkStyles.button,
                type === 'primary' && {
                  backgroundColor: Colors.dark_2,
                },
                customDarkStyles?.button ?? {},
              ]
            : [lightStyles.button, customLightStyles?.button ?? {}]),
        ]}
        onPress={() => {}}
        activeOpacity={0.8}
        {...touchableOpacityProps}
      >
        {showIcon &&
          (loading ? (
            <View />
          ) : (
            icon && (
              <View
                style={[
                  styles.leftIconContainer,
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
              customStyles?.children ?? {},
              ...(isDarkTheme
                ? [darkStyles.children, customDarkStyles?.children ?? {}]
                : [lightStyles.children, customLightStyles?.children ?? {}]),
            ]}
          >
            {children}
          </Text>
        )}
        {iconRight && !loading && (
          <View
            style={[
              styles.rightIconContainer,
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
      </TouchableOpacity>
    </View>
  );
}
