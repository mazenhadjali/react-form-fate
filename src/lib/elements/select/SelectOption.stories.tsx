import type { Meta, StoryObj } from "@storybook/react";
import { SelectOption } from "./SelectOption";

const meta: Meta<typeof SelectOption> = {
  title: "Components/SelectOption",
  component: SelectOption,
};

export default meta;
type Story = StoryObj<typeof SelectOption>;

export const Default: Story = {
  args: {},
};
