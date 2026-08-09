import type { Meta, StoryObj } from "@storybook/react-vite"
import { fn } from "storybook/test"
import { Button } from "./Button"

const meta = {
	title: "Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: [
				"default",
				"outline",
				"secondary",
				"ghost",
				"destructive",
				"link",
			],
		},
		size: {
			control: "select",
			options: [
				"default",
				"xs",
				"sm",
				"lg",
				"icon",
				"icon-xs",
				"icon-sm",
				"icon-lg",
			],
		},
	},
	args: { onClick: fn(), children: "Button" },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}