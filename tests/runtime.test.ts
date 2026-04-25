import { describe, it, expect } from "bun:test";
import classigo from "../src/index.ts";

describe("strings", () => {
  it("combines basic classes", () => {
    expect(classigo("btn", "btn--primary", "btn--lg")).toBe("btn btn--primary btn--lg");
  });

  it("handles a single class", () => {
    expect(classigo("btn")).toBe("btn");
  });

  it("handles no arguments", () => {
    expect(classigo()).toBe("");
  });

  it("filters empty strings", () => {
    expect(classigo("btn", "", "btn--lg")).toBe("btn btn--lg");
  });

  it("filters falsy values", () => {
    expect(classigo("btn", false, null, undefined, "btn--primary")).toBe("btn btn--primary");
  });

  it("returns empty string for all falsy", () => {
    expect(classigo(false, null, undefined, "")).toBe("");
  });

  it("handles conditional with &&", () => {
    expect(classigo("btn", true && "btn--active", false && "btn--disabled")).toBe(
      "btn btn--active",
    );
  });

  it("handles template literals", () => {
    const variant = "primary";
    expect(classigo("btn", `btn--${variant}`)).toBe("btn btn--primary");
  });
});

describe("objects", () => {
  it("includes keys with truthy values", () => {
    expect(classigo({ "btn--active": true, "btn--disabled": false })).toBe("btn--active");
  });

  it("excludes keys with falsy values", () => {
    expect(classigo({ a: false, b: null, c: undefined, d: true })).toBe("d");
  });

  it("returns empty string for all falsy object values", () => {
    expect(classigo({ a: false, b: null })).toBe("");
  });

  it("handles empty object", () => {
    expect(classigo({})).toBe("");
  });
});

describe("mixed", () => {
  it("combines strings and objects", () => {
    expect(classigo("btn", { "btn--active": true, "btn--disabled": false })).toBe(
      "btn btn--active",
    );
  });

  it("handles falsy between strings and objects", () => {
    expect(classigo("btn", null, { "btn--active": true }, false, "btn--lg")).toBe(
      "btn btn--active btn--lg",
    );
  });

  it("CSS Modules pattern — resolved hashes as strings", () => {
    const styles = { button: "button_abc123", primary: "primary_def456" };
    expect(classigo(styles.button, styles.primary)).toBe("button_abc123 primary_def456");
  });

  it("CSS Modules pattern — object shorthand", () => {
    const styles = { button: "btn_x1", active: "active_y2", disabled: "disabled_z3" };
    const isActive = true;
    expect(
      classigo(styles.button, { [styles.active]: isActive, [styles.disabled]: !isActive }),
    ).toBe("btn_x1 active_y2");
  });
});
