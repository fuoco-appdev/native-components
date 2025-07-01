/* eslint-disable react/react-in-jsx-scope */
import {
  ImageStyle,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  useColorScheme,
  TextInput,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
  KeyboardTypeOptions,
  ColorValue,
  Keyboard,
  Platform,
  Dimensions,
  LayoutRectangle,
  Vibration,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Colors from '../Themes/colors';
import MarginsPaddings from '../Themes/margins_paddings';
import Globals from '../Themes/globals';
import Button, { ButtonStyles } from '../Button/Button';
import { FormLayout, FormLayoutStyles } from '../FormLayout/FormLayout';
import {
  ContentCopy,
  ErrorOutline,
  Visibility,
  VisibilityOff,
} from '../Icon/Icons/Line';
import React, { useEffect, useState } from 'react';
import Typography from '../Typography/Typography';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';

export interface InputStyles {
  root?: ViewStyle;
  container?: ViewStyle;
  backdrop?: ViewStyle;
  error?: ViewStyle | TextStyle | ImageStyle;
  withIcon?: ViewStyle | TextStyle | ImageStyle;
  borderless?: ViewStyle | TextStyle | ImageStyle;
  iconContainer?: ViewStyle | TextStyle | ImageStyle;
  input?: ViewStyle | TextStyle | ImageStyle;
  actionsContainer?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraInputStyles {
  formLayout?: FormLayoutStyles;
  revealButton?: ButtonStyles;
}

export interface InputIcons {
  reveal?: React.ReactNode;
  hiddenReveal?: React.ReactNode;
  copy?: React.ReactNode;
  error?: React.ReactNode;
}

export interface InputProps {
  autoComplete?:
    | 'additional-name'
    | 'address-line1'
    | 'address-line2'
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-middle-name'
    | 'cc-family-name'
    | 'cc-type'
    | 'country'
    | 'current-password'
    | 'email'
    | 'family-name'
    | 'gender'
    | 'given-name'
    | 'honorific-prefix'
    | 'honorific-suffix'
    | 'name'
    | 'name-family'
    | 'name-given'
    | 'name-middle'
    | 'name-middle-initial'
    | 'name-prefix'
    | 'name-suffix'
    | 'new-password'
    | 'nickname'
    | 'one-time-code'
    | 'organization'
    | 'organization-title'
    | 'password'
    | 'password-new'
    | 'postal-address'
    | 'postal-address-country'
    | 'postal-address-extended'
    | 'postal-address-extended-postal-code'
    | 'postal-address-locality'
    | 'postal-address-region'
    | 'postal-code'
    | 'street-address'
    | 'sms-otp'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-device'
    | 'url'
    | 'username'
    | 'username-new'
    | 'off';
  autoFocus?: boolean;
  popout?: boolean;
  blurType?:
    | 'xlight'
    | 'light'
    | 'dark'
    | 'extraDark'
    | 'regular'
    | 'prominent';
  blurAmount?: number;
  overlayColor?: string;
  reducedTransparencyFallbackColor?: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  type?: KeyboardTypeOptions;
  value?: string;
  customStyles?: InputStyles;
  customLightStyles?: InputStyles;
  customDarkStyles?: InputStyles;
  customExtraStyles?: ExtraInputStyles;
  customExtraDarkStyles?: ExtraInputStyles;
  customExtraLightStyles?: ExtraInputStyles;
  icons?: InputIcons;
  copy?: boolean;
  password?: boolean;
  defaultValue?: string;
  descriptionText?: string;
  disabled?: boolean;
  error?: string;
  icon?: any;
  inputRef?: React.RefObject<HTMLInputElement>;
  label?: string;
  afterLabel?: string;
  beforeLabel?: string;
  labelOptional?: string;
  reveal?: boolean;
  actions?: React.ReactNode;
  borderless?: boolean;
  shakeInterpolationCount?: number;
  shakeDistance?: number;
  textInputProps?: TextInputProps;
}

const styles = StyleSheet.create<InputStyles>({
  root: {
    position: 'relative',
    width: '100%',
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: Globals.rounded_md,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    width: '100%',
  },
  backdrop: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  error: {
    borderColor: Colors.red_500,
    borderWidth: 1,
    borderStyle: 'solid',
    fontFamily: Globals.font_family,
  },
  withIcon: {},
  borderless: {},
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: MarginsPaddings.mp_4,
  },
  input: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    paddingTop: MarginsPaddings.mp_4,
    paddingBottom: MarginsPaddings.mp_4,
    width: '100%',
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
    fontFamily: Globals.font_family,
  },
  actionsContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: MarginsPaddings.mp_4,
    top: 0,
    bottom: 0,
    right: 0,
    paddingRight: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
  },
});
const lightStyles = StyleSheet.create<InputStyles>({
  root: {},
  container: {
    backgroundColor: Colors.gray_100,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
  },
  error: {},
  withIcon: {},
  borderless: {},
  iconContainer: {
    color: Colors.gray_900,
  },
  input: {
    color: Colors.gray_900,
  },
  actionsContainer: {
    color: Colors.gray_900,
  },
});
const darkStyles = StyleSheet.create<InputStyles>({
  root: {},
  container: {
    backgroundColor: Colors.dark_1,
  },
  backdrop: {
    backgroundColor: 'rgba(255, 255, 255, 0.34)',
  },
  error: {},
  withIcon: {},
  borderless: {},
  iconContainer: {
    color: Colors.gray_100,
  },
  input: {
    color: Colors.gray_100,
  },
  actionsContainer: {
    color: Colors.gray_100,
  },
});

