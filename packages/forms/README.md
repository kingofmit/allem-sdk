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

## Exports

- `useForm` — Full form management hook (values, errors, touched, submit, reset)
- `useField` — Standalone single-field hook with validation
- Validators: `required`, `minLength`, `maxLength`, `pattern`, `min`, `max`, `email`, `url`, `custom`

## License

[MIT](../../LICENSE)
