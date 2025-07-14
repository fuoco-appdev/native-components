/* eslint-disable react-native/no-inline-styles */
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
  TouchableOpacity,
  SafeAreaView,
  FlatList,
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
import Typography, { TypographyStyles } from '../Typography/Typography';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { BlurView } from '@react-native-community/blur';
import { Portal } from '../Portal';
import { Line } from '../Icon/Icons';

export interface InputTagStyles {
  root?: ViewStyle;
  container?: ViewStyle;
  backdrop?: ViewStyle;
  error?: TextStyle;
  withIcon?: ViewStyle;
  borderless?: ViewStyle;
  iconContainer?: ViewStyle;
  input?: TextStyle;
  actionsContainer?: ViewStyle;
  tagList?: ViewStyle;
  tagListContent?: ViewStyle;
  tagContainer?: ViewStyle;
  removeTag?: TextStyle;
}

export interface ExtraInputTagStyles {
  formLayout?: FormLayoutStyles;
  revealButton?: ButtonStyles;
  tagTitle?: TypographyStyles;
}

export interface InputTagIcons {
  reveal?: React.ReactNode;
  hiddenReveal?: React.ReactNode;
  copy?: React.ReactNode;
  error?: React.ReactNode;
}

export interface InputTagProps {
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
  value?: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onAddTag?: (value: string) => void;
  onRemoveTag?: (index: number) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  type?: KeyboardTypeOptions;
  tags?: string[];
  customStyles?: InputTagStyles;
  customLightStyles?: InputTagStyles;
  customDarkStyles?: InputTagStyles;
  customExtraStyles?: ExtraInputTagStyles;
  customExtraDarkStyles?: ExtraInputTagStyles;
  customExtraLightStyles?: ExtraInputTagStyles;
  icons?: InputTagIcons;
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

const styles = StyleSheet.create<InputTagStyles>({
  root: {
    position: 'relative',
    width: '100%',
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderRadius: Globals.rounded_md,
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
    width: '100%',
  },
  backdrop: {
    position: 'relative',
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
  tagList: {
    flexGrow: 0,
  },
  tagListContent: {
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Globals.rounded_full,
    paddingVertical: MarginsPaddings.mp_3,
    paddingHorizontal: MarginsPaddings.mp_5,
    marginRight: MarginsPaddings.mp_3,
    marginVertical: MarginsPaddings.mp_2,
  },
  removeTag: {
    color: '#1e3a8a',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  input: {
    overflow: 'hidden',
    backgroundColor: 'transparent',
    paddingTop: MarginsPaddings.mp_4,
    paddingBottom: MarginsPaddings.mp_4,
    fontSize: Globals.font_size_sm,
    lineHeight: Globals.font_line_height_sm,
    fontFamily: Globals.font_family,
    width: '100%',
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
const lightStyles = StyleSheet.create<InputTagStyles>({
  root: {},
  container: {
    backgroundColor: Colors.gray_100,
  },
  backdrop: {
    backgroundColor: 'rgba(255, 255, 255, 0.34)',
  },
  error: {},
  withIcon: {},
  borderless: {},
  iconContainer: {},
  input: {
    color: Colors.gray_900,
  },
  actionsContainer: {},
  tagContainer: {
    backgroundColor: Colors.brand_100,
  },
});
const darkStyles = StyleSheet.create<InputTagStyles>({
  root: {},
  container: {
    backgroundColor: Colors.dark_1,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
  },
  error: {},
  withIcon: {},
  borderless: {},
  iconContainer: {},
  input: {
    color: Colors.gray_100,
  },
  actionsContainer: {},
  tagContainer: {
    backgroundColor: Colors.brand_900,
  },
});

const InputTagInner = ({
  inputRef,
  focused,
  onLayout,
  autoComplete,
  autoFocus,
  value,
  onChange,
  onAddTag,
  onRemoveTag,
  onFocus,
  onBlur,
  placeholder,
  placeholderTextColor,
  tags = [],
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
  actions,
  textInputProps,
}:
  | {
      inputRef?: any;
      focused?: boolean;
      onLayout?: (event: LayoutChangeEvent) => void;
    } & InputTagProps) => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [inputText, setInputText] = useState('');

  const onInputChanged = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    onChange?.(e);

    const text = e.nativeEvent.text;
    if (text.endsWith(',')) {
      const newTag = text.slice(0, -1).trim();
      if (newTag) {
        onAddTag?.(newTag);
        setInputText('');
      }
    } else {
      setInputText(text);
    }
  };

  const removeTag = (index: number) => {
    onRemoveTag?.(index);
    inputRef.current.focus();
  };

  return (
    <FormLayout
      label={label}
      afterLabel={afterLabel}
      beforeLabel={beforeLabel}
      labelOptional={labelOptional}
      error={error}
      descriptionText={descriptionText}
      customStyles={{
        ...customExtraStyles.formLayout,
        label: {
          borderTopLeftRadius: Globals.rounded_lg,
          borderTopRightRadius: Globals.rounded_lg,
          ...customExtraStyles.formLayout?.label,
        },
        labelAfter: {
          borderTopLeftRadius: Globals.rounded_lg,
          borderTopRightRadius: Globals.rounded_lg,
          ...customExtraStyles.formLayout?.labelAfter,
        },
      }}
      customLightStyles={{
        ...customExtraLightStyles.formLayout,
        label: {
          backgroundColor: focused
            ? customLightStyles?.container?.backgroundColor ??
              lightStyles?.container?.backgroundColor
            : undefined,
          ...customExtraLightStyles.formLayout?.label,
        },
        labelAfter: {
          backgroundColor: focused
            ? customLightStyles?.container?.backgroundColor ??
              lightStyles?.container?.backgroundColor
            : undefined,
          ...customExtraLightStyles.formLayout?.labelAfter,
        },
      }}
      customDarkStyles={{
        ...customExtraDarkStyles.formLayout,
        label: {
          backgroundColor: focused
            ? customDarkStyles?.container?.backgroundColor ??
              darkStyles?.container?.backgroundColor
            : undefined,
          ...customExtraDarkStyles.formLayout?.label,
        },
        labelAfter: {
          backgroundColor: focused
            ? customDarkStyles?.container?.backgroundColor ??
              darkStyles?.container?.backgroundColor
            : undefined,
          ...customExtraDarkStyles.formLayout?.labelAfter,
        },
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
        <View
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
          <FlatList
            data={tags}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.tagContainer,
                  customStyles?.tagContainer ?? {},
                  ...(isDarkTheme
                    ? [
                        darkStyles?.tagContainer,
                        customDarkStyles?.tagContainer ?? {},
                      ]
                    : [
                        lightStyles?.tagContainer,
                        customLightStyles?.tagContainer ?? {},
                      ]),
                ]}
              >
                <Typography.Title
                  customStyles={customExtraStyles.tagTitle}
                  customLightStyles={customExtraLightStyles.tagTitle}
                  customDarkStyles={customExtraDarkStyles.tagTitle}
                  level={4}
                >
                  {item}
                </Typography.Title>
                <TouchableOpacity onPress={() => removeTag(index)}>
                  <Line.Close size={13} color={isDarkTheme ? '#000' : '#000'} />
                </TouchableOpacity>
              </View>
            )}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            style={styles.tagList}
            contentContainerStyle={styles.tagListContent}
          />
          <TextInput
            style={[
              styles.input,
              customStyles?.input ?? {},
              ...(isDarkTheme
                ? [darkStyles?.input, customDarkStyles?.input ?? {}]
                : [lightStyles?.input, customLightStyles?.input ?? {}]),
            ]}
            ref={inputRef}
            value={inputText}
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
            onChange={onInputChanged}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
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
              {error &&
                (icons?.error ?? (
                  <ErrorOutline
                    size={21}
                    color={Colors.red_500}
                    strokeWidth={0}
                  />
                ))}
              {actions && actions}
            </View>
          ) : null}
        </View>
      </View>
    </FormLayout>
  );
};

