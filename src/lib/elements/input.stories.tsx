import type { Meta, StoryObj } from "@storybook/react";
import { input } from "./input";

const meta: Meta<typeof input> = {
  title: "Components/input",
  component: input,
};

export default meta;
type Story = StoryObj<typeof input>;

export const Default: Story = {
  args: {},
};
