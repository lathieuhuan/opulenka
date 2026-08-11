import type { Meta, StoryObj } from "@storybook/react-vite"

import type { Sidebar } from "./Sidebar"

const meta = {
	title: "Sidebar",
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {},
	// render: (args) => (
	// 	<Sidebar collapsible="icon" {...args}>
	// 		<SidebarHeader>
	// 			<TeamSwitcher teams={data.teams} />
	// 		</SidebarHeader>
	// 		<SidebarContent>
	// 			<NavMain items={data.navMain} />
	// 			<NavProjects projects={data.projects} />
	// 		</SidebarContent>
	// 		<SidebarFooter>
	// 			<NavUser user={data.user} />
	// 		</SidebarFooter>
	// 		<SidebarRail />
	// 	</Sidebar>
	// ),
}