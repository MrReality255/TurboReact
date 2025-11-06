import { useLayer } from "./useLayer";
import { TNotification } from "../atoms/Notification";
import React from "react";
import { TNotificationProps } from "../atoms/types";

export function useNotifications() {
  const l = useLayer();
  return {
    show: function (msg: string | React.ReactNode, p?: TNotificationProps) {
      l.showRow(() => <TNotification {...p}>{msg}</TNotification>);
    },
  };
}
