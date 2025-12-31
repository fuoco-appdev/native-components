/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import React, { RefObject, useRef } from 'react';
import {
  ColorValue,
  GestureResponderEvent,
  ImageStyle,
  KeyboardTypeOptions,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import Button, { ButtonStyles } from '../Button/Button';
import { FormLayout, FormLayoutStyles } from '../FormLayout/FormLayout';
import { Add, ErrorOutline, Remove } from '../Icon/Icons/Line';
import Colors from '../Themes/colors';
import Globals from '../Themes/globals';
import MarginsPaddings from '../Themes/margins_paddings';

export interface InputNumberStyles {
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

export interface ExtraInputNumberStyles {
  formLayout?: FormLayoutStyles;
  addButton?: ButtonStyles;
  removeButton?: ButtonStyles;
}

export interface InputNumberIcons {
  decrement?: React.ReactNode;
  increment?: React.ReactNode;
  error?: React.ReactNode;
}

export interface InputNumberProps {
  autoFocus?: boolean;
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
  min?: number;
  max?: number;
  step?: number;
  onChange?: (
    value: number,
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onIncrement?: (value: number, event: GestureResponderEvent) => void;
  onDecrement?: (value: number, event: GestureResponderEvent) => void;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  type?: KeyboardTypeOptions;
  value?: string;
  customStyles?: InputNumberStyles;
  customLightStyles?: InputNumberStyles;
  customDarkStyles?: InputNumberStyles;
  customExtraStyles?: ExtraInputNumberStyles;
  customExtraDarkStyles?: ExtraInputNumberStyles;
  customExtraLightStyles?: ExtraInputNumberStyles;
  icons?: InputNumberIcons;
  defaultValue?: string;
  descriptionText?: string;
  disabled?: boolean;
  error?: string;
  icon?: any;
  inputRef?: React.RefObject<TextInput>;
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

const styles = StyleSheet.create<InputNumberStyles>({
  root: {
    position: 'relative',
    width: '100%',
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center',
    flex: 1,
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
const lightStyles = StyleSheet.create<InputNumberStyles>({
  root: {},
  container: {
    backgroundColor: Colors.gray_100,
  },
  backdrop: {
    backgroundColor: 'rgba(255, 255, 255, 0.34)',
  },
  error: {
    borderColor: Colors.red_500,
  },
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
const darkStyles = StyleSheet.create<InputNumberStyles>({
  root: {},
  container: {
    backgroundColor: Colors.dark_1,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
  },
  error: {
    borderColor: Colors.red_500,
  },
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

const InputNumberInner = ({
  inputRef,
  focused,
  onLayout,
  autoFocus,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  onChange,
  onFocus,
  onBlur,
  onIncrement,
  onDecrement,
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
  defaultValue,
  descriptionText,
  disabled,
  error,
  label,
  afterLabel,
  beforeLabel,
  labelOptional,
  actions,
  textInputProps,
}:
  | {
      inputRef?: RefObject<TextInput>;
      focused?: boolean;
      onLayout?: (event: LayoutChangeEvent) => void;
    } & InputNumberProps) => {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const onIncrementHandler = (event: GestureResponderEvent) => {
    const valueInt = parseInt(value ?? '0', min);
    onIncrement?.(Math.max(Math.min(valueInt + step, max), min), event);
  };

  const onDecrementHandler = (event: GestureResponderEvent) => {
    const valueInt = parseInt(value ?? '0', min);
    onDecrement?.(Math.max(Math.min(valueInt - step, max), min), event);
  };

  const onChangeHandler = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const valueInt = parseInt(event.nativeEvent.text, min);
    onChange?.(Math.max(Math.min(valueInt, max), min), event);
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
                  customDarkStyles?.container ?? {},
                  error ? darkStyles.error : {},
                ]
              : [
                  lightStyles?.container,
                  customLightStyles?.container ?? {},
                  error ? lightStyles.error : {},
                ]),
          ]}
        >
          <Button
            customStyles={customExtraStyles.removeButton}
            customLightStyles={customExtraLightStyles.removeButton}
            customDarkStyles={customExtraDarkStyles.removeButton}
            type={'text'}
            icon={
              icons?.decrement ?? (
                <Remove
                  size={21}
                  color={isDarkTheme ? Colors.gray_100 : Colors.gray_900}
                />
              )
            }
            onPress={onDecrementHandler}
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
            value={value}
            autoFocus={autoFocus}
            placeholderTextColor={
              placeholderTextColor ?? isDarkTheme
                ? Colors.gray_400
                : Colors.gray_600
            }
            defaultValue={defaultValue}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            onChange={onChangeHandler}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            keyboardType={type}
            {...textInputProps}
          />
          <Button
            customStyles={customExtraStyles.addButton}
            customLightStyles={customExtraLightStyles.addButton}
            customDarkStyles={customExtraDarkStyles.addButton}
            type={'text'}
            icon={
              icons?.increment ?? (
                <Add
                  size={21}
                  color={isDarkTheme ? Colors.gray_100 : Colors.gray_900}
                />
              )
            }
            onPress={onIncrementHandler}
          />
          {error || actions ? (
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

function InputNumber({
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
}: InputNumberProps) {
  const inputRef = useRef<TextInput>(null);

  return (
    <View
      style={[
        {
          flexShrink: 1,
          position: 'relative',
        },
      ]}
    >
      <InputNumberInner
        inputRef={inputRef}
        focused={false}
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
  );
}

export default InputNumber;
