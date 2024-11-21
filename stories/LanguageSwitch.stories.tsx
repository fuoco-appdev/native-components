import { Meta, StoryObj } from '@storybook/react';
import { LanguageSwitch } from '../components/LanguageSwitch';
import { useState } from 'react';
import { LanguageCode } from 'iso-639-1';
import { PortalProvider } from '../components/Portal';

const meta = {
  title: 'General/LanguageSwitch',
  component: LanguageSwitch,
} satisfies Meta<typeof LanguageSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [language, setLanguage] = useState<LanguageCode>('en');
    const [open, setOpen] = useState<boolean>(false);
    return (
      <PortalProvider>
        <LanguageSwitch
          language={language}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onChange={(code, info) => {
            console.log(code);
            console.log(info);
            setLanguage(code);
          }}
        />
      </PortalProvider>
    );
  },
};
