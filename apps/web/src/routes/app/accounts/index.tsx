import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/app/accounts/")({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Accounts</div>
}