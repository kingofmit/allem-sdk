import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useForm } from "../useForm";

describe("useForm", () => {
  const config = {
    name: {
      initialValue: "",
      rules: [
        { type: "required" as const, message: "Name is required" },
        { type: "minLength" as const, value: 2, message: "Too short" },
      ],
    },
    email: {
      initialValue: "",
      rules: [
        { type: "required" as const },
        { type: "pattern" as const, value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
      ],
    },
  };

  it("initializes with correct values", () => {
    const { result } = renderHook(() => useForm(config));
    expect(result.current.values).toEqual({ name: "", email: "" });
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it("sets field values", () => {
    const { result } = renderHook(() => useForm(config));
    act(() => result.current.setValue("name", "Ahmed"));
    expect(result.current.values.name).toBe("Ahmed");
  });

  it("validates required fields", () => {
    const { result } = renderHook(() => useForm(config));
    let valid: boolean;
    act(() => {
      valid = result.current.validate();
    });
    expect(valid!).toBe(false);
    expect(result.current.errors.name).toBe("Name is required");
    expect(result.current.errors.email).toBe("This field is required");
  });

  it("validates minLength", () => {
    const { result } = renderHook(() => useForm(config));
    act(() => result.current.setValue("name", "A"));
    act(() => {
      result.current.validate();
    });
    expect(result.current.errors.name).toBe("Too short");
  });

  it("validates pattern", () => {
    const { result } = renderHook(() => useForm(config));
    act(() => {
      result.current.setValue("name", "Ahmed");
      result.current.setValue("email", "not-email");
    });
    act(() => result.current.validate());
    expect(result.current.errors.email).toBe("Invalid email");
  });

  it("passes validation with valid data", () => {
    const { result } = renderHook(() => useForm(config));
    act(() => {
      result.current.setValue("name", "Ahmed");
      result.current.setValue("email", "ahmed@test.com");
    });
    let valid: boolean;
    act(() => {
      valid = result.current.validate();
    });
    expect(valid!).toBe(true);
    expect(result.current.errors).toEqual({});
  });

  it("handles submit with valid data", async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useForm(config));
    act(() => {
      result.current.setValue("name", "Ahmed");
      result.current.setValue("email", "ahmed@test.com");
    });
    await act(async () => {
      await result.current.handleSubmit(onSubmit)();
    });
    expect(onSubmit).toHaveBeenCalledWith({ name: "Ahmed", email: "ahmed@test.com" });
  });

  it("does not submit with invalid data", async () => {
    const onSubmit = vi.fn();
    const { result } = renderHook(() => useForm(config));
    await act(async () => {
      await result.current.handleSubmit(onSubmit)();
    });
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("resets the form", () => {
    const { result } = renderHook(() => useForm(config));
    act(() => {
      result.current.setValue("name", "Ahmed");
      result.current.setTouched("name");
    });
    act(() => result.current.reset());
    expect(result.current.values).toEqual({ name: "", email: "" });
    expect(result.current.touched).toEqual({});
  });
});
