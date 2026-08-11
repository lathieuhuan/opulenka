import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/app/")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="space-y-4">
			<h1>Overview</h1>

			<div>
				<Link to="/app/accounts" className="text-blue-500 hover:underline">
					Accounts
				</Link>{" "}
				|{" "}
				<Link to="/app/transactions" className="text-blue-500 hover:underline">
					Transactions
				</Link>
			</div>
		</div>
	)
}