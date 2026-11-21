// Hooks
export {
  useDebounce,
  useLocalStorage,
  useMediaQuery,
  useClickOutside,
  useToggle,
  useCopyToClipboard,
  useIntersectionObserver,
  useWindowSize,
  useFetch,
  useThrottle,
  usePrevious,
  useKeyPress,
  useOnlineStatus,
} from "@allem-sdk/hooks";

// AI
export * from "@allem-sdk/ai";

// Agents
export {
  useAllemAgent,
  AgentProvider,
  useAgentTools,
  createAllemAgentHandler,
  createAllemTool,
  createAllemGuardrail,
  createMemoryAdapter,
  thinkThenAct,
  planExecuteVerify,
  restrictAfter,
  stepCountIs,
  isLoopFinished,
  hasToolCall,
} from "@allem-sdk/agents";
export type {
  UseAllemAgentOptions,
  UseAllemAgentReturn,
  AgentProviderProps,
  AgentStatus,
  AgentStep,
  AgentToolCall,
  AgentToolRegistration,
  AllemAgentHandlerConfig,
  AllemToolConfig,
  AllemGuardrailConfig,
  AgentMemoryAdapter,
} from "@allem-sdk/agents";

// Forms
export {
  useForm,
  useField,
  required,
  minLength,
  maxLength,
  pattern,
  min,
  max,
  email,
  url,
  custom,
} from "@allem-sdk/forms";
export type {
  FormConfig,
  FormErrors,
  FormTouched,
  UseFormReturn,
  ValidationRule,
  FieldConfig,
  UseFieldOptions,
  UseFieldReturn,
} from "@allem-sdk/forms";

// Analytics
export {
  AnalyticsProvider,
  useTrack,
  usePageView,
  useIdentify,
  mixpanelAdapter,
  posthogAdapter,
  segmentAdapter,
  consoleAdapter,
} from "@allem-sdk/analytics";
export type {
  AnalyticsAdapter,
  AnalyticsProviderProps,
} from "@allem-sdk/analytics";

// Auth
export {
  AuthProvider,
  useAuth,
  useSession,
  ProtectedRoute,
  supabaseAdapter,
  nextAuthAdapter,
  clerkAdapter,
} from "@allem-sdk/auth";
export type {
  AuthAdapter,
  AuthUser,
  AuthSession,
  AuthStatus,
  AuthProviderProps,
  UseAuthReturn,
  UseSessionReturn,
  ProtectedRouteProps,
} from "@allem-sdk/auth";

// Storage
export {
  StorageProvider,
  useStorageAdapter,
  useStorageItem,
  localStorageAdapter,
  sessionStorageAdapter,
  cookieAdapter,
  memoryAdapter,
} from "@allem-sdk/storage";
export type {
  StorageAdapter,
  StorageProviderProps,
} from "@allem-sdk/storage";

// Notifications
export {
  NotificationProvider,
  useNotifications,
  useNotify,
} from "@allem-sdk/notifications";
export type {
  Notification,
  NotificationType,
  NotifyOptions,
  NotificationProviderProps,
} from "@allem-sdk/notifications";

// Realtime
export {
  RealtimeProvider,
  useRealtimeAdapter,
  useChannel,
  usePresence,
  useConnectionStatus,
} from "@allem-sdk/realtime";
export type {
  RealtimeAdapter,
  RealtimeProviderProps,
  ConnectionStatus,
  PresenceMember,
} from "@allem-sdk/realtime";
