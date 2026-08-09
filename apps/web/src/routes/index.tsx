import { Button } from "@opulenka/ui"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
	component: RouteComponent,
})

function RouteComponent() {
	const handleClick = () => {
		document.body.classList.toggle("dark")
	}

	return (
		<div>
			<div className="text-chart-4">Hello World</div>
			<Button onClick={handleClick}>Click me</Button>
		</div>
	)
}