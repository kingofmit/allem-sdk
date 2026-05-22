import { useState, useCallback, useRef } from "react";

export type ValidationRule<T = string> =
  | { type: "required"; message?: string }
  | { type: "minLength"; value: number; message?: string }
  | { type: "maxLength"; value: number; message?: string }
  | { type: "pattern"; value: RegExp; message?: string }
  | { type: "min"; value: number; message?: string }
  | { type: "max"; value: number; message?: string }
  | { type: "custom"; validate: (value: T) => string | undefined };

export interface FieldConfig<T = string> {
  initialValue: T;
  rules?: ValidationRule<T>[];
}

export type FormConfig<T extends Record<string, unknown>> = {
  [K in keyof T]: FieldConfig<T[K]>;
};

export type FormErrors<T> = Partial<Record<keyof T, string>>;
export type FormTouched<T> = Partial<Record<keyof T, boolean>>;

export interface UseFormReturn<T extends Record<string, unknown>> {
  values: T;
  errors: FormErrors<T>;
  touched: FormTouched<T>;
  isValid: boolean;
  isSubmitting: boolean;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setTouched: (field: keyof T) => void;
  validate: () => boolean;
  validateField: (field: keyof T) => string | undefined;
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (e?: React.FormEvent) => void;
  reset: () => void;
  getFieldProps: (field: keyof T) => {
    value: T[keyof T];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onBlur: () => void;
    name: string;
  };
}

function runValidation<T>(value: T, rules: ValidationRule<T>[] = []): string | undefined {
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

export function useForm<T extends Record<string, unknown>>(
  config: FormConfig<T>,
): UseFormReturn<T> {
  const configRef = useRef(config);

  const getInitialValues = useCallback((): T => {
    const values = {} as Record<string, unknown>;
    for (const key in configRef.current) {
      values[key] = configRef.current[key].initialValue;
    }
    return values as T;
  }, []);

  const [values, setValues] = useState<T>(getInitialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [touched, setTouchedState] = useState<FormTouched<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const valuesRef = useRef(values);
  valuesRef.current = values;

  const validateField = useCallback(
    (field: keyof T): string | undefined => {
      const fieldConfig = configRef.current[field];
      if (!fieldConfig) return undefined;
      return runValidation(valuesRef.current[field], fieldConfig.rules as ValidationRule<T[keyof T]>[]);
    },
    [],
  );

  const validate = useCallback((): boolean => {
    const currentValues = valuesRef.current;
    const newErrors: FormErrors<T> = {};
    let valid = true;
    for (const key in configRef.current) {
      const error = runValidation(
        currentValues[key],
        configRef.current[key].rules as ValidationRule<T[typeof key]>[],
      );
      if (error) {
        newErrors[key] = error;
        valid = false;
      }
    }
    setErrors(newErrors);
    return valid;
  }, []);

  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setTouched = useCallback((field: keyof T) => {
    setTouchedState((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void | Promise<void>) => {
      return async (e?: React.FormEvent) => {
        e?.preventDefault?.();
        // Touch all fields
        const allTouched: FormTouched<T> = {};
        for (const key in configRef.current) {
          (allTouched as Record<string, boolean>)[key] = true;
        }
        setTouchedState(allTouched);

        if (!validate()) return;

        setIsSubmitting(true);
        try {
          await onSubmit(valuesRef.current);
        } finally {
          setIsSubmitting(false);
        }
      };
    },
    [validate],
  );

  const reset = useCallback(() => {
    setValues(getInitialValues());
    setErrors({});
    setTouchedState({});
  }, [getInitialValues]);

  const getFieldProps = useCallback(
    (field: keyof T) => ({
      value: values[field],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValue(field, e.target.value as T[keyof T]);
      },
      onBlur: () => {
        setTouched(field);
        const error = validateField(field);
        setErrors((prev) => {
          if (error) return { ...prev, [field]: error };
          const next = { ...prev };
          delete next[field];
          return next;
        });
      },
      name: String(field),
    }),
    [values, setValue, setTouched, validateField],
  );

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setValue,
    setTouched,
    validate,
    validateField,
    handleSubmit,
    reset,
    getFieldProps,
  };
}
