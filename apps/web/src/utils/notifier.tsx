"use client";

import React from "react";
import { toast } from "sonner";

import { ButtonProps } from "@/lib/components/button";
import { Message, MessageProps } from "@/lib/components/message";
import { ArrayUtils } from "@/lib/utils/array-utils";
import { cn } from "@/lib/utils/functions";

type NotiControl = {
  dismiss: () => void;
};

type ActionProps = Omit<ButtonProps, "onClick"> & {
  onClick: (args: { event: React.MouseEvent<HTMLButtonElement>; control: NotiControl }) => void;
};

type MessageConfig =
  | string
  | (Omit<MessageProps, "preset" | "actions"> & { actions?: ActionProps | ActionProps[] });

function createAction(config: ActionProps, toastId: string | number) {
  return {
    ...config,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      config.onClick({
        event: e,
        control: {
          dismiss: () => toast.dismiss(toastId),
        },
      });
    },
  };
}

type Options =
  | MessageProps["preset"]
  | {
      preset?: MessageProps["preset"];
      duration?: number;
    };

function notify(config: MessageConfig, options: Options = {}) {
  const { preset, ...sonnerOptions } = typeof options === "string" ? { preset: options } : options;
  const _config = typeof config === "string" ? { message: config } : config;

  return toast.custom((id) => {
    const actions = _config.actions
      ? ArrayUtils.convertOneOrAll(_config.actions, (action) => createAction(action, id))
      : undefined;

    return (
      <Message
        {..._config}
        preset={preset}
        actions={actions}
        className={cn("min-w-60 md:max-w-[364px]", _config.className)}
      />
    );
  }, sonnerOptions);
}

export const notifier = {
  notify,
  dismiss: toast.dismiss,
};
