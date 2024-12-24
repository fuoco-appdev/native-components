import type { Meta, StoryObj } from '@storybook/react';
import Modal from '../components/Modal/Modal';
import { useState } from 'react';

const meta = {
  title: 'Overlay/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isVisible: true,
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
      <Modal
        {...args}
        isVisible={isOpen}
        title={'test'}
        description={'this is a test'}
        onClose={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      />
    );
  },
};
