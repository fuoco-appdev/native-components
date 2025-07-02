/* eslint-disable react/react-in-jsx-scope */
import type { Meta, StoryObj } from '@storybook/react';
import {
  ChevronRight,
  ShoppingBag,
  Refresh,
  ShoppingBasket,
} from '../components/Icon/Icons/Line';
import Input from '../components/Input/Input';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Colors from '../components/Themes/colors';
import { MarginsPaddings, PortalProvider } from '../components';
import { useState } from 'react';

const meta = {
  title: 'Data Input/Input',
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [name, setName] = useState<string>('');
    return (
      <PortalProvider>
        <SafeAreaView style={[{ height: '100%', width: '100%' }]}>
          <Input
            placeholder={'Type text here ...'}
            disabled={false}
            label={'Name'}
            afterLabel={'right text'}
          />
          <Input
            placeholder={'Type text here ...'}
            disabled={false}
            label={'Name'}
            afterLabel={'right text'}
            value={name}
            onChange={(e) => setName(e.nativeEvent.text)}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: MarginsPaddings.mp_5,
            }}
          >
            <Input
              placeholder={'Type text here ...'}
              disabled={false}
              label={'Name'}
              afterLabel={'right text'}
              value={name}
              onChange={(e) => setName(e.nativeEvent.text)}
            />
            <Input
              placeholder={'Type text here ...'}
              disabled={false}
              label={'Name'}
              afterLabel={'right text'}
              value={name}
              onChange={(e) => setName(e.nativeEvent.text)}
            />
          </View>
        </SafeAreaView>
      </PortalProvider>
    );
  },
};

export const ErrorState: Story = {
  render: () => (
    <Input
      placeholder={'Type text here ...'}
      disabled={false}
      label={'Input with an error message'}
      error={'Your password must be less than 4 characters.'}
    />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Input
      placeholder={'Type text here ...'}
      disabled={false}
      label={'Input with an icon'}
      icon={<ShoppingBasket size={21} color={Colors.gray_900} />}
    />
  ),
};

export const WithOption: Story = {
  render: () => (
    <Input
      placeholder={'Type text here ...'}
      disabled={false}
      label={'Input with an error message'}
      labelOptional={'This is required'}
    />
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Input
      placeholder={'Type text here ...'}
      disabled={false}
      label={'Input with an error message'}
      descriptionText={'Make your password short and easy to guess'}
    />
  ),
};

export const TextArea: Story = {
  render: () => (
    <PortalProvider>
      <Input.TextArea label={'This is a text area'} afterLabel={'right text'} />
    </PortalProvider>
  ),
};

export const TextAreaWithError: Story = {
  render: () => (
    <Input.TextArea
      label={'This is a text area'}
      error={'Field cannot be empty'}
    />
  ),
};

export const TextAreaWithLimit: Story = {
  render: () => (
    <Input.TextArea
      label={'This is a text area, with 10 rows'}
      labelOptional={'500 character limit'}
      numberOfLines={10}
      limit={500}
    />
  ),
};

export const WithRevealAndCopy: Story = {
  render: () => (
    <Input
      label={'Reveal and copy'}
      labelOptional={'Reveal the text, then copy it'}
      value={'12341234HDGRHSGR/adJDJD'}
      copy={true}
      reveal={true}
    />
  ),
};

export const WithCustomActions: Story = {
  render: () => <Input />,
};

export const WithBeforeAndAfterLabel: Story = {
  render: () => <Input />,
};

export const Size: Story = {
  render: () => <Input />,
};

export const Borderless: Story = {
  render: () => <Input />,
};

export const Date: Story = {
  render: () => <Input />,
};
