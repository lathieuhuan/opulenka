import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { Input } from "./Input"

const meta = {
	title: "Input",
	component: Input,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const States: Story = {
	argTypes: {},
	parameters: {
		layout: "padded",
	},
	render: (args) => (
		<div className="w-80 flex flex-col gap-2">
			<Input {...args} placeholder="Default" />
			<Input {...args} placeholder="Disabled" disabled />
			<Input {...args} placeholder="Invalid" aria-invalid />
			<Input {...args} placeholder="Invalid disabled" aria-invalid disabled />
			<Input {...args} placeholder="Read Only" readOnly />
		</div>
	),
}