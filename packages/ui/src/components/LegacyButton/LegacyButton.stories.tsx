import type { Meta, StoryObj } from "@storybook/react-vite"
import { Plus } from "lucide-react"
import { fn } from "storybook/test"
import { LegacyButton, type LegacyButtonProps } from "./LegacyButton"

const VARIANTS: LegacyButtonProps["variant"][] = [
	"default",
	"secondary",
	"destructive",
	"outline",
	"ghost",
	"link",
]

const SIZES: LegacyButtonProps["size"][] = [
	"default",
	"xs",
	"sm",
	"lg",
	"icon",
	"icon-xs",
	"icon-sm",
	"icon-lg",
]

const meta = {
	title: "LegacyButton",
	component: LegacyButton,
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
	},
	args: { onClick: fn(), children: "Button" },
} satisfies Meta<typeof LegacyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
}

export const Variants: Story = {
	args: {
		variant: "default",
		size: "default",
	},
	argTypes: {
		variant: {
			control: false,
		},
		size: {
			control: false,
		},
	},
	render: (args) => (
		<div className="flex flex-col gap-2">
			{SIZES.map((size) => (
				<div
					key={size}
					className="grid grid-cols-3 gap-2"
					style={{
						gridTemplateColumns: `repeat(${VARIANTS.length + 1}, minmax(0, 1fr))`,
					}}
				>
					<div>{size}</div>

					{VARIANTS.map((variant) => (
						<div key={variant}>
							<LegacyButton {...args} variant={variant} size={size}>
								{size?.startsWith("icon") ? <Plus /> : variant}
							</LegacyButton>
						</div>
					))}
				</div>
			))}
		</div>
	),
}