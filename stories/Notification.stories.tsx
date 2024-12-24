import type { Meta, StoryObj } from '@storybook/react';
import { Notification, useNotification } from '../components/Notification';
import { PortalProvider } from '../components/Portal';
import { View } from 'react-native';
import { Button } from '../components/Button';
import { useRef, useState } from 'react';

const meta = {
  title: 'Overlay/Notification',
  component: Notification,
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const notificationContext = useNotification();
    const indexRef = useRef<number>(0);
    return (
      <PortalProvider>
        <Notification.Manager>
          <View
            style={[
              {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
              },
            ]}
          >
            <Button
              onPress={() => {
                indexRef.current += 1;
                notificationContext.showNotification({
                  title: 'Hello' + indexRef.current,
                  message: 'How are you?',
                });
              }}
            >
              Add notification
            </Button>
          </View>
        </Notification.Manager>
      </PortalProvider>
    );
  },
};
