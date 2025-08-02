import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from '../src/components/ui/label';
import { Input } from '../src/components/ui/input';

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: { type: 'text' }
    }
  }
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label text'
  }
};

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  )
};

export const Required: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="password">
        Password <span className="text-red-500">*</span>
      </Label>
      <Input id="password" type="password" placeholder="Enter your password" required />
    </div>
  )
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="username">Username</Label>
      <Input id="username" type="text" placeholder="Enter your username" />
      <p className="text-sm text-gray-500">This will be your public display name.</p>
    </div>
  )
};