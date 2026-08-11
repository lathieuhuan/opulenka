import { Button } from "@opulenka/ui"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="space-y-4">
			<h1>Landing Page</h1>

			<div>
				<Link to="/pricing" className="text-blue-400 hover:underline">
					Pricing
				</Link>
			</div>

			<div>
				<Link to="/app">
					<Button>Login</Button>
				</Link>
			</div>
		</div>
	)
}