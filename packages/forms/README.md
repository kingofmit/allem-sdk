<p align="center">
  <img src="https://raw.githubusercontent.com/kingofmit/allem-sdk/main/.github/AllemSDK.png" alt="Allem SDK" />
</p>

<p align="center">
  <a href="https://github.com/kingofmit/allem-sdk/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
  <img src="https://img.shields.io/badge/react-19-61dafb" alt="React 19" />
  <img src="https://img.shields.io/badge/typescript-strict-blue" alt="TypeScript" />
</p>

# @allem-sdk/forms

Lightweight form management and validation for React. No heavy dependencies, just hooks.

## Installation

```bash
npm install @allem-sdk/forms
```

## Usage

```tsx
import { useForm, required, email, minLength } from "@allem-sdk/forms";

function ContactForm() {
  const form = useForm({
    name: { initialValue: "", rules: [required("Name is required")] },
    email: { initialValue: "", rules: [required(), email()] },
    message: { initialValue: "", rules: [required(), minLength(10)] },
  });

  const onSubmit = async (values: typeof form.values) => {
    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(values),
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.getFieldProps("name")} />
      {form.touched.name && form.errors.name && <span>{form.errors.name}</span>}

      <input {...form.getFieldProps("email")} />
      <textarea {...form.getFieldProps("message")} />
      <button type="submit">Send</button>
    </form>
  );
}
```

## Validators

| Validator | Description |
|-----------|-------------|
| `required(msg?)` | Field must not be empty |
| `minLength(n, msg?)` | Minimum string length |
| `maxLength(n, msg?)` | Maximum string length |
| `min(n, msg?)` | Minimum numeric value |
| `max(n, msg?)` | Maximum numeric value |
| `pattern(regex, msg?)` | Match a regular expression |
| `email(msg?)` | Valid email format |
| `url(msg?)` | Valid URL format |
| `custom(fn, msg?)` | Custom validation function |

## Exports

| Export | Type | Description |
|--------|------|-------------|
| `useForm` | Hook | Full form management — values, errors, touched, submit, reset |
| `useField` | Hook | Standalone single-field hook with validation |
| Validators | Functions | 9 built-in validators (see table above) |

## Part of [Allem SDK](https://github.com/kingofmit/allem-sdk)

This package can be used standalone or as part of the full SDK. Install `allem-sdk` to get all packages in one install.

## Support

If you find Allem SDK useful, consider supporting its development:

<a href="https://buymeacoffee.com/kingofmit" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" /></a>

## License

[MIT](https://github.com/kingofmit/allem-sdk/blob/main/LICENSE) - [Ahmed Allem](https://kingallem.com)
