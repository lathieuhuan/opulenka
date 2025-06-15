import { ArrayUtils } from "@/lib/utils/array-utils";
import { cn } from "@/lib/utils/functions";
import { Button, ButtonProps } from "./button";

// self-made

type Action = Omit<ButtonProps, "size">;

type MessageProps = {
  preset?: "info" | "success" | "warning" | "error";
  icon?: React.JSX.Element;
  /** Default to "medium" */
  size?: "small" | "medium";
  message: string;
  description?: string;
  actions?: Action | Action[];
};

function Message(props: MessageProps) {
  const { size = "medium" } = props;
  let icon = props.icon;
  let colorCls = "text-gray-900 bg-white border-transparent";
  const descriptionCls = props.preset ? "text-gray-600" : "text-gray-500";

  switch (props.preset) {
    case "info":
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          height="20"
          width="20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
          />
        </svg>
      );
      colorCls = "text-blue-700 bg-blue-100 border-blue-200";
      break;
    case "success":
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          height="20"
          width="20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
          />
        </svg>
      );
      colorCls = "text-green-700 bg-green-100 border-green-200";
      break;
    case "warning":
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          height="20"
          width="20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          />
        </svg>
      );
      colorCls = "text-amber-700 bg-amber-100 border-amber-200";
      break;
    case "error":
      icon = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          height="20"
          width="20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
          />
        </svg>
      );
      colorCls = "text-red-700 bg-red-100 border-red-200";
      break;
  }

  return (
    <div
      className={cn(
        "w-full min-w-60 md:max-w-[364px] flex items-start shadow-lg ring-1 ring-black/10 border",
        size === "small" ? "px-4 py-2 rounded-md" : "p-4 rounded-lg",
        colorCls,
      )}
    >
      {icon && (
        <div className="-ml-1 mr-2 h-6 flex items-center justify-center shrink-0">{icon}</div>
      )}
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm leading-6 font-medium">{props.message}</p>
          {props.description && (
            <p className={cn("mt-1 text-sm", descriptionCls)}>{props.description}</p>
          )}
        </div>
      </div>
      {props.actions && (
        <div className="ml-4 shrink-0 flex flex-col gap-2">
          {ArrayUtils.toArray(props.actions).map((action, index) => (
            <Button key={index} size="xs" {...action} />
          ))}
        </div>
      )}
    </div>
  );
}

export { Message, type MessageProps };

