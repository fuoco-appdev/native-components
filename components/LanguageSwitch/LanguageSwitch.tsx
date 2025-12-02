/* eslint-disable react/react-in-jsx-scope */
import * as countriesList from 'countries-list';
import ISO6391, { LanguageCode } from 'iso-639-1';
import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import {
  BottomSheet,
  BottomSheetItemStyles,
  BottomSheetStyles,
  ExtraBottomSheetItemStyles,
} from '../BottomSheet';
import { Button, ButtonStyles } from '../Button';
import { FormLayout, FormLayoutStyles } from '../FormLayout';
import { ChevronRight } from '../Icon/Icons/Line';
import { Typography, TypographyStyles } from '../Typography';

export function getCountriesInfo(): { [isoCode: string]: string[] } {
  const countriesInfo: { [isoCode: string]: string[] } = {};

  const countryList = JSON.parse(JSON.stringify(countriesList));
  for (const countryCode in countryList.countries) {
    const countryInfo = countryList.countries[countryCode];
    for (const isoCode of countryInfo.languages) {
      if (!countriesInfo.hasOwnProperty(isoCode)) {
        countriesInfo[isoCode] = [];
      }

      if (!countriesInfo[isoCode].includes(countryCode)) {
        countriesInfo[isoCode].push(countryCode);
      }
    }
  }
  return countriesInfo;
}

export interface LanguageInfo {
  name: string;
  nativeName: string;
  countryCode: string;
}

export interface SupportedLanguage {
  isoCode: LanguageCode;
  countryCode?: string;
}

export interface LanguageSwitchStyles {
  flag?: ViewStyle;
  listboxContainer?: ViewStyle;
  listbox?: ViewStyle;
  container?: ViewStyle;
  listboxButton?: ViewStyle;
  iconContainer?: ViewStyle;
  chevronContainer?: ViewStyle;
}

export interface ExtraLanguageSwitchStyles {
  formLayout?: FormLayoutStyles;
  button?: ButtonStyles;
  label?: TypographyStyles;
  bottomSheet?: BottomSheetStyles;
  bottomSheetItem?: BottomSheetItemStyles;
  extraBottomSheetItem?: ExtraBottomSheetItemStyles;
}

export interface LanguageSwitchProps {
  type?: 'button' | 'listbox' | 'none';
  language?: LanguageCode;
  open?: boolean;
  supportedLanguages?: SupportedLanguage[];
  snapPoints?: string[];
  hideText?: boolean;
  floatingLabel?: string;
  customStyles?: LanguageSwitchStyles;
  customLightStyles?: LanguageSwitchStyles;
  customDarkStyles?: LanguageSwitchStyles;
  customExtraStyles?: ExtraLanguageSwitchStyles;
  customExtraLightStyles?: ExtraLanguageSwitchStyles;
  customExtraDarkStyles?: ExtraLanguageSwitchStyles;
  id?: string;
  label?: string;
  labelOptional?: string;
  descriptionText?: string;
  onOpen?: (event: GestureResponderEvent) => void;
  onClose?: () => void;
  onChange?: (code: LanguageCode, info: LanguageInfo) => void;
}

export const countriesInfo = getCountriesInfo();

const defaultSupportedLanguages = Object.keys(countriesInfo).map((value) => ({
  isoCode: value as LanguageCode,
}));

const styles = StyleSheet.create<LanguageSwitchStyles>({});

const lightStyles = StyleSheet.create<LanguageSwitchStyles>({});

const darkStyles = StyleSheet.create<LanguageSwitchStyles>({});

