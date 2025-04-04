import type { Meta, StoryObj } from "@storybook/react";
import { radioGroup } from "./radioGroup";

const meta: Meta<typeof radioGroup> = {
  title: "Components/radioGroup",
  component: radioGroup,
};

export default meta;
type Story = StoryObj<typeof radioGroup>;

export const Default: Story = {
  args: {},
};
