import { Meta, StoryObj } from '@storybook/react';
import { Tabs } from '../components/Tabs';
import { View } from 'react-native';

const meta = {
  title: 'Displays/Tabs',
  component: Tabs,
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => {
    return (
      <Tabs
        defaultId={'tab2'}
        tabs={[
          { id: 'tab1', label: 'Tab 1' },
          { id: 'tab2', label: 'Tab 2' },
        ]}
      >
        <Tabs.Item key={0}>
          <View style={[{ backgroundColor: 'red', height: 500 }]} />
        </Tabs.Item>
        <Tabs.Item key={1}>
          <View style={[{ backgroundColor: 'blue', height: 500 }]} />
        </Tabs.Item>
      </Tabs>
    );
  },
};
