import { MAPBOX_ACCESS_TOKEN } from '@env';
import { Meta, StoryObj } from '@storybook/react';
import { InputMapboxGeocoding } from '../components/InputMapboxGeocoding';
import PortalProvider from '../components/Portal/PortalProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const meta = {
  title: 'Data Input/Mapbox Geocoding',
  component: InputMapboxGeocoding,
} satisfies Meta<typeof InputMapboxGeocoding>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <GestureHandlerRootView>
        <PortalProvider>
          <InputMapboxGeocoding
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN ?? ''}
            defaultCoordinates={{
              longitude: -73.2876515,
              latitude: 45.526246,
            }}
          ></InputMapboxGeocoding>
        </PortalProvider>
      </GestureHandlerRootView>
    );
  },
};

export const AddressForm: Story = {
  render: () => {
    return (
      <GestureHandlerRootView>
        <PortalProvider>
          <InputMapboxGeocoding.AddressForm
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN ?? ''}
            defaultCoordinates={{
              longitude: -73.2876515,
              latitude: 45.526246,
            }}
          ></InputMapboxGeocoding.AddressForm>
        </PortalProvider>
      </GestureHandlerRootView>
    );
  },
};