export default function LanguageSwitch({
  type = 'button',
  language = 'en',
  open = false,
  supportedLanguages = defaultSupportedLanguages,
  snapPoints,
  hideText = false,
  floatingLabel,
  customStyles,
  customLightStyles,
  customDarkStyles,
  customExtraStyles,
  customExtraLightStyles,
  customExtraDarkStyles,
  id,
  label,
  labelOptional,
  descriptionText,
  onOpen,
  onClose,
  onChange,
}: LanguageSwitchProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [languagesInfo, setLanguagesInfo] = useState<{
    [isoCode: string]: LanguageInfo;
  }>({});

  useEffect(() => {
    const info: { [isoCode: string]: LanguageInfo } = {};

    supportedLanguages.forEach((supportedLanguage) => {
      // @ts-ignore
      const name = ISO6391.getName(supportedLanguage.isoCode);
      // @ts-ignore
      const nativeName = ISO6391.getNativeName(supportedLanguage.isoCode);

      const defaultCountryCode = countriesInfo[supportedLanguage.isoCode][0];
      info[supportedLanguage.isoCode] = {
        name,
        nativeName,
        countryCode: supportedLanguage.countryCode ?? defaultCountryCode,
      };
    });

    setLanguagesInfo(info);
  }, [supportedLanguages]);

  useEffect(() => {
    if (languagesInfo[language]) {
      onChange?.(language, languagesInfo[language]);
    }
  }, [language, languagesInfo]);

  const renderItem = useCallback(
    ({ item, index }: any) => {
      return (
        <BottomSheet.Item
          customStyles={customExtraStyles?.bottomSheetItem}
          customDarkStyles={customExtraDarkStyles?.bottomSheetItem}
          customLightStyles={customExtraLightStyles?.bottomSheetItem}
          customExtraDarkStyles={customExtraDarkStyles?.extraBottomSheetItem}
          customExtraLightStyles={customExtraLightStyles?.extraBottomSheetItem}
          customExtraStyles={customExtraStyles?.extraBottomSheetItem}
          key={item.name}
          icon={
            <CountryFlag
              isoCode={
                languagesInfo[item.isoCode]?.countryCode?.toUpperCase() ?? 'ca'
              }
              size={21}
            />
          }
          onPress={(e) => {
            onChange?.(item.isoCode, languagesInfo[item.isoCode]);
            onClose?.();
          }}
        >
          {languagesInfo[item.isoCode]?.nativeName}
        </BottomSheet.Item>
      );
    },
    [languagesInfo]
  );

  return (
    <View>
      {type === 'button' && (
        <Button
          customStyles={customExtraStyles?.button}
          customLightStyles={customExtraLightStyles?.button}
          customDarkStyles={customExtraDarkStyles?.button}
          type={'text'}
          block={true}
          size={'full'}
          icon={
            <View
              style={[
                ...(isDarkTheme
                  ? [{ ...darkStyles?.flag, ...(customDarkStyles?.flag ?? {}) }]
                  : [
                      {
                        ...lightStyles?.flag,
                        ...(customLightStyles?.flag ?? {}),
                      },
                    ]),
                { ...styles.flag, ...(customStyles?.flag ?? {}) },
              ]}
            >
              <CountryFlag
                isoCode={
                  languagesInfo[language]?.countryCode?.toUpperCase() ?? 'ca'
                }
                size={21}
              />
            </View>
          }
          onPress={onOpen}
        >
          {!hideText && languagesInfo[language]?.nativeName}
        </Button>
      )}
      {type === 'listbox' && (
        <FormLayout
          label={label}
          labelOptional={labelOptional}
          id={id}
          descriptionText={descriptionText}
          customStyles={customExtraStyles?.formLayout}
          customLightStyles={customExtraLightStyles?.formLayout}
          customDarkStyles={customExtraDarkStyles?.formLayout}
          size={'medium'}
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
            <TouchableOpacity
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
                  <CountryFlag
                    isoCode={
                      languagesInfo[language]?.countryCode?.toUpperCase() ??
                      'ca'
                    }
                    size={21}
                  />
                </View>
                <Typography.Text
                  customStyles={customExtraStyles?.label}
                  customLightStyles={customExtraLightStyles?.label}
                  customDarkStyles={customExtraDarkStyles?.label}
                >
                  {languagesInfo[language]?.nativeName}
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
                  <ChevronRight
                    size={21}
                    color={isDarkTheme ? '#fff' : '#000'}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </FormLayout>
      )}
      <BottomSheet
        customStyles={customExtraStyles?.bottomSheet}
        customDarkStyles={customExtraDarkStyles?.bottomSheet}
        customLightStyles={customExtraLightStyles?.bottomSheet}
        id={`language-switch-${id}`}
        open={open}
        onClose={onClose}
      >
        <BottomSheet.FlatList
          data={supportedLanguages}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.iso2}
        />
      </BottomSheet>
    </View>
  );
}
