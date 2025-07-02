/* eslint-disable react/no-unstable-nested-components */
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
  KeyboardAvoidingView,
  TextInputSubmitEditingEventData,
  LayoutChangeEvent,
} from 'react-native';
import Skeleton from 'react-native-reanimated-skeleton';
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
import React, { useEffect, useRef, useState } from 'react';
import Typography from '../Typography/Typography';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import { Portal } from '../Portal';

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

const styles = StyleSheet.create<TextAreaStyles>({
  root: {
    position: 'relative',
    width: '100%',
  },
  backdrop: {
    position: 'relative',
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
const lightStyles = StyleSheet.create<TextAreaStyles>({
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
const darkStyles = StyleSheet.create<TextAreaStyles>({
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

const TextAreaInner = ({
  inputRef,
  focused,
  onLayout,
  autoComplete,
  autoFocus,
  onChange,
  onFocus,
  onBlur,
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
}:
  | {
      inputRef?: any;
      focused?: boolean;
      onLayout?: (event: LayoutChangeEvent) => void;
    } & TextAreaProps) => {
  const [charLength, setCharLength] = useState(0);
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const onInputChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setCharLength(e.nativeEvent.text.length);
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <FormLayout
      label={label}
      afterLabel={afterLabel}
      beforeLabel={beforeLabel}
      labelOptional={labelOptional}
      error={error}
      descriptionText={descriptionText}
      customStyles={customExtraStyles.formLayoutStyles}
      customLightStyles={{
        label: {
          backgroundColor: focused
            ? customLightStyles?.container?.backgroundColor ??
              lightStyles?.container?.backgroundColor
            : undefined,
        },
        labelAfter: {
          backgroundColor: focused
            ? customLightStyles?.container?.backgroundColor ??
              lightStyles?.container?.backgroundColor
            : undefined,
        },
        ...customExtraStyles.formLayoutLightStyles,
      }}
      customDarkStyles={{
        label: {
          backgroundColor: focused
            ? customDarkStyles?.container?.backgroundColor ??
              darkStyles?.container?.backgroundColor
            : undefined,
        },
        labelAfter: {
          backgroundColor: focused
            ? customDarkStyles?.container?.backgroundColor ??
              darkStyles?.container?.backgroundColor
            : undefined,
        },
        ...customExtraStyles.formLayoutLightStyles,
      }}
      onLayout={onLayout}
    >
      <View
        style={[
          styles.root,
          customStyles?.root ?? {},
          ...(isDarkTheme
            ? [darkStyles?.root, customDarkStyles?.root ?? {}]
            : [lightStyles?.root, customLightStyles?.root ?? {}]),
        ]}
      >
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
          ]}
        >
          <TextInput
            style={[
              styles.input,
              customStyles?.input ?? {},
              ...(isDarkTheme
                ? [darkStyles?.input, customDarkStyles?.input ?? {}]
                : [lightStyles?.input, customLightStyles?.input ?? {}]),
            ]}
            ref={inputRef}
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
            onChange={(event) => onInputChange(event)}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            keyboardType={type}
            {...textInputProps}
          />
          {error && (
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
};

function TextArea({
  onFocus,
  onBlur,
  popout = true,
  blurAmount,
  blurType,
  overlayColor,
  reducedTransparencyFallbackColor,
  placeholder,
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  label,
  ...props
}: TextAreaProps) {
  const theme = useColorScheme();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isDarkTheme = theme === 'dark';
  const { width, height } = Dimensions.get('window');
  const inputRef = useRef<TextInput>(null);
  const inputPopupRef = useRef<TextInput>(null);
  const [inputLayout, setInputLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
    pageX: number;
    pageY: number;
  }>();

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (popout) {
      Vibration.vibrate([0, 50], false);
      setIsFocused(true);
    }

    onFocus?.(e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (popout) {
      setIsFocused(false);
    }

    onBlur?.(e);
  };

  useEffect(() => {
    if (inputPopupRef.current !== null && popout && isFocused) {
      inputPopupRef.current?.focus();
    }
  }, [isFocused, popout, inputPopupRef]);

  return (
    <View
      style={[
        {
          flexShrink: 1,
          position: 'relative',
        },
      ]}
    >
      <TextAreaInner
        inputRef={inputRef}
        focused={false}
        onFocus={handleFocus}
        onBlur={!popout ? onBlur : undefined}
        onLayout={(e) =>
          e.currentTarget.measure((x, y, width, height, pageX, pageY) =>
            setInputLayout({ x, y, width, height, pageX, pageY })
          )
        }
        popout={popout}
        blurType={blurType}
        placeholder={placeholder}
        blurAmount={blurAmount}
        reducedTransparencyFallbackColor={reducedTransparencyFallbackColor}
        overlayColor={overlayColor}
        customStyles={customStyles}
        customLightStyles={customLightStyles}
        customDarkStyles={customDarkStyles}
        label={label}
        {...props}
      />
      {isFocused && popout && (
        <View
          style={[
            {
              position: 'absolute',
              height: height,
              width: width,
              zIndex: 24,
              top: -(inputLayout?.pageY ?? 0) - 30,
              left: -(inputLayout?.pageX ?? 0),
            },
          ]}
        >
          <KeyboardAvoidingView behavior={'height'}>
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

            <View
              style={[
                {
                  position: 'absolute',
                  bottom: 0,
                },
              ]}
            >
              <TextAreaInner
                inputRef={inputPopupRef}
                focused={true}
                onBlur={handleBlur}
                popout={popout}
                blurType={blurType}
                placeholder={placeholder}
                blurAmount={blurAmount}
                reducedTransparencyFallbackColor={
                  reducedTransparencyFallbackColor
                }
                overlayColor={overlayColor}
                customStyles={customStyles}
                customLightStyles={customLightStyles}
                customDarkStyles={customDarkStyles}
                label={label}
                {...props}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );
}

export default TextArea;
