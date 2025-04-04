import type { Meta, StoryObj } from "@storybook/react";
import { button } from "./button";

const meta: Meta<typeof button> = {
  title: "Components/button",
  component: button,
};

export default meta;
type Story = StoryObj<typeof button>;

export const Default: Story = {
  args: {},
};