function Input({
  autoComplete,
  blurAmount,
  blurType,
  overlayColor,
  reducedTransparencyFallbackColor,
  autoFocus,
  popout = true,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  placeholderTextColor,
  value,
  type,
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  customExtraStyles = {},
  customExtraDarkStyles = {},
  customExtraLightStyles = {},
  icons,
  copy,
  password,
  defaultValue,
  descriptionText,
  disabled,
  error,
  icon,
  label,
  afterLabel,
  beforeLabel,
  labelOptional,
  reveal = false,
  actions,
  textInputProps,
}: InputProps) {
  const theme = useColorScheme();
  const [copyLabel, setCopyLabel] = useState('Copy');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState(password);
  const [containerLayout, setContainerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  }>();
  const [rootLayout, setRootLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  }>();
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const isDarkTheme = theme === 'dark';
  const { height, width } = Dimensions.get('window');
  const containerWidth = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const inputBottom = useSharedValue(0);
  const inputLeft = useSharedValue(0);

  const onCopy = (value: any) => {
    Clipboard.setString(value);
    setCopyLabel('Copied');
    setTimeout(() => {
      setCopyLabel('Copy');
    }, 3000);
  };

  const onReveal = () => {
    setIsHidden(!isHidden);
  };

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (popout) {
      zIndex.value = 12;
      containerWidth.value = width;
      Vibration.vibrate([0, 50], false);
    }
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (popout) {
      zIndex.value = 0;
      containerWidth.value = rootLayout?.width ?? 0;
    }
    setIsFocused(false);
    onBlur?.(e);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      elevation: zIndex.value,
      left: -inputLeft.value,
      bottom: -inputBottom.value,
      width: containerWidth.value,
    };
  });

  useEffect(() => {
    if (!popout) {
      return;
    }

    const keyboardWillShow = (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    };

    const keyboardWillHide = () => {
      setKeyboardHeight(0);
    };

    const showListener =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideListener =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(
      showListener,
      keyboardWillShow
    );
    const hideSubscription = Keyboard.addListener(
      hideListener,
      keyboardWillHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [popout]);

  useEffect(() => {
    if (!popout) {
      return;
    }

    if (keyboardHeight > 0) {
      inputBottom.value =
        height -
        keyboardHeight -
        (containerLayout?.height ?? 0) -
        (rootLayout?.pageY ?? 0);
      inputLeft.value = rootLayout?.pageX ?? 0;
    } else {
      inputBottom.value = 0;
      inputLeft.value = 0;
    }
  }, [keyboardHeight, containerLayout, rootLayout, popout]);

  return (
    <FormLayout
      label={label}
      afterLabel={afterLabel}
      beforeLabel={beforeLabel}
      labelOptional={labelOptional}
      error={error}
      descriptionText={descriptionText}
      customStyles={customExtraStyles.formLayout}
      customDarkStyles={customExtraDarkStyles.formLayout}
      customLightStyles={customExtraLightStyles.formLayout}
    >
      <View
        style={[
          styles.root,
          customStyles?.root ?? {},
          ...(isDarkTheme
            ? [darkStyles?.root, customDarkStyles?.root ?? {}]
            : [lightStyles?.root, customLightStyles?.root ?? {}]),
          { height: containerLayout?.height },
        ]}
        onLayout={(e) =>
          e.currentTarget.measure((x, y, width, height, pageX, pageY) => {
            containerWidth.value = width;
            setRootLayout({
              x,
              y,
              width,
              height,
              pageX,
              pageY,
            });
          })
        }
      >
        {isFocused && (
          <View
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
              {
                ...styles.backdrop,
                ...(customStyles?.backdrop ?? {}),
                top: -(rootLayout?.pageY ?? 0),
                left: -(rootLayout?.pageX ?? 0),
                height: height,
                width: width,
              },
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
          </View>
        )}
        <Animated.View
          style={[
            styles.container,
            customStyles?.container ?? {},
            error ? styles.error : {},
            ...(isDarkTheme
              ? [
                  darkStyles?.container,
                  error ? darkStyles.error : {},
                  customDarkStyles?.container ?? {},
                ]
              : [
                  lightStyles?.container,
                  error ? lightStyles.error : {},
                  customLightStyles?.container ?? {},
                ]),
            { position: 'absolute' },
            animatedStyle,
          ]}
        >
          {icon && (
            <View
              style={[
                styles.iconContainer,
                customStyles?.iconContainer ?? {},
                ...(isDarkTheme
                  ? [
                      darkStyles?.iconContainer,
                      customDarkStyles?.iconContainer ?? {},
                    ]
                  : [
                      lightStyles?.iconContainer,
                      customLightStyles?.iconContainer ?? {},
                    ]),
              ]}
            >
              {icon}
            </View>
          )}
          <TextInput
            style={[
              styles.input,
              customStyles?.input ?? {},
              ...(isDarkTheme
                ? [darkStyles?.input, customDarkStyles?.input ?? {}]
                : [lightStyles?.input, customLightStyles?.input ?? {}]),
            ]}
            value={value}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            placeholderTextColor={
              placeholderTextColor ?? isDarkTheme
                ? Colors.gray_400
                : Colors.gray_600
            }
            defaultValue={defaultValue}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            onChange={onChange ? (event) => onChange(event) : undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onContentSizeChange={(e) => {
              e.currentTarget.measure((x, y, width, height, pageX, pageY) => {
                const layout = {
                  x,
                  y,
                  width,
                  height,
                  pageX,
                  pageY,
                };
                setContainerLayout(layout);
              });
            }}
            placeholder={placeholder}
            secureTextEntry={isHidden}
            keyboardType={type}
            {...textInputProps}
          />
          {copy || error || actions || password ? (
            <View
              style={[
                styles.actionsContainer,
                customStyles?.actionsContainer ?? {},
                ...(isDarkTheme
                  ? [
                      darkStyles?.actionsContainer,
                      customDarkStyles?.actionsContainer ?? {},
                    ]
                  : [
                      lightStyles?.actionsContainer,
                      customLightStyles?.actionsContainer ?? {},
                    ]),
              ]}
            >
              {reveal ? (
                <Button
                  customStyles={customExtraStyles.revealButton}
                  customDarkStyles={customExtraDarkStyles.revealButton}
                  customLightStyles={customExtraLightStyles.revealButton}
                  size={'tiny'}
                  type={'text'}
                  rounded={true}
                  icon={
                    isHidden
                      ? icons?.hiddenReveal ?? (
                          <Visibility
                            size={21}
                            color={
                              isDarkTheme ? Colors.gray_100 : Colors.gray_900
                            }
                          />
                        )
                      : icons?.reveal ?? (
                          <VisibilityOff
                            size={21}
                            color={
                              isDarkTheme ? Colors.gray_100 : Colors.gray_900
                            }
                          />
                        )
                  }
                  onPress={onReveal}
                />
              ) : null}
              {error &&
                (icons?.error ?? (
                  <ErrorOutline
                    size={21}
                    color={Colors.red_500}
                    strokeWidth={0}
                  />
                ))}
              {copy && (
                <Button
                  size={'tiny'}
                  type={'default'}
                  rounded={true}
                  onPress={() => onCopy(value)}
                  icon={
                    icons?.copy ?? (
                      <ContentCopy
                        size={21}
                        color={isDarkTheme ? Colors.gray_100 : Colors.gray_900}
                      />
                    )
                  }
                >
                  {copyLabel}
                </Button>
              )}
              {actions && actions}
            </View>
          ) : null}
        </Animated.View>
      </View>
    </FormLayout>
  );
}

export interface TextAreaStyles {
  root?: ViewStyle;
  container?: ViewStyle;
  backdrop?: ViewStyle;
  input?: ViewStyle | TextStyle | ImageStyle;
  error?: ViewStyle | TextStyle | ImageStyle;
  withIcon?: ViewStyle | TextStyle | ImageStyle;
  borderless?: ViewStyle | TextStyle | ImageStyle;
  actionsContainer?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraTextAreaStyles {
  formLayoutStyles?: FormLayoutStyles;
  formLayoutDarkStyles?: FormLayoutStyles;
  formLayoutLightStyles?: FormLayoutStyles;
}

export interface TextAreaProps {
  autoComplete?:
    | 'additional-name'
    | 'address-line1'
    | 'address-line2'
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'cc-name'
    | 'cc-given-name'
    | 'cc-middle-name'
    | 'cc-family-name'
    | 'cc-type'
    | 'country'
    | 'current-password'
    | 'email'
    | 'family-name'
    | 'gender'
    | 'given-name'
    | 'honorific-prefix'
    | 'honorific-suffix'
    | 'name'
    | 'name-family'
    | 'name-given'
    | 'name-middle'
    | 'name-middle-initial'
    | 'name-prefix'
    | 'name-suffix'
    | 'new-password'
    | 'nickname'
    | 'one-time-code'
    | 'organization'
    | 'organization-title'
    | 'password'
    | 'password-new'
    | 'postal-address'
    | 'postal-address-country'
    | 'postal-address-extended'
    | 'postal-address-extended-postal-code'
    | 'postal-address-locality'
    | 'postal-address-region'
    | 'postal-code'
    | 'street-address'
    | 'sms-otp'
    | 'tel'
    | 'tel-country-code'
    | 'tel-national'
    | 'tel-device'
    | 'url'
    | 'username'
    | 'username-new'
    | 'off';
  autoFocus?: boolean;
  popout?: boolean;
  blurType?:
    | 'xlight'
    | 'light'
    | 'dark'
    | 'extraDark'
    | 'regular'
    | 'prominent';
  blurAmount?: number;
  overlayColor?: string;
  reducedTransparencyFallbackColor?: string;
  placeholderTextColor?: ColorValue;
  customStyles?: TextAreaStyles;
  customLightStyles?: TextAreaStyles;
  customDarkStyles?: TextAreaStyles;
  customExtraStyles?: ExtraTextAreaStyles;
  autofocus?: boolean;
  type?: KeyboardTypeOptions;
  numberOfLines?: number;
  descriptionText?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string;
  icon?: any;
  id?: string;
  label?: string;
  afterLabel?: string;
  beforeLabel?: string;
  labelOptional?: string;
  name?: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  value?: any;
  style?: React.CSSProperties;
  limit?: number;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  borderless?: boolean;
  shakeInterpolationCount?: number;
  shakeDistance?: number;
  textInputProps?: TextInputProps;
}

const textAreaStyles = StyleSheet.create<TextAreaStyles>({
  root: {
    position: 'relative',
    width: '100%',
  },
  backdrop: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: Globals.rounded_md,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
  error: {
    borderColor: Colors.red_500,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  withIcon: {},
  borderless: {},
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: MarginsPaddings.mp_4,
  },
  input: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    paddingTop: MarginsPaddings.mp_5,
    paddingBottom: MarginsPaddings.mp_5,
    width: '100%',
    height: '100%',
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
  },
  actionsContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: MarginsPaddings.mp_4,
    top: 0,
    bottom: 0,
    right: 0,
    paddingRight: MarginsPaddings.mp_5,
    paddingLeft: MarginsPaddings.mp_5,
  },
});
const textAreaLightStyles = StyleSheet.create<TextAreaStyles>({
  root: {},
  container: {
    backgroundColor: Colors.gray_100,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
  },
  error: {},
  withIcon: {},
  borderless: {},
  iconContainer: {
    color: Colors.gray_900,
  },
  input: {
    color: Colors.gray_900,
  },
  actionsContainer: {
    color: Colors.gray_900,
  },
});
const textAreaDarkStyles = StyleSheet.create<TextAreaStyles>({
  root: {},
  container: {
    backgroundColor: Colors.dark_1,
  },
  backdrop: {
    backgroundColor: 'rgba(255, 255, 255, 0.34)',
  },
  error: {},
  withIcon: {},
  borderless: {},
  iconContainer: {
    color: Colors.gray_100,
  },
  input: {
    color: Colors.gray_100,
  },
  actionsContainer: {
    color: Colors.gray_100,
  },
});

function TextArea({
  autoComplete,
  autoFocus,
  onChange,
  onFocus,
  onBlur,
  popout = true,
  blurAmount,
  blurType,
  overlayColor,
  reducedTransparencyFallbackColor,
  placeholder,
  placeholderTextColor,
  value,
  defaultValue,
  type,
  numberOfLines = 4,
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  customExtraStyles = {},
  descriptionText,
  disabled,
  error,
  limit,
  label,
  afterLabel,
  beforeLabel,
  labelOptional,
  textInputProps,
}: TextAreaProps) {
  const [charLength, setCharLength] = useState(0);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const { height, width } = Dimensions.get('window');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [containerLayout, setContainerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  }>();
  const [rootLayout, setRootLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  }>();
  const containerWidth = useSharedValue(0);
  const zIndex = useSharedValue(0);
  const inputBottom = useSharedValue(0);
  const inputLeft = useSharedValue(0);

  const onInputChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setCharLength(e.nativeEvent.text.length);
    if (onChange) {
      onChange(e);
    }
  };

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (popout) {
      zIndex.value = 12;
      containerWidth.value = width;
      Vibration.vibrate([0, 50], false);
    }

    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (popout) {
      zIndex.value = 0;
      containerWidth.value = rootLayout?.width ?? 0;
    }

    setIsFocused(false);
    onBlur?.(e);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      elevation: zIndex.value,
      left: -inputLeft.value,
      bottom: -inputBottom.value,
      width: containerWidth.value,
    };
  });

  useEffect(() => {
    if (!popout) {
      return;
    }

    const keyboardWillShow = (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    };

    const keyboardWillHide = () => {
      setKeyboardHeight(0);
    };

    const showListener =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideListener =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(
      showListener,
      keyboardWillShow
    );
    const hideSubscription = Keyboard.addListener(
      hideListener,
      keyboardWillHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!popout) {
      return;
    }

    if (keyboardHeight > 0) {
      inputBottom.value =
        height -
        keyboardHeight -
        (containerLayout?.height ?? 0) -
        (rootLayout?.pageY ?? 0);
      inputLeft.value = rootLayout?.pageX ?? 0;
    } else {
      inputBottom.value = 0;
      inputLeft.value = 0;
    }
  }, [keyboardHeight, containerLayout]);

  return (
    <FormLayout
      label={label}
      afterLabel={afterLabel}
      beforeLabel={beforeLabel}
      labelOptional={labelOptional}
      error={error}
      descriptionText={descriptionText}
      customStyles={customExtraStyles.formLayoutStyles}
      customDarkStyles={customExtraStyles.formLayoutDarkStyles}
      customLightStyles={customExtraStyles.formLayoutLightStyles}
    >
      <View
        style={[
          styles.root,
          customStyles?.root ?? {},
          ...(isDarkTheme
            ? [darkStyles?.root, customDarkStyles?.root ?? {}]
            : [lightStyles?.root, customLightStyles?.root ?? {}]),
          { height: containerLayout?.height },
        ]}
        onLayout={(e) =>
          e.currentTarget.measure((x, y, width, height, pageX, pageY) => {
            containerWidth.value = width;
            setRootLayout({
              x,
              y,
              width,
              height,
              pageX,
              pageY,
            });
          })
        }
      >
        {isFocused && (
          <View
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
              {
                ...styles.backdrop,
                ...(customStyles?.backdrop ?? {}),
                top: -(rootLayout?.pageY ?? 0),
                left: -(rootLayout?.pageX ?? 0),
                height: height,
                width: width,
              },
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
          </View>
        )}
        <Animated.View
          style={[
            textAreaStyles.container,
            customStyles?.container ?? {},
            error ? textAreaStyles.error : {},
            ...(isDarkTheme
              ? [
                  textAreaDarkStyles?.container,
                  error ? textAreaDarkStyles.error : {},
                  customDarkStyles?.container ?? {},
                ]
              : [
                  textAreaLightStyles?.container,
                  error ? textAreaLightStyles.error : {},
                  customLightStyles?.container ?? {},
                ]),
            { position: 'absolute' },
            animatedStyle,
          ]}
        >
          <TextInput
            style={[
              textAreaStyles.input,
              customStyles?.input ?? {},
              ...(isDarkTheme
                ? [textAreaDarkStyles?.input, customDarkStyles?.input ?? {}]
                : [textAreaLightStyles?.input, customLightStyles?.input ?? {}]),
            ]}
            multiline={true}
            value={value}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            textAlignVertical={'top'}
            placeholderTextColor={
              placeholderTextColor ?? isDarkTheme
                ? Colors.gray_400
                : Colors.gray_600
            }
            numberOfLines={numberOfLines}
            maxLength={limit}
            defaultValue={defaultValue}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            onContentSizeChange={(e) => {
              e.currentTarget.measure((x, y, width, height, pageX, pageY) => {
                const layout = {
                  x,
                  y,
                  width,
                  height,
                  pageX,
                  pageY,
                };
                setContainerLayout(layout);
              });
            }}
            onChange={(event) => onInputChange(event)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            keyboardType={type}
            {...textInputProps}
          />
          {error && (
            <View
              style={[
                textAreaStyles.actionsContainer,
                customStyles?.actionsContainer ?? {},
                ...(isDarkTheme
                  ? [
                      textAreaDarkStyles?.actionsContainer,
                      customDarkStyles?.actionsContainer ?? {},
                    ]
                  : [
                      textAreaLightStyles?.actionsContainer,
                      customLightStyles?.actionsContainer ?? {},
                    ]),
              ]}
            >
              <ErrorOutline size={21} color={Colors.red_500} />
            </View>
          )}
        </Animated.View>
        {limit && (
          <Typography.Text>
            {charLength}/{limit}
          </Typography.Text>
        )}
      </View>
    </FormLayout>
  );
}

Input.TextArea = TextArea;

export default Input;
