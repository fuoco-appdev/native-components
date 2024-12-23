import type { Meta, StoryObj } from '@storybook/react';
import Modal from '../components/Modal/Modal';

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
    return <Modal {...args} title={'test'} description={'this is a test'} />;
  },
};
