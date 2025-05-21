import { MAPBOX_ACCESS_TOKEN } from '@env';
import { Meta, StoryObj } from '@storybook/react';
import { InputGeocoding } from '../components/InputGeocoding';
import PortalProvider from '../components/Portal/PortalProvider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const meta = {
  title: 'Data Input/Geocoding',
  component: InputGeocoding,
} satisfies Meta<typeof InputGeocoding>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <GestureHandlerRootView>
        <PortalProvider>
          <InputGeocoding
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN ?? ''}
            defaultCoordinates={[-73.2876515, 45.526246]}
          ></InputGeocoding>
        </PortalProvider>
      </GestureHandlerRootView>
    );
  },
};
