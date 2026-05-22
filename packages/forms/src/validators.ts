import type { ValidationRule } from "./useForm";

export const required = (message?: string): ValidationRule => ({
  type: "required",
  message,
});

export const minLength = (value: number, message?: string): ValidationRule => ({
  type: "minLength",
  value,
  message,
});

export const maxLength = (value: number, message?: string): ValidationRule => ({
  type: "maxLength",
  value,
  message,
});

export const pattern = (value: RegExp, message?: string): ValidationRule => ({
  type: "pattern",
  value,
  message,
});

export const min = (value: number, message?: string): ValidationRule<number> => ({
  type: "min",
  value,
  message,
});

export const max = (value: number, message?: string): ValidationRule<number> => ({
  type: "max",
  value,
  message,
});

export const email = (message?: string): ValidationRule => ({
  type: "pattern",
  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: message ?? "Invalid email address",
});

export const url = (message?: string): ValidationRule => ({
  type: "pattern",
  value: /^https?:\/\/.+/,
  message: message ?? "Invalid URL",
});

export const custom = <T = string>(
  validate: (value: T) => string | undefined,
): ValidationRule<T> => ({
  type: "custom",
  validate,
});
