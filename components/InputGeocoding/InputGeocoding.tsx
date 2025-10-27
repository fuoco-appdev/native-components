/* eslint-disable react/react-in-jsx-scope */
import { iso31661, ISO31661AssignedEntry } from 'iso-3166';
import iso3166 from 'iso-3166-2';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageStyle,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Skeleton from 'react-native-reanimated-skeleton';
import {
  BottomSheet,
  BottomSheetItemStyles,
  BottomSheetStyles,
  ExtraBottomSheetItemStyles,
} from '../BottomSheet';
import Button, { ButtonStyles } from '../Button/Button';
import { FormLayout, FormLayoutStyles } from '../FormLayout/FormLayout';
import Input, { ExtraInputStyles, InputStyles } from '../Input/Input';
import Colors from '../Themes/colors';
import Globals from '../Themes/globals';
import MarginsPaddings from '../Themes/margins_paddings';
import Typography, { TypographyStyles } from '../Typography/Typography';

export interface NominatimSearchResult {
  place_id: number;
  licence: string;
  osm_type: 'node' | 'way' | 'relation';
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: { [key: string]: string | undefined };
  boundingbox?: [string, string, string, string];
  importance?: number;
  class?: string;
  type?: string;
}

export interface NominatimReverseResult {
  place_id: number;
  licence: string;
  osm_type: 'node' | 'way' | 'relation';
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: { [key: string]: string | undefined };
  boundingbox?: [string, string, string, string];
  error?: string | null;
}

export interface InputGeocodingStyles {
  container?: ViewStyle | TextStyle | ImageStyle;
  error?: ViewStyle | TextStyle | ImageStyle;
  withIcon?: ViewStyle | TextStyle | ImageStyle;
  borderless?: ViewStyle | TextStyle | ImageStyle;
  iconContainer?: ViewStyle | TextStyle | ImageStyle;
  input?: ViewStyle | TextStyle | ImageStyle;
  searchContainer?: ViewStyle;
  actionsContainer?: ViewStyle | TextStyle | ImageStyle;
}

export interface ExtraInputGeocodingStyles {
  formLayout?: FormLayoutStyles;
  button?: ButtonStyles;
  bottomSheet?: BottomSheetStyles;
  bottomSheetTitle?: TypographyStyles;
  bottomSheetText?: TypographyStyles;
  bottomSheetItem?: BottomSheetItemStyles;
  extraBottomSheetItem?: ExtraBottomSheetItemStyles;
  bottomSheetInput?: InputStyles;
  extraBottomSheetInput?: ExtraInputStyles;
}

export enum NominatimZoom {
  Country = 3,
  State = 5,
  County = 8,
  City = 10,
  Town = 12,
  Village = 13,
  Neighbourhood = 14,
  AnySettlement = 15,
  MajorStreets = 16,
  MajorAndMinorStreets = 17,
  Building = 18,
}

export interface InputGeocodingProps {
  userAgent: string;
  disableReverseSearch?: boolean;
  countryCodes?: string[];
  amenity?: string;
  street?: string;
  city?: string;
  county?: string;
  state?: string;
  country?: string;
  postalcode?: string;
  strings?: {
    bottomSheetTitle?: string;
    searchNotFound?: string;
    searchPlaceholder?: string;
  };
  layer?: 'address' | 'poi' | 'railway' | 'natural' | 'manmade';
  zoom?: NominatimZoom;
  defaultCoordinates?: {
    latitude: number;
    longitude: number;
  };
  customStyles?: InputGeocodingStyles;
  customLightStyles?: InputGeocodingStyles;
  customDarkStyles?: InputGeocodingStyles;
  customExtraStyles?: ExtraInputGeocodingStyles;
  customExtraDarkStyles?: ExtraInputGeocodingStyles;
  customExtraLightStyles?: ExtraInputGeocodingStyles;
  icon?: React.ReactNode;
  placeholder?: string;
  descriptionText?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  beforeLabel?: string;
  afterLabel?: string;
  labelOptional?: string;
  onSearchChanged?: (
    search: NominatimSearchResult | NominatimReverseResult,
    iso: {
      country?: ISO31661AssignedEntry;
      province?: iso3166.SubdivisionInfo.Full | null;
    }
  ) => void;
}

