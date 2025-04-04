import type { Meta, StoryObj } from "@storybook/react";
import { textarea } from "./textarea";

const meta: Meta<typeof textarea> = {
  title: "Components/textarea",
  component: textarea,
};

export default meta;
type Story = StoryObj<typeof textarea>;

export const Default: Story = {
  args: {},
};
