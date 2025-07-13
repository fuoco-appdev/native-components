/* eslint-disable react/react-in-jsx-scope */
import type { Meta, StoryObj } from '@storybook/react';
import {
  ChevronRight,
  ShoppingBag,
  Refresh,
  ShoppingBasket,
} from '../components/Icon/Icons/Line';
import InputTag from '../components/InputTag/InputTag';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Colors from '../components/Themes/colors';
import { MarginsPaddings, PortalProvider } from '../components';
import { useState } from 'react';

const meta = {
  title: 'Data Input/InputTag',
  component: InputTag,
} satisfies Meta<typeof InputTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [tags, setTags] = useState<string[]>([]);
    return (
      <PortalProvider>
        <SafeAreaView style={[{ height: '100%', width: '100%' }]}>
          <InputTag
            placeholder={'Type text here ...'}
            disabled={false}
            label={'Name'}
            afterLabel={'right text'}
            tags={tags}
            onAddTag={(value) => setTags([...tags, value])}
            onRemoveTag={(tagIndex) =>
              setTags(tags.filter((value, index) => index !== tagIndex))
            }
          />
          <InputTag
            placeholder={'Type text here ...'}
            disabled={false}
            label={'Name'}
            afterLabel={'right text'}
            tags={tags}
            onAddTag={(value) => setTags([...tags, value])}
            onRemoveTag={(tagIndex) =>
              setTags(tags.filter((value, index) => index !== tagIndex))
            }
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: MarginsPaddings.mp_5,
            }}
          >
            <InputTag
              placeholder={'Type text here ...'}
              disabled={false}
              label={'Name'}
              afterLabel={'right text'}
              onAddTag={(value) => setTags([...tags, value])}
              onRemoveTag={(tagIndex) =>
                setTags(tags.filter((value, index) => index !== tagIndex))
              }
            />
            <InputTag
              placeholder={'Type text here ...'}
              disabled={false}
              label={'Name'}
              afterLabel={'right text'}
              onAddTag={(value) => setTags([...tags, value])}
              onRemoveTag={(tagIndex) =>
                setTags(tags.filter((value, index) => index !== tagIndex))
              }
            />
          </View>
        </SafeAreaView>
      </PortalProvider>
    );
  },
};

export const ErrorState: Story = {
  render: () => (
    <InputTag
      placeholder={'Type text here ...'}
      disabled={false}
      label={'Input with an error message'}
      error={'Your password must be less than 4 characters.'}
    />
  ),
};

export const WithIcon: Story = {
  render: () => (
    <InputTag
      placeholder={'Type text here ...'}
      disabled={false}
      label={'Input with an icon'}
      icon={<ShoppingBasket size={21} color={Colors.gray_900} />}
    />
  ),
};

export const WithOption: Story = {
  render: () => (
    <InputTag
      placeholder={'Type text here ...'}
      disabled={false}
      label={'Input with an error message'}
      labelOptional={'This is required'}
    />
  ),
};

export const WithDescription: Story = {
  render: () => (
    <InputTag
      placeholder={'Type text here ...'}
      disabled={false}
      label={'Input with an error message'}
      descriptionText={'Make your password short and easy to guess'}
    />
  ),
};
