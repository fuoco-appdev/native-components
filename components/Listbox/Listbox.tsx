import {
  FlatList,
  GestureResponderEvent,
  ListRenderItem,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import { BottomSheet, BottomSheetStyles } from '../BottomSheet';
import { FormLayout, FormLayoutStyles } from '../FormLayout';
// import { ArrowDropDown } from '../Icon/Icons/Line';
import React from 'react';
import { ArrowDropDown } from '../Icon/Icons/Line';
import { Colors, Globals, MarginsPaddings } from '../Themes';
import { Typography, TypographyStyles } from '../Typography';

export interface ListboxProps {
  id?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;
  label?: string;
  labelOptional?: string;
  descriptionText?: string;
  error?: string;
  snapPoints?: string[];
  customStyles?: ListboxStyles;
  customLightStyles?: ListboxStyles;
  customDarkStyles?: ListboxStyles;
  customExtraStyles?: ExtraListboxStyles;
  customExtraLightStyles?: ExtraListboxStyles;
  customExtraDarkStyles?: ExtraListboxStyles;
  data?: ArrayLike<any> | null;
  renderBottomSheetItem?: ListRenderItem<any> | null;
  keyExtractor?: ((item: any, index: number) => string) | undefined;
  onOpen?: (event: GestureResponderEvent) => void;
  onClose?: () => void;
}

export interface ListboxStyles {
  listboxContainer?: ViewStyle;
  listbox?: ViewStyle;
  container?: ViewStyle;
  listboxButton?: ViewStyle;
  iconContainer?: ViewStyle;
  chevronContainer?: ViewStyle;
}

export interface ExtraListboxStyles {
  formLayout?: FormLayoutStyles;
  bottomSheet?: BottomSheetStyles;
  label?: TypographyStyles;
}

const styles = StyleSheet.create<ListboxStyles>({
  listboxButton: {
    overflow: 'hidden',
    paddingTop: MarginsPaddings.mp_4,
    paddingBottom: MarginsPaddings.mp_4,
    width: '100%',
    borderRadius: Globals.rounded_md,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: MarginsPaddings.mp_4,
    marginRight: MarginsPaddings.mp_4,
  },
  listbox: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
  },
  chevronContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: MarginsPaddings.mp_3,
  },
});
const lightStyles = StyleSheet.create<ListboxStyles>({
  listboxButton: {
    backgroundColor: Colors.gray_100,
  },
});
const darkStyles = StyleSheet.create<ListboxStyles>({});

function Listbox({
  id,
  open = false,
  children,
  icon,
  label,
  labelOptional,
  descriptionText,
  error,
  snapPoints,
  customStyles,
  customLightStyles,
  customDarkStyles,
  customExtraStyles,
  customExtraDarkStyles,
  customExtraLightStyles,
  data,
  renderBottomSheetItem,
  keyExtractor,
  onOpen,
  onClose,
}: ListboxProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  return (
    <>
      <FormLayout
        label={label}
        labelOptional={labelOptional}
        error={error}
        descriptionText={descriptionText}
        customStyles={customExtraStyles?.formLayout}
        customLightStyles={customExtraLightStyles?.formLayout}
        customDarkStyles={customExtraDarkStyles?.formLayout}
      >
        <View
          style={[
            ...(isDarkTheme
              ? [
                  {
                    ...darkStyles?.listboxContainer,
                    ...(customDarkStyles?.listboxContainer ?? {}),
                  },
                ]
              : [
                  {
                    ...lightStyles?.listboxContainer,
                    ...(customLightStyles?.listboxContainer ?? {}),
                  },
                ]),
            {
              ...styles.listboxContainer,
              ...(customStyles?.listboxContainer ?? {}),
            },
          ]}
        >
          <Pressable
            style={[
              ...(isDarkTheme
                ? [
                    {
                      ...darkStyles?.listboxButton,
                      ...(customDarkStyles?.listboxButton ?? {}),
                    },
                  ]
                : [
                    {
                      ...lightStyles?.listboxButton,
                      ...(customLightStyles?.listboxButton ?? {}),
                    },
                  ]),
              {
                ...styles.listboxButton,
                ...(customStyles?.listboxButton ?? {}),
              },
            ]}
            onPress={onOpen}
            android_ripple={{
              radius: Globals.rounded_md,
              borderless: false,
              foreground: true,
              color: isDarkTheme
                ? 'rgba(255, 255, 255, 0.13)'
                : 'rgba(0, 0, 0, 0.13)',
            }}
          >
            <View
              style={[
                ...(isDarkTheme
                  ? [
                      {
                        ...darkStyles?.listbox,
                        ...(customDarkStyles?.listbox ?? {}),
                      },
                    ]
                  : [
                      {
                        ...lightStyles?.listbox,
                        ...(customLightStyles?.listbox ?? {}),
                      },
                    ]),
                {
                  ...styles.listbox,
                  ...(customStyles?.listbox ?? {}),
                },
              ]}
            >
              {icon && (
                <View
                  style={[
                    ...(isDarkTheme
                      ? [
                          {
                            ...darkStyles?.iconContainer,
                            ...(customDarkStyles?.iconContainer ?? {}),
                          },
                        ]
                      : [
                          {
                            ...lightStyles?.iconContainer,
                            ...(customLightStyles?.iconContainer ?? {}),
                          },
                        ]),
                    {
                      ...styles.iconContainer,
                      ...(customStyles?.iconContainer ?? {}),
                    },
                  ]}
                >
                  {icon}
                </View>
              )}
              <Typography.Text
                customStyles={{
                  ...customExtraStyles?.label,
                  root: {
                    lineHeight: 28,
                    flex: 1,
                  },
                }}
                customLightStyles={customExtraLightStyles?.label}
                customDarkStyles={customExtraDarkStyles?.label}
              >
                {children}
              </Typography.Text>
              <View
                style={[
                  ...(isDarkTheme
                    ? [
                        {
                          ...darkStyles?.chevronContainer,
                          ...(customDarkStyles?.chevronContainer ?? {}),
                        },
                      ]
                    : [
                        {
                          ...lightStyles?.chevronContainer,
                          ...(customLightStyles?.chevronContainer ?? {}),
                        },
                      ]),
                  {
                    ...styles.chevronContainer,
                    ...(customStyles?.chevronContainer ?? {}),
                  },
                ]}
              >
                <ArrowDropDown
                  size={21}
                  color={isDarkTheme ? '#fff' : '#000'}
                />
              </View>
            </View>
          </Pressable>
        </View>
      </FormLayout>
      <BottomSheet
        customStyles={customExtraStyles?.bottomSheet}
        customDarkStyles={customExtraDarkStyles?.bottomSheet}
        customLightStyles={customExtraLightStyles?.bottomSheet}
        id={`language-switch-${id}`}
        type={'flat-list'}
        open={open}
        onClose={onClose}
        data={data}
        renderItem={renderBottomSheetItem}
        keyExtractor={keyExtractor}
      />
    </>
  );
}

export default Listbox;