const styles = StyleSheet.create<InputGeocodingStyles>({
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
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: MarginsPaddings.mp_5,
    paddingRight: MarginsPaddings.mp_5,
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
const lightStyles = StyleSheet.create<InputGeocodingStyles>({
  root: {},
  container: {
    backgroundColor: Colors.gray_100,
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
const darkStyles = StyleSheet.create<InputGeocodingStyles>({
  root: {},
  container: {
    backgroundColor: Colors.dark_1,
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

function InputGeocodingSearch({
  customStyles,
  customDarkStyles,
  customLightStyles,
  customExtraStyles,
  customExtraLightStyles,
  customExtraDarkStyles,
  userAgent,
  layer,
  zoom,
  countryCodes,
  amenity,
  street,
  city,
  county,
  state,
  country,
  postalcode,
  onChanged,
  onClose,
  strings,
}: {
  customStyles?: InputGeocodingStyles;
  customDarkStyles?: InputGeocodingStyles;
  customLightStyles?: InputGeocodingStyles;
  customExtraStyles?: ExtraInputGeocodingStyles;
  customExtraDarkStyles?: ExtraInputGeocodingStyles;
  customExtraLightStyles?: ExtraInputGeocodingStyles;
  userAgent: string;
  layer: string;
  zoom: number;
  countryCodes?: string[];
  amenity?: string;
  street?: string;
  city?: string;
  county?: string;
  state?: string;
  country?: string;
  postalcode?: string;
  onChanged?: (item: NominatimSearchResult) => void;
  onClose?: () => void;
  strings?: {
    bottomSheetTitle?: string;
    searchNotFound?: string;
    searchPlaceholder?: string;
  };
}) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [searchValue, setSearchValue] = useState<string>('');
  const [items, setItems] = useState<NominatimSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFeaturePressed = (item: NominatimSearchResult) => {
    onChanged?.(item);
    onClose?.();
  };

  useEffect(() => {
    const url = 'https://nominatim.openstreetmap.org/search';
    const params = new URLSearchParams('');
    params.append('format', 'json');
    params.append('addressdetails', '1');

    if (countryCodes) {
      params.append('countrycodes', countryCodes.join(','));
    }
    if (zoom) {
      params.append('zoom', zoom.toString());
    }
    if (layer) {
      params.append('layer', layer);
    }
    if (amenity) {
      params.append('amenity', amenity);
    }

    if (
      street &&
      (zoom === NominatimZoom.MajorAndMinorStreets ||
        zoom === NominatimZoom.MajorStreets)
    ) {
      params.append('street', searchValue);
    } else if (street) {
      params.append('street', street);
    }

    if (city && zoom === NominatimZoom.City) {
      params.append('city', searchValue);
    } else if (city) {
      params.append('city', city);
    }

    if (county && zoom === NominatimZoom.County) {
      params.append('county', searchValue);
    } else if (county) {
      params.append('county', county);
    }

    if (state && zoom === NominatimZoom.State) {
      params.append('state', searchValue);
    } else if (state) {
      params.append('state', state);
    }

    if (country && zoom === NominatimZoom.Country) {
      params.append('country', searchValue);
    } else if (country) {
      params.append('country', country);
    }

    if (postalcode) {
      params.append('postalcode', postalcode);
    }

    setIsLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(`${url}?${params.toString()}`, {
          headers: {
            'User-Agent': userAgent,
          },
        });

        setIsLoading(false);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.length === 0) {
          console.log('No results found');
          return;
        }
        setItems(data);
      } catch (error) {
        console.error('Error fetching data, ', error);
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [
    userAgent,
    layer,
    zoom,
    searchValue,
    setItems,
    countryCodes,
    amenity,
    street,
    city,
    county,
    state,
    country,
    postalcode,
  ]);

  return (
    <View
      style={[
        ...(isDarkTheme
          ? [
              {
                ...darkStyles?.searchContainer,
                ...(customDarkStyles?.searchContainer ?? {}),
              },
            ]
          : [
              {
                ...lightStyles?.searchContainer,
                ...(customLightStyles?.searchContainer ?? {}),
              },
            ]),
        { ...styles.searchContainer, ...(customStyles?.searchContainer ?? {}) },
      ]}
    >
      <Typography.Title
        level={4}
        customStyles={{
          root: {
            flex: 1,
            textAlign: 'center',
            padding: MarginsPaddings.mp_3,
          },
          ...customExtraStyles?.bottomSheetTitle,
        }}
        customLightStyles={customExtraLightStyles?.bottomSheetTitle}
        customDarkStyles={customExtraDarkStyles?.bottomSheetTitle}
      >
        {strings?.bottomSheetTitle}
      </Typography.Title>
      <Input
        placeholder={strings?.searchPlaceholder}
        customStyles={{
          container: {
            marginTop: MarginsPaddings.mp_5,
            flex: 1,
          },
          ...customExtraStyles?.bottomSheetInput,
        }}
        customLightStyles={customExtraLightStyles?.bottomSheetInput}
        customDarkStyles={customExtraDarkStyles?.bottomSheetInput}
        customExtraStyles={customExtraStyles?.extraBottomSheetInput}
        customExtraLightStyles={customExtraLightStyles?.extraBottomSheetInput}
        customExtraDarkStyles={customExtraDarkStyles?.extraBottomSheetInput}
        value={searchValue}
        onChange={(e) => setSearchValue(e.nativeEvent.text)}
      />
      {!isLoading &&
        items.length > 0 &&
        items?.map((value) => (
          <BottomSheet.Item
            key={value.place_id}
            onPress={() => onFeaturePressed(value)}
            customStyles={customExtraStyles?.bottomSheetItem}
            customDarkStyles={customExtraDarkStyles?.bottomSheetItem}
            customLightStyles={customExtraLightStyles?.bottomSheetItem}
            customExtraStyles={customExtraStyles?.extraBottomSheetItem}
            customExtraLightStyles={
              customExtraLightStyles?.extraBottomSheetItem
            }
            customExtraDarkStyles={customExtraDarkStyles?.extraBottomSheetItem}
          >
            {value.display_name}
          </BottomSheet.Item>
        ))}
      {!isLoading && items.length <= 0 && (
        <Typography.Text
          customStyles={{
            root: {
              width: '100%',
              textAlign: 'center',
              padding: MarginsPaddings.mp_5,
              ...customExtraStyles?.bottomSheetText,
            },
          }}
          customLightStyles={customExtraLightStyles?.bottomSheetText}
          customDarkStyles={customExtraDarkStyles?.bottomSheetText}
        >
          {strings?.searchNotFound}
        </Typography.Text>
      )}
      {isLoading && (
        <Skeleton
          isLoading={true}
          containerStyle={{
            display: 'flex',
            flexDirection: 'column',
          }}
          layout={[
            {
              key: 'text1',
              width: '100%',
              height: 13,
              borderRadius: 13,
              marginTop: MarginsPaddings.mp_5 + 4,
              marginBottom: 4,
            },
            {
              key: 'text2',
              width: '34%',
              height: 13,
              borderRadius: 13,
              marginTop: 4,
              marginBottom: MarginsPaddings.mp_5 + 4,
            },
            {
              key: 'text3',
              width: '100%',
              height: 13,
              borderRadius: 13,
              marginTop: MarginsPaddings.mp_5 + 4,
              marginBottom: 4,
            },
            {
              key: 'text4',
              width: '34%',
              height: 13,
              borderRadius: 13,
              marginTop: 4,
              marginBottom: MarginsPaddings.mp_5 + 4,
            },
            {
              key: 'text5',
              width: '100%',
              height: 13,
              borderRadius: 13,
              marginTop: MarginsPaddings.mp_5 + 4,
              marginBottom: 4,
            },
            {
              key: 'text6',
              width: '34%',
              height: 13,
              borderRadius: 13,
              marginTop: 4,
              marginBottom: MarginsPaddings.mp_5 + 4,
            },
            {
              key: 'text7',
              width: '100%',
              height: 13,
              borderRadius: 13,
              marginTop: MarginsPaddings.mp_5 + 4,
              marginBottom: 4,
            },
            {
              key: 'text8',
              width: '34%',
              height: 13,
              borderRadius: 13,
              marginTop: 4,
              marginBottom: MarginsPaddings.mp_5 + 4,
            },
          ]}
        />
      )}
    </View>
  );
}

function InputGeocoding({
  userAgent,
  disableReverseSearch,
  layer = 'address',
  zoom = NominatimZoom.Building,
  countryCodes,
  amenity,
  street,
  city,
  county,
  state,
  country,
  postalcode,
  defaultCoordinates,
  strings = {
    searchNotFound: 'No entries to show',
    searchPlaceholder: 'Search',
    bottomSheetTitle: 'Location',
  },
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  customExtraStyles = {},
  customExtraDarkStyles = {},
  customExtraLightStyles = {},
  icon,
  placeholder = '123 Main Street, Quebec, Canada',
  descriptionText,
  disabled,
  error,
  label = 'Location',
  beforeLabel,
  afterLabel,
  labelOptional,
  onSearchChanged,
}: InputGeocodingProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>();
  const [provinces, setProvinces] = useState<iso3166.CountryInfo.Full | null>(
    null
  );
  const { height } = Dimensions.get('screen');

  const onChanged = (data: NominatimSearchResult | NominatimReverseResult) => {
    onSearchChanged?.(data, {
      country: iso31661.find(
        (item) => item.alpha2 === data.address.country_code?.toUpperCase()
      ),
      province: iso3166.subdivision(data.address?.['ISO3166-2-lvl4'] ?? ''),
    });
  };

  const onCountryChangedAsync = async (iso: ISO31661AssignedEntry) => {
    const url = 'https://nominatim.openstreetmap.org/search';
    const params = new URLSearchParams('');
    params.append('format', 'json');
    params.append('addressdetails', '1');

    if (countryCodes) {
      params.append('countrycodes', countryCodes.join(','));
    }

    params.append('country', iso.name);

    try {
      const response = await fetch(`${url}?${params.toString()}`, {
        headers: {
          'User-Agent': userAgent,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.length === 0) {
        console.log('No results found');
        return;
      }
      onSearchChanged?.(data[0], {
        country: iso,
      });
    } catch (error) {
      console.error('Error fetching data, ', error);
    }
  };

  const onProvinceChangedAsync = async (iso: iso3166.SubdivisionInfo.Full) => {
    const url = 'https://nominatim.openstreetmap.org/search';
    const params = new URLSearchParams('');
    params.append('format', 'json');
    params.append('addressdetails', '1');

    if (countryCodes) {
      params.append('countrycodes', countryCodes.join(','));
    }

    if (country) {
      params.append('country', country);
    }

    params.append('state', iso.name);

    try {
      const response = await fetch(`${url}?${params.toString()}`, {
        headers: {
          'User-Agent': userAgent,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.length === 0) {
        console.log('No results found');
        return;
      }
      onSearchChanged?.(data[0], {
        country: iso31661.find(
          (item) => item.alpha2 === iso.countryCode?.toUpperCase()
        ),
        province: iso,
      });
    } catch (error) {
      console.error('Error fetching data, ', error);
    }
  };

  useEffect(() => {
    if (value || disableReverseSearch) {
      return;
    }

    const updateLocationAsync = new Promise<void>(async (resolve, reject) => {
      let selectedLongitude = 0;
      let selectedLatitude = 0;
      let defaultLongitude = 0;
      let defaultLatitude = 0;

      if (defaultCoordinates) {
        defaultLongitude = defaultCoordinates.longitude ?? 0;
        defaultLatitude = defaultCoordinates.latitude ?? 0;
      }

      if (
        selectedLongitude === defaultLongitude &&
        selectedLatitude === defaultLatitude
      ) {
        resolve();
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${defaultLatitude}&lon=${defaultLongitude}&zoom=${zoom}&layer=${layer}&addressdetails=1`,
          {
            headers: {
              'User-Agent': userAgent,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: NominatimReverseResult = await response.json();
        if (data.error) {
          console.error('Error:', data.error);
          return;
        }

        if (data.display_name !== value) {
          onSearchChanged?.(data, {
            country: iso31661.find(
              (item) => item.alpha2 === data.address.country_code?.toUpperCase()
            ),
            province: iso3166.subdivision(
              data.address?.['ISO3166-2-lvl4'] ?? ''
            ),
          });
        }
        resolve();
      } catch (error: any) {
        console.error(error);
      }
    });

    updateLocationAsync.then();
  }, [defaultCoordinates, userAgent, layer, zoom, disableReverseSearch]);

  useEffect(() => {
    if (
      street &&
      (zoom === NominatimZoom.MajorAndMinorStreets ||
        zoom === NominatimZoom.MajorStreets)
    ) {
      setValue(street);
    }

    if (city && zoom === NominatimZoom.City) {
      setValue(city);
    }

    if (county && zoom === NominatimZoom.County) {
      setValue(county);
    }

    if (state && zoom === NominatimZoom.State) {
      setValue(state);
    }

    if (country && zoom === NominatimZoom.Country) {
      setValue(country);
      setProvinces(iso3166.country(country ?? ''));
    }
  }, [street, city, county, state, country, zoom]);

  return (
    <>
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
        <Button
          customStyles={{
            ...{
              button: {
                paddingTop: MarginsPaddings.mp_5,
                paddingBottom: MarginsPaddings.mp_5,
              },
            },
            ...customExtraStyles.button,
          }}
          customDarkStyles={customExtraDarkStyles.button}
          customLightStyles={customExtraLightStyles.button}
          type={'text'}
          size={'full'}
          icon={icon}
          onPress={() => setOpen(true)}
          disabled={disabled}
        >
          {!value ? placeholder : value}
        </Button>
      </FormLayout>
      {zoom !== NominatimZoom.Country && zoom !== NominatimZoom.State && (
        <BottomSheet
          id={'input-geocoding-search'}
          open={open}
          onClose={() => setOpen(false)}
          type={'scroll-view'}
          defaultSheetHeight={height * 0.6}
          customStyles={{
            root: {
              paddingBottom: MarginsPaddings.mp_5,
            },
            ...customExtraStyles.bottomSheet,
          }}
          customLightStyles={customExtraLightStyles.bottomSheet}
          customDarkStyles={customExtraDarkStyles.bottomSheet}
        >
          <InputGeocodingSearch
            customStyles={customStyles}
            customLightStyles={customLightStyles}
            customDarkStyles={customDarkStyles}
            customExtraStyles={customExtraStyles}
            customExtraLightStyles={customExtraLightStyles}
            customExtraDarkStyles={customExtraDarkStyles}
            userAgent={userAgent}
            layer={layer}
            zoom={zoom}
            countryCodes={countryCodes}
            amenity={amenity}
            street={street}
            city={city}
            county={county}
            state={state}
            country={country}
            postalcode={postalcode}
            strings={strings}
            onChanged={onChanged}
            onClose={() => setOpen(false)}
          />
        </BottomSheet>
      )}
      {zoom === NominatimZoom.Country && (
        <BottomSheet
          id={'input-geocoding-countries'}
          open={open}
          onClose={() => setOpen(false)}
          type={'flat-list'}
          defaultSheetHeight={height * 0.6}
          data={iso31661}
          renderItem={({ item }) => (
            <BottomSheet.Item
              customStyles={customExtraStyles?.bottomSheetItem}
              customDarkStyles={customExtraDarkStyles?.bottomSheetItem}
              customLightStyles={customExtraLightStyles?.bottomSheetItem}
              customExtraDarkStyles={
                customExtraDarkStyles?.extraBottomSheetItem
              }
              customExtraLightStyles={
                customExtraLightStyles?.extraBottomSheetItem
              }
              customExtraStyles={customExtraStyles?.extraBottomSheetItem}
              key={item.name}
              icon={
                <CountryFlag
                  isoCode={item.alpha2.toUpperCase() ?? 'ca'}
                  size={21}
                />
              }
              onPress={(e) => {
                onCountryChangedAsync(item);
                setOpen(false);
              }}
            >
              {item.name}
            </BottomSheet.Item>
          )}
          customStyles={{
            root: {
              paddingBottom: MarginsPaddings.mp_5,
            },
            ...customExtraStyles.bottomSheet,
          }}
          customLightStyles={customExtraLightStyles.bottomSheet}
          customDarkStyles={customExtraDarkStyles.bottomSheet}
        />
      )}
      {zoom === NominatimZoom.State && (
        <BottomSheet
          id={'input-geocoding-states'}
          open={open}
          onClose={() => setOpen(false)}
          type={'flat-list'}
          defaultSheetHeight={height * 0.6}
          data={Object.values(provinces?.sub ?? {})}
          renderItem={({ item }) => (
            <BottomSheet.Item
              customStyles={customExtraStyles?.bottomSheetItem}
              customDarkStyles={customExtraDarkStyles?.bottomSheetItem}
              customLightStyles={customExtraLightStyles?.bottomSheetItem}
              customExtraDarkStyles={
                customExtraDarkStyles?.extraBottomSheetItem
              }
              customExtraLightStyles={
                customExtraLightStyles?.extraBottomSheetItem
              }
              customExtraStyles={customExtraStyles?.extraBottomSheetItem}
              key={item.name}
              onPress={(e) => {
                const key = Object.keys(provinces?.sub ?? {}).find(
                  (subKey) => provinces?.sub[subKey].name === item.name
                );
                const subdivision = iso3166.subdivision(key ?? '');
                if (subdivision) {
                  onProvinceChangedAsync(subdivision);
                }

                setOpen(false);
              }}
            >
              {item.name}
            </BottomSheet.Item>
          )}
          customStyles={{
            root: {
              paddingBottom: MarginsPaddings.mp_5,
            },
            ...customExtraStyles.bottomSheet,
          }}
          customLightStyles={customExtraLightStyles.bottomSheet}
          customDarkStyles={customExtraDarkStyles.bottomSheet}
        />
      )}
    </>
  );
}

export interface AddressFormStyles {
  root?: ViewStyle;
  horizontalContainer?: ViewStyle;
}

export interface ExtraAddressFormStyles {
  inputGeocoding?: InputGeocodingStyles;
  extraInputGeocoding?: ExtraInputGeocodingStyles;
  input?: InputStyles;
  extraInput?: ExtraInputStyles;
}

export interface AddressFormProps {
  userAgent: string;
  strings?: {
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    civic?: string;
    postalCode?: string;
  };
  defaultCoordinates?: {
    latitude: number;
    longitude: number;
  };
  value?: {
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    civic?: string;
    postalCode?: string;
  };
  placeholder?: {
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    civic?: string;
    postalCode?: string;
  };
  error?: {
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    civic?: string;
    postalCode?: string;
  };
  customStyles?: AddressFormStyles;
  customLightStyles?: AddressFormStyles;
  customDarkStyles?: AddressFormStyles;
  customExtraStyles?: ExtraAddressFormStyles;
  customExtraDarkStyles?: ExtraAddressFormStyles;
  customExtraLightStyles?: ExtraAddressFormStyles;
  onSearchChanged?: (
    search: NominatimReverseResult,
    iso: {
      country?: ISO31661AssignedEntry;
      province?: iso3166.SubdivisionInfo.Full | null;
    }
  ) => void;
  onCountryChanged?: (
    search: NominatimSearchResult,
    iso: {
      country?: ISO31661AssignedEntry;
      province?: iso3166.SubdivisionInfo.Full | null;
    }
  ) => void;
  onStateChanged?: (
    search: NominatimSearchResult,
    iso: {
      country?: ISO31661AssignedEntry;
      province?: iso3166.SubdivisionInfo.Full | null;
    }
  ) => void;
  onCityChanged?: (
    search: NominatimSearchResult,
    iso: {
      country?: ISO31661AssignedEntry;
      province?: iso3166.SubdivisionInfo.Full | null;
    }
  ) => void;
  onStreetChanged?: (
    search: NominatimSearchResult,
    iso: {
      country?: ISO31661AssignedEntry;
      province?: iso3166.SubdivisionInfo.Full | null;
    }
  ) => void;
  onCivicChanged?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  onPostalCodeChanged?: (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => void;
}

const addressFormStyles = StyleSheet.create<AddressFormStyles>({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  horizontalContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: MarginsPaddings.mp_5,
  },
});
const addressFormLightStyles = StyleSheet.create<AddressFormStyles>({});
const addressFormDarkStyles = StyleSheet.create<AddressFormStyles>({});

function AddressForm({
  userAgent,
  defaultCoordinates,
  value,
  strings = {
    country: 'Country',
    state: 'State / Province',
    city: 'City',
    street: 'Street',
    civic: 'Civic',
    postalCode: 'Postal code',
  },
  placeholder = {
    country: 'Canada',
    state: 'Quebec',
    city: 'Montreal',
    street: 'Peel',
    civic: '123',
    postalCode: 'A1B 2C3',
  },
  error,
  customStyles = {},
  customLightStyles = {},
  customDarkStyles = {},
  customExtraStyles = {},
  customExtraDarkStyles = {},
  customExtraLightStyles = {},
  onSearchChanged,
  onCountryChanged,
  onStateChanged,
  onCityChanged,
  onStreetChanged,
  onCivicChanged,
  onPostalCodeChanged,
}: AddressFormProps) {
  const theme = useColorScheme();
  const isDarkTheme = theme === 'dark';
  const [reverseResult, setReverseResult] = useState<
    NominatimReverseResult | undefined
  >(undefined);
  const [countryValue, setCountryValue] = useState<string | undefined>(
    value?.country
  );
  const [stateValue, setStateValue] = useState<string | undefined>(
    value?.state
  );
  const [cityValue, setCityValue] = useState<string | undefined>(value?.city);
  const [streetValue, setStreetValue] = useState<string | undefined>(
    value?.street
  );
  const [civicValue, setCivicValue] = useState<string | undefined>(
    value?.civic
  );
  const [postalCodeValue, setPostalCodeValue] = useState<string | undefined>(
    value?.postalCode
  );

  useEffect(() => {
    if (
      reverseResult ||
      (value && !Object.values<string | undefined>(value).includes(undefined))
    ) {
      return;
    }

    const updateLocationAsync = new Promise<void>(async (resolve, reject) => {
      let selectedLongitude = 0;
      let selectedLatitude = 0;
      let defaultLongitude = 0;
      let defaultLatitude = 0;

      if (defaultCoordinates) {
        defaultLongitude = defaultCoordinates.longitude ?? 0;
        defaultLatitude = defaultCoordinates.latitude ?? 0;
      }

      if (
        selectedLongitude === defaultLongitude &&
        selectedLatitude === defaultLatitude
      ) {
        resolve();
      }

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${defaultLatitude}&lon=${defaultLongitude}&zoom=${NominatimZoom.Building}&layer=address&addressdetails=1`,
          {
            headers: {
              'User-Agent': userAgent,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: NominatimReverseResult = await response.json();
        if (data.error) {
          console.error('Error:', data.error);
          return;
        }

        const country = data.address.country;
        const county = data.address.county;
        const houseNumber = data.address.house_number;
        const postalCode = data.address.postcode;
        const region = data.address.region;
        const road = data.address.road;
        const state = data.address.state;
        const town = data.address.town;
        setReverseResult(data);
        setCountryValue(country);
        setStateValue(state);
        setCityValue(town);
        setStreetValue(road);
        setCivicValue(houseNumber);
        setPostalCodeValue(postalCode);
        onSearchChanged?.(data, {
          country: iso31661.find(
            (item) => item.alpha2 === data.address.country_code?.toUpperCase()
          ),
          province: iso3166.subdivision(data.address?.['ISO3166-2-lvl4'] ?? ''),
        });
        resolve();
      } catch (error: any) {
        console.error(error);
      }
    });

    updateLocationAsync.then();
  }, [defaultCoordinates, userAgent, value]);

  return (
    <View
      style={[
        ...(isDarkTheme
          ? [
              {
                ...addressFormDarkStyles?.root,
                ...(customDarkStyles?.root ?? {}),
              },
            ]
          : [
              {
                ...addressFormLightStyles?.root,
                ...(customLightStyles?.root ?? {}),
              },
            ]),
        { ...addressFormStyles.root, ...(customStyles?.root ?? {}) },
      ]}
    >
      <InputGeocoding
        userAgent={userAgent}
        zoom={NominatimZoom.Country}
        country={value?.country ?? countryValue}
        label={strings.country}
        disableReverseSearch={true}
        customStyles={customExtraStyles.inputGeocoding}
        customLightStyles={customExtraLightStyles.inputGeocoding}
        customDarkStyles={customExtraDarkStyles.inputGeocoding}
        customExtraStyles={customExtraStyles.extraInputGeocoding}
        customExtraLightStyles={customExtraLightStyles.extraInputGeocoding}
        customExtraDarkStyles={customExtraDarkStyles.extraInputGeocoding}
        placeholder={placeholder?.country}
        error={error?.country}
        onSearchChanged={onCountryChanged}
      />
      <InputGeocoding
        userAgent={userAgent}
        zoom={NominatimZoom.State}
        country={value?.country ?? countryValue}
        state={value?.state ?? stateValue}
        label={strings.state}
        disableReverseSearch={true}
        customStyles={customExtraStyles.inputGeocoding}
        customLightStyles={customExtraLightStyles.inputGeocoding}
        customDarkStyles={customExtraDarkStyles.inputGeocoding}
        customExtraStyles={customExtraStyles.extraInputGeocoding}
        customExtraLightStyles={customExtraLightStyles.extraInputGeocoding}
        customExtraDarkStyles={customExtraDarkStyles.extraInputGeocoding}
        placeholder={placeholder?.state}
        error={error?.state}
        onSearchChanged={onStateChanged}
      />
      <InputGeocoding
        userAgent={userAgent}
        zoom={NominatimZoom.City}
        country={value?.country ?? countryValue}
        state={value?.state ?? stateValue}
        city={value?.city ?? cityValue}
        label={strings.city}
        disableReverseSearch={true}
        customStyles={customExtraStyles.inputGeocoding}
        customLightStyles={customExtraLightStyles.inputGeocoding}
        customDarkStyles={customExtraDarkStyles.inputGeocoding}
        customExtraStyles={customExtraStyles.extraInputGeocoding}
        customExtraLightStyles={customExtraLightStyles.extraInputGeocoding}
        customExtraDarkStyles={customExtraDarkStyles.extraInputGeocoding}
        placeholder={placeholder?.city}
        error={error?.city}
        onSearchChanged={onCityChanged}
      />
      <InputGeocoding
        userAgent={userAgent}
        zoom={NominatimZoom.MajorAndMinorStreets}
        country={value?.country ?? countryValue}
        state={value?.state ?? stateValue}
        city={value?.city ?? cityValue}
        street={value?.street ?? streetValue}
        label={strings.street}
        disableReverseSearch={true}
        customStyles={customExtraStyles.inputGeocoding}
        customLightStyles={customExtraLightStyles.inputGeocoding}
        customDarkStyles={customExtraDarkStyles.inputGeocoding}
        customExtraStyles={customExtraStyles.extraInputGeocoding}
        customExtraLightStyles={customExtraLightStyles.extraInputGeocoding}
        customExtraDarkStyles={customExtraDarkStyles.extraInputGeocoding}
        placeholder={placeholder?.street}
        error={error?.street}
        onSearchChanged={onStreetChanged}
      />
      <View
        style={[
          ...(isDarkTheme
            ? [
                {
                  ...addressFormDarkStyles?.horizontalContainer,
                  ...(customDarkStyles?.horizontalContainer ?? {}),
                },
              ]
            : [
                {
                  ...addressFormLightStyles?.horizontalContainer,
                  ...(customLightStyles?.horizontalContainer ?? {}),
                },
              ]),
          {
            ...addressFormStyles.horizontalContainer,
            ...(customStyles?.horizontalContainer ?? {}),
          },
        ]}
      >
        <Input
          type={'number-pad'}
          label={strings.civic}
          customStyles={customExtraStyles.input}
          customLightStyles={customExtraLightStyles.input}
          customDarkStyles={customExtraDarkStyles.input}
          customExtraStyles={customExtraStyles.extraInput}
          customExtraLightStyles={customExtraLightStyles.extraInput}
          customExtraDarkStyles={customExtraDarkStyles.extraInput}
          placeholder={placeholder?.civic}
          error={error?.civic}
          value={value?.civic ?? civicValue}
          onChange={onCivicChanged}
        />
        <Input
          type={'default'}
          label={strings.postalCode}
          customStyles={customExtraStyles.input}
          customLightStyles={customExtraLightStyles.input}
          customDarkStyles={customExtraDarkStyles.input}
          customExtraStyles={customExtraStyles.extraInput}
          customExtraLightStyles={customExtraLightStyles.extraInput}
          customExtraDarkStyles={customExtraDarkStyles.extraInput}
          placeholder={placeholder?.postalCode}
          error={error?.postalCode}
          value={value?.postalCode ?? postalCodeValue}
          onChange={onPostalCodeChanged}
          textInputProps={{
            maxLength: 7,
            autoCapitalize: 'characters',
          }}
        />
      </View>
    </View>
  );
}

InputGeocoding.AddressForm = AddressForm;

export default InputGeocoding;
