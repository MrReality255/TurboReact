import { useLayer } from "./useLayer";
import { Notification } from "../atoms/Notification";
import React from "react";
import { TNotificationProps } from "../atoms/types";

export function useNotifications() {
  const l = useLayer();
  return {
    show: function (msg: string | React.ReactNode, p?: TNotificationProps) {
      l.showRow(() => <Notification {...p}>{msg}</Notification>);
    },
  };
}
