import {
  GestureResponderEvent,
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import NativeModal from 'react-native-modal';
import { Globals, MarginsPaddings } from '../Themes';
import React from 'react';
import { ButtonStyles, Button } from '../Button';
import { Typography } from '../Typography';
import { TitleStyles } from '../Typography/Title';
import { TextStyles } from '../Typography/Text';

export interface ModalStyles {
  container?: ViewStyle;
  contentContainer?: ViewStyle;
  footerContainer?: ViewStyle;
  backdrop?: ViewStyle;
}

export interface ExtraModalStyles {
  cancelButton?: ButtonStyles;
  confirmButton?: ButtonStyles;
  title?: TitleStyles;
  text?: TextStyles;
}

export interface ModalProps {
  isVisible: boolean;
  customStyles?: ModalStyles;
  customLightStyles?: ModalStyles;
  customDarkStyles?: ModalStyles;
  customExtraStyles?: ExtraModalStyles;
  customExtraLightStyles?: ExtraModalStyles;
  customExtraDarkStyles?: ExtraModalStyles;
  customFooter?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: (event: GestureResponderEvent) => void;
  onCancel?: (event: GestureResponderEvent) => void;
  variant?: 'danger' | 'warning' | 'success';
  title?: string;
  description?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  hideFooter?: boolean;
}

const styles = StyleSheet.create<ModalStyles>({
  container: {
    backgroundColor: '#fff',
    borderRadius: Globals.rounded_lg,
    padding: MarginsPaddings.mp_5,
    gap: MarginsPaddings.mp_6,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    gap: MarginsPaddings.mp_4,
  },
  backdrop: {
    backgroundColor: '#000',
    opacity: 0.34,
  },
});
const lightStyles = StyleSheet.create<ModalStyles>({});
const darkStyles = StyleSheet.create<ModalStyles>({});

export default function Modal({
  isVisible,
  customStyles,
  customLightStyles,
  customDarkStyles,
  customExtraStyles,
  customExtraLightStyles,
  customExtraDarkStyles,
  customFooter,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  onConfirm,
  onCancel,
  onClose,
  variant,
  title,
  description,
  children,
  hideFooter = false,
}: ModalProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';

  const footerContent = customFooter ? (
    customFooter
  ) : (
    <View
      style={[
        ...(isDarkTheme
          ? [
              {
                ...darkStyles?.footerContainer,
                ...(customDarkStyles?.footerContainer ?? {}),
              },
            ]
          : [
              {
                ...lightStyles?.footerContainer,
                ...(customLightStyles?.footerContainer ?? {}),
              },
            ]),
        { ...styles.footerContainer, ...(customStyles?.footerContainer ?? {}) },
      ]}
    >
      <Button
        customStyles={{
          root: {
            flex: 1,
          },
          ...customExtraStyles?.cancelButton,
        }}
        customDarkStyles={customExtraDarkStyles?.cancelButton}
        customLightStyles={customExtraLightStyles?.cancelButton}
        type={'default'}
        size={'full'}
        onPress={onCancel}
      >
        {cancelText}
      </Button>
      <Button
        customStyles={{
          root: {
            flex: 1,
          },
          ...customExtraStyles?.confirmButton,
        }}
        customDarkStyles={customExtraDarkStyles?.confirmButton}
        customLightStyles={customExtraLightStyles?.confirmButton}
        onPress={onConfirm}
        size={'full'}
        danger={variant === 'danger'}
      >
        {confirmText}
      </Button>
    </View>
  );
  return (
    <NativeModal
      isVisible={isVisible}
      customBackdrop={
        <TouchableWithoutFeedback onPress={onClose}>
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
              { ...styles.backdrop, ...(customStyles?.backdrop ?? {}) },
            ]}
          />
        </TouchableWithoutFeedback>
      }
    >
      <View
        style={[
          ...(isDarkTheme
            ? [
                {
                  ...darkStyles?.container,
                  ...(customDarkStyles?.container ?? {}),
                },
              ]
            : [
                {
                  ...lightStyles?.container,
                  ...(customLightStyles?.container ?? {}),
                },
              ]),
          { ...styles.container, ...(customStyles?.container ?? {}) },
        ]}
      >
        <View
          style={[
            ...(isDarkTheme
              ? [
                  {
                    ...darkStyles?.contentContainer,
                    ...(customDarkStyles?.contentContainer ?? {}),
                  },
                ]
              : [
                  {
                    ...lightStyles?.contentContainer,
                    ...(customLightStyles?.contentContainer ?? {}),
                  },
                ]),
            {
              ...styles.contentContainer,
              ...(customStyles?.contentContainer ?? {}),
            },
          ]}
        >
          {title && (
            <Typography.Title
              customStyles={customExtraStyles?.title}
              customLightStyles={customExtraLightStyles?.title}
              customDarkStyles={customExtraDarkStyles?.title}
              level={3}
            >
              {title}
            </Typography.Title>
          )}
          {description && (
            <Typography.Text
              customStyles={customExtraStyles?.text}
              customLightStyles={customExtraLightStyles?.text}
              customDarkStyles={customExtraDarkStyles?.text}
              align={'center'}
            >
              {description}
            </Typography.Text>
          )}
          {children}
        </View>

        {!hideFooter && footerContent}
      </View>
    </NativeModal>
  );
}
