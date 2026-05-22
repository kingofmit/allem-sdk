import { useState, useCallback } from "react";
import type { ValidationRule } from "./useForm";

export interface UseFieldOptions<T = string> {
  initialValue: T;
  rules?: ValidationRule<T>[];
}

export interface UseFieldReturn<T = string> {
  value: T;
  error: string | undefined;
  touched: boolean;
  setValue: (value: T) => void;
  setTouched: () => void;
  validate: () => string | undefined;
  reset: () => void;
  props: {
    value: T;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: () => void;
  };
}

function runFieldValidation<T>(value: T, rules: ValidationRule<T>[] = []): string | undefined {
  for (const rule of rules) {
    switch (rule.type) {
      case "required": {
        const empty = value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
        if (empty) return rule.message ?? "This field is required";
        break;
      }
      case "minLength": {
        if (typeof value === "string" && value.length < rule.value)
          return rule.message ?? `Must be at least ${rule.value} characters`;
        break;
      }
      case "maxLength": {
        if (typeof value === "string" && value.length > rule.value)
          return rule.message ?? `Must be at most ${rule.value} characters`;
        break;
      }
      case "pattern": {
        if (typeof value === "string" && !rule.value.test(value))
          return rule.message ?? "Invalid format";
        break;
      }
      case "min": {
        if (typeof value === "number" && value < rule.value)
          return rule.message ?? `Must be at least ${rule.value}`;
        break;
      }
      case "max": {
        if (typeof value === "number" && value > rule.value)
          return rule.message ?? `Must be at most ${rule.value}`;
        break;
      }
      case "custom": {
        const error = rule.validate(value);
        if (error) return error;
        break;
      }
    }
  }
  return undefined;
}

export function useField<T = string>(options: UseFieldOptions<T>): UseFieldReturn<T> {
  const { initialValue, rules } = options;

  const [value, setValueState] = useState<T>(initialValue);
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouchedState] = useState(false);

  const validate = useCallback((): string | undefined => {
    const err = runFieldValidation(value, rules);
    setError(err);
    return err;
  }, [value, rules]);

  const setValue = useCallback((v: T) => {
    setValueState(v);
  }, []);

  const setTouched = useCallback(() => {
    setTouchedState(true);
  }, []);

  const reset = useCallback(() => {
    setValueState(initialValue);
    setError(undefined);
    setTouchedState(false);
  }, [initialValue]);

  const props = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValue(e.target.value as T);
    },
    onBlur: () => {
      setTouched();
      validate();
    },
  };

  return { value, error, touched, setValue, setTouched, validate, reset, props };
}
