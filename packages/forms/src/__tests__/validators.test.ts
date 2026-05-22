import { describe, it, expect } from "vitest";
import { required, minLength, maxLength, pattern, email, url, custom } from "../validators";

describe("validators", () => {
  it("required creates correct rule", () => {
    const rule = required("Required!");
    expect(rule).toEqual({ type: "required", message: "Required!" });
  });

  it("minLength creates correct rule", () => {
    const rule = minLength(3);
    expect(rule).toEqual({ type: "minLength", value: 3, message: undefined });
  });

  it("maxLength creates correct rule", () => {
    const rule = maxLength(10, "Too long");
    expect(rule).toEqual({ type: "maxLength", value: 10, message: "Too long" });
  });

  it("pattern creates correct rule", () => {
    const re = /^[a-z]+$/;
    const rule = pattern(re);
    expect(rule).toEqual({ type: "pattern", value: re, message: undefined });
  });

  it("email creates pattern rule", () => {
    const rule = email();
    expect(rule.type).toBe("pattern");
    expect(rule.message).toBe("Invalid email address");
  });

  it("url creates pattern rule", () => {
    const rule = url();
    expect(rule.type).toBe("pattern");
    expect(rule.message).toBe("Invalid URL");
  });

  it("custom creates correct rule", () => {
    const validate = (v: string) => (v === "bad" ? "no!" : undefined);
    const rule = custom(validate);
    expect(rule.type).toBe("custom");
    expect((rule as { validate: typeof validate }).validate("bad")).toBe("no!");
    expect((rule as { validate: typeof validate }).validate("good")).toBeUndefined();
  });
});
