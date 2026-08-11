import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

export type CollapsibleProps = CollapsiblePrimitive.Root.Props

export function Collapsible(props: CollapsibleProps) {
	return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

export type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props

export function CollapsibleTrigger(props: CollapsibleTriggerProps) {
	return (
		<CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />
	)
}

export type CollapsibleContentProps = CollapsiblePrimitive.Panel.Props

export function CollapsibleContent(props: CollapsibleContentProps) {
	return (
		<CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
	)
}