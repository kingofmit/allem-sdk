import { createContext, useContext, useCallback, useReducer, type ReactNode } from "react";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  createdAt: number;
}

export interface NotifyOptions {
  type?: NotificationType;
  title: string;
  message?: string;
  /** Auto-dismiss duration in ms. Set to 0 to persist. Default: 5000. */
  duration?: number;
}

interface NotificationContextValue {
  notifications: Notification[];
  notify: (options: NotifyOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

type Action =
  | { type: "ADD"; notification: Notification }
  | { type: "DISMISS"; id: string }
  | { type: "DISMISS_ALL" };

function reducer(state: Notification[], action: Action): Notification[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.notification];
    case "DISMISS":
      return state.filter((n) => n.id !== action.id);
    case "DISMISS_ALL":
      return [];
  }
}

let counter = 0;
function generateId(): string {
  return `notif-${++counter}-${Date.now()}`;
}

const NotificationContext = createContext<NotificationContextValue>({
  notifications: [],
  notify: () => "",
  dismiss: () => {},
  dismissAll: () => {},
});

export interface NotificationProviderProps {
  /** Maximum number of notifications to display at once. Default: 5. */
  maxCount?: number;
  children: ReactNode;
}

export function NotificationProvider({
  maxCount = 5,
  children,
}: NotificationProviderProps) {
  const [notifications, dispatch] = useReducer(reducer, []);

  const dismiss = useCallback((id: string) => {
    dispatch({ type: "DISMISS", id });
  }, []);

  const dismissAll = useCallback(() => {
    dispatch({ type: "DISMISS_ALL" });
  }, []);

  const notify = useCallback(
    (options: NotifyOptions): string => {
      const id = generateId();
      const notification: Notification = {
        id,
        type: options.type ?? "info",
        title: options.title,
        message: options.message,
        duration: options.duration ?? 5000,
        createdAt: Date.now(),
      };

      dispatch({ type: "ADD", notification });

      // Auto-dismiss if duration > 0
      if (notification.duration && notification.duration > 0) {
        setTimeout(() => dismiss(id), notification.duration);
      }

      // Evict oldest if over maxCount
      if (notifications.length >= maxCount) {
        const oldest = notifications[0];
        if (oldest) dispatch({ type: "DISMISS", id: oldest.id });
      }

      return id;
    },
    [dismiss, maxCount, notifications],
  );

  return (
    <NotificationContext.Provider
      value={{ notifications, notify, dismiss, dismissAll }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications(): Notification[] {
  return useContext(NotificationContext).notifications;
}

export function useNotify() {
  const ctx = useContext(NotificationContext);
  return {
    notify: ctx.notify,
    dismiss: ctx.dismiss,
    dismissAll: ctx.dismissAll,
  };
}
