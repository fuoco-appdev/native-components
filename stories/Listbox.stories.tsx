import { Meta, StoryObj } from '@storybook/react';
import Listbox from '../components/Listbox/Listbox';
import { PortalProvider } from '../components/Portal';
import { useState } from 'react';
import { BottomSheet } from '../components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const meta = {
  title: 'Data Input/Listbox',
  component: Listbox,
} satisfies Meta<typeof Listbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const options: { id: string; value: string }[] = [
      { id: 'one', value: 'one' },
      { id: 'two', value: 'two' },
      { id: 'three', value: 'three' },
      { id: 'four', value: 'four' },
    ];
    return (
      <GestureHandlerRootView>
        <PortalProvider>
          <Listbox
            data={options}
            open={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            renderBottomSheetItem={({
              item,
              index,
            }: {
              item: { id: string; value: string };
              index: number;
            }) => (
              <BottomSheet.Item
                key={item.id}
                onPress={() => {
                  setSelectedIndex(index);
                  setIsOpen(false);
                }}
              >
                {item.value}
              </BottomSheet.Item>
            )}
          >
            {options[selectedIndex].value}
          </Listbox>
        </PortalProvider>
      </GestureHandlerRootView>
    );
  },
};