const PopupInputTag = ({
  isFocused,
  setIsFocused,
  onBlur,
  popout = true,
  blurType,
  placeholder,
  blurAmount,
  reducedTransparencyFallbackColor,
  overlayColor,
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  label,
  ...props
}: {
  isFocused: boolean;
  setIsFocused: (value: boolean) => void;
} & InputTagProps) => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const { height, width } = Dimensions.get('window');
  const inputPopupRef = useRef<TextInput>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (popout) {
      setIsFocused(false);
    }

    onBlur?.(e);
  };

  const onClose = () => {
    inputPopupRef.current?.blur();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0); // Reset height when keyboard hides
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (inputPopupRef.current !== null && popout && isFocused) {
      inputPopupRef.current?.focus();
    }
  }, [isFocused, popout, inputPopupRef]);

  return (
    <SafeAreaView
      style={[
        {
          position: 'absolute',
          height: height - keyboardHeight,
          width: width,
          zIndex: 24,
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
          <TouchableOpacity style={[{ flex: 1 }]} onPress={onClose} />
        </View>

        <View
          style={[
            {
              position: 'absolute',
              bottom: 30,
            },
          ]}
        >
          <InputTagInner
            inputRef={inputPopupRef}
            focused={true}
            onBlur={handleBlur}
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

function InputTag({
  onFocus,
  onBlur,
  popout = false,
  blurType,
  placeholder,
  blurAmount,
  reducedTransparencyFallbackColor,
  overlayColor,
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  label,
  ...props
}: InputTagProps) {
  const theme = useColorScheme();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isDarkTheme = theme === 'dark';
  const inputRef = useRef<TextInput>(null);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    if (popout) {
      Vibration.vibrate([0, 50], false);
      setIsFocused(true);
    }

    onFocus?.(e);
  };

  return (
    <View
      style={[
        {
          flexShrink: 1,
          position: 'relative',
        },
      ]}
    >
      <InputTagInner
        inputRef={inputRef}
        focused={false}
        onFocus={handleFocus}
        onBlur={!popout ? onBlur : undefined}
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
      <Portal
        name={`${label || placeholder}-${Math.random()}`}
        visible={isFocused && popout}
      >
        <PopupInputTag
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          onFocus={handleFocus}
          onBlur={!popout ? onBlur : undefined}
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
      </Portal>
    </View>
  );
}

export default InputTag;
