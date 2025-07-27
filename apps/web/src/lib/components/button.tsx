import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/functions";

// modified

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "shadow-xs",
        outline: "border shadow-xs",
        ghost: "hover:bg-accent/50",
        // default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        // destructive:
        //   "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        // outline:
        //   "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        // secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        // ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      },
      color: {
        default: "",
        primary: "",
        secondary: "",
        destructive: "",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 rounded-md gap-1.5 px-2 has-[>svg]:px-2 text-xs rounded-sm",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        color: "primary",
        className: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      {
        variant: "default",
        color: "secondary",
        className: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      {
        variant: "default",
        color: "default", // default uses secondary color temporarily
        className: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      {
        variant: "default",
        color: "destructive",
        className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      {
        variant: ["outline", "ghost"],
        color: "primary",
        className:
          "text-primary hover:text-primary/90",
      },
      {
        variant: ["outline", "ghost"],
        color: "secondary",
        className:
          "text-secondary hover:text-secondary/90",
      },
      {
        variant: ["outline", "ghost"],
        color: "default", // default uses secondary color temporarily
        className:
          "text-secondary hover:text-secondary/90",
      },
      {
        variant: ["outline", "ghost"],
        color: "destructive",
        className:
          "text-destructive hover:text-destructive/90",
      },
      {
        variant: "outline",
        color: "primary",
        className:
          "border-primary hover:border-primary/90 hover:bg-primary/5",
      },
      {
        variant: "outline",
        color: "secondary",
        className:
          "border-secondary hover:border-secondary/90 hover:bg-secondary/5",
      },
      {
        variant: "outline",
        color: "default", // default uses secondary color temporarily
        className:
          "border-secondary hover:border-secondary/90 hover:bg-secondary/5",
      },
      {
        variant: "outline",
        color: "destructive",
        className:
          "border-destructive hover:border-destructive/90 hover:bg-destructive/5",
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, color, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, color, size, className }))}
      type="button"
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
