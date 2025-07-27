import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input, type InputProps } from "@/lib/components/input";

export function PasswordInput(props: Omit<InputProps, "type" | "action">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      type={showPassword ? "text" : "password"}
      action={{
        tabIndex: -1,
        children: showPassword ? <EyeOff size={20} /> : <Eye size={20} />,
        onClick: () => setShowPassword(!showPassword),
      }}
      {...props}
    />
  );
}
