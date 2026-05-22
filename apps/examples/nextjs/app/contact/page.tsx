"use client";

import { useState } from "react";
import { useForm, required, email, minLength } from "@allem-sdk/forms";
import { useTrack } from "@allem-sdk/analytics";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const track = useTrack();

  const form = useForm({
    name: {
      initialValue: "",
      rules: [required("Name is required")],
    },
    email: {
      initialValue: "",
      rules: [required("Email is required"), email("Invalid email address")],
    },
    message: {
      initialValue: "",
      rules: [
        required("Message is required"),
        minLength(10, "At least 10 characters"),
      ],
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    await new Promise((r) => setTimeout(r, 1000));
    track("Contact Form Submitted", { name: values.name });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <div className="page-header">
          <h1>Contact Form</h1>
        </div>
        <div className="card success-card">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "0.75rem" }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <h2>Message sent!</h2>
          <p style={{ marginTop: "0.5rem" }}>
            Thanks for reaching out. This is a demo — no message was actually sent.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              form.reset();
            }}
            style={{ marginTop: "1.5rem" }}
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Contact Form</h1>
        <p>
          Built with <code>useForm</code> and validators from{" "}
          <code>@allem-sdk/forms</code>.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="card">
        <div className="field">
          <label className="label">Name</label>
          <input {...form.getFieldProps("name")} placeholder="Your name" />
          {form.touched.name && form.errors.name && (
            <p className="error">{form.errors.name}</p>
          )}
        </div>

        <div className="field">
          <label className="label">Email</label>
          <input
            type="email"
            {...form.getFieldProps("email")}
            placeholder="you@example.com"
          />
          {form.touched.email && form.errors.email && (
            <p className="error">{form.errors.email}</p>
          )}
        </div>

        <div className="field">
          <label className="label">Message</label>
          <textarea
            {...form.getFieldProps("message")}
            rows={4}
            placeholder="Your message (at least 10 characters)"
          />
          {form.touched.message && form.errors.message && (
            <p className="error">{form.errors.message}</p>
          )}
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit" disabled={form.isSubmitting}>
            {form.isSubmitting ? "Sending..." : "Send Message"}
          </button>
          <button
            type="button"
            onClick={form.reset}
            className="btn-secondary"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
