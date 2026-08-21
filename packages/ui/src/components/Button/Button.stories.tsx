import type { Meta, StoryObj } from "@storybook/react-vite"
import { Plus } from "lucide-react"
import { fn } from "storybook/test"
import { Button, type ButtonProps } from "./Button"

const VARIANTS: ButtonProps["variant"][] = [
	"solid/neutral",
	"outline/neutral",
	"ghost/neutral",
	"solid/danger",
	"outline/danger",
	"ghost/danger",
	"solid/primary",
]

const SIZES: ButtonProps["size"][] = ["xs", "sm", "md", "lg"]

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
			options: VARIANTS,
		},
		size: {
			control: "select",
			options: SIZES,
		},
		icon: {
			control: false,
		},
	},
	args: {
		children: "Button",
		onClick: fn(),
	},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const WithIcon: Story = {
	args: {
		icon: <Plus />,
	},
}

export const IconOnly: Story = {
	argTypes: {
		children: {
			control: false,
		},
	},
	args: {
		icon: <Plus />,
		children: undefined,
	},
}

export const Variants: Story = {
	argTypes: {
		variant: {
			control: false,
		},
	},
	render: (args) => (
		<div className="grid grid-cols-3 gap-2">
			{VARIANTS.map((variant) => (
				<div key={variant}>
					<Button variant={variant} {...args}>
						{variant}
					</Button>
				</div>
			))}
		</div>
	),
}