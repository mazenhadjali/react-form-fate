import type { Meta, StoryObj } from "@storybook/react";
import { radioItem } from "./radioItem";

const meta: Meta<typeof radioItem> = {
  title: "Components/radioItem",
  component: radioItem,
};

export default meta;
type Story = StoryObj<typeof radioItem>;

export const Default: Story = {
  args: {},
};
