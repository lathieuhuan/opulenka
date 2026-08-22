import type { Meta, StoryObj } from "@storybook/react-vite"
import type { ComponentProps } from "react"
import { Button } from "@/components/Button"
import { Input } from "@/components/Input"

type FormProps = ComponentProps<"form"> & {
	size?: "sm" | "md" | "lg"
}

const FormComposition = ({ size, ...props }: FormProps) => {
	return <form {...props} />
}

const meta = {
	title: "Compositions/Form",
	component: FormComposition,
	parameters: {
		layout: "padded",
	},
	argTypes: {
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
	},
	args: {
		size: "md",
	},
} satisfies Meta<FormProps>

export default meta

type Story = StoryObj<typeof meta>

export const SimpleForm: Story = {
	render: ({ size }) => (
		<FormComposition className="flex items-center gap-2">
			<Input size={size} className="w-60" placeholder="Enter" />
			<Button size={size}>Submit</Button>
		</FormComposition>
	),
}