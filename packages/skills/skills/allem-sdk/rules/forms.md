# Forms

```tsx
import { useForm, useField, required, minLength, maxLength, pattern, min, max, email, url, custom } from "@allem-sdk/forms";
```

## useForm

Full form management hook with validation, error tracking, and submit handling.

```tsx
const form = useForm<{ name: string; email: string }>({
  name: { initialValue: "", rules: [required("Name is required")] },
  email: { initialValue: "", rules: [required(), email()] },
});
```

### Config

Each field takes:

| Property | Type | Description |
|----------|------|-------------|
| `initialValue` | `T` | Initial value for the field |
| `rules` | `ValidationRule[]` | Array of validation rules |

### Return value

| Property | Type | Description |
|----------|------|-------------|
| `values` | `T` | Current form values |
| `errors` | `Partial<Record<keyof T, string>>` | Validation errors per field |
| `touched` | `Partial<Record<keyof T, boolean>>` | Which fields have been blurred |
| `isValid` | `boolean` | `true` when no errors |
| `isSubmitting` | `boolean` | `true` during async submit |
| `setValue(field, value)` | `function` | Set a field value |
| `setTouched(field)` | `function` | Mark a field as touched |
| `validate()` | `function` | Validate all fields, returns `boolean` |
| `validateField(field)` | `function` | Validate one field, returns error or `undefined` |
| `handleSubmit(onSubmit)` | `function` | Returns form submit handler |
| `reset()` | `function` | Reset to initial values |
| `getFieldProps(field)` | `function` | Returns `{ value, onChange, onBlur, name }` for spread |

### Full example

```tsx
const form = useForm({
  name: { initialValue: "", rules: [required()] },
  email: { initialValue: "", rules: [required(), email()] },
  age: { initialValue: 0, rules: [min(18, "Must be 18+"), max(120)] },
  message: { initialValue: "", rules: [required(), minLength(10)] },
});

const onSubmit = async (values) => {
  await fetch("/api/contact", { method: "POST", body: JSON.stringify(values) });
};

<form onSubmit={form.handleSubmit(onSubmit)}>
  <input {...form.getFieldProps("name")} />
  {form.touched.name && form.errors.name && <span>{form.errors.name}</span>}

  <input {...form.getFieldProps("email")} />
  {form.touched.email && form.errors.email && <span>{form.errors.email}</span>}

  <input type="number" {...form.getFieldProps("age")} />
  <textarea {...form.getFieldProps("message")} />

  <button type="submit" disabled={form.isSubmitting}>Send</button>
  <button type="button" onClick={form.reset}>Reset</button>
</form>
```

## useField

Standalone single-field hook with validation. Useful when you need validation on a single input without a full form.

## Validators

| Validator | Signature | Description |
|-----------|-----------|-------------|
| `required` | `required(msg?)` | Field must not be empty |
| `minLength` | `minLength(n, msg?)` | Minimum string length |
| `maxLength` | `maxLength(n, msg?)` | Maximum string length |
| `min` | `min(n, msg?)` | Minimum numeric value |
| `max` | `max(n, msg?)` | Maximum numeric value |
| `pattern` | `pattern(regex, msg?)` | Must match regex |
| `email` | `email(msg?)` | Valid email format |
| `url` | `url(msg?)` | Valid URL (must start with http/https) |
| `custom` | `custom(fn)` | Custom function `(value) => errorMsg \| undefined` |

All validators accept an optional custom error message. Default messages are provided.

```tsx
// Custom validator example
const passwordStrength = custom<string>((value) => {
  if (value.length < 8) return "Must be at least 8 characters";
  if (!/[A-Z]/.test(value)) return "Must contain an uppercase letter";
  if (!/[0-9]/.test(value)) return "Must contain a number";
  return undefined;
});

const form = useForm({
  password: { initialValue: "", rules: [required(), passwordStrength] },
});
```

## Best practices

- Use `getFieldProps` for quick integration — it returns `value`, `onChange`, `onBlur`, and `name`
- Validation runs on blur by default via `getFieldProps` — errors appear after the user leaves a field
- `handleSubmit` touches all fields before validating, so errors show on submit even if fields weren't blurred
- `isSubmitting` is set automatically during async `onSubmit` — use it to disable the submit button
- Compose validators: `rules: [required(), minLength(3), maxLength(50)]`
