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
} from "@allem-sdk/hooks";

// AI
export * from "@allem-sdk/ai";

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
