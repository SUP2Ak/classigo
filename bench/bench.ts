import { bench, run, summary, group } from "mitata";
import { clsx } from "clsx";
import classnames from "classnames";
import classigoV2 from "../src/index.ts";
import classigoLite from "../src/lite.ts";
// @ts-ignore — v1 CJS default export
import classigoV1npm from "classigo-v1";

// ---------------------------------------------------------------------------
// v1 before-optimization inline (for comparison purity)
// ---------------------------------------------------------------------------

function appendClass(value: string, newClass: string): string {
  return !newClass ? value : value ? value + " " + newClass : newClass;
}
function classigoV1inline(...classes: (string | undefined | null | false)[]): string {
  let result = "";
  for (let i = 0; i < classes.length; i++) {
    const cls = classes[i];
    result = cls ? appendClass(result, cls) : result;
  }
  return result;
}

// ---------------------------------------------------------------------------
// v2 before-optimization inline (typeof === "string" check)
// ---------------------------------------------------------------------------

function classigoV2before(...classes: (string | false | null | undefined | Record<string, boolean | null | undefined>)[]): string {
  let result = "";
  for (let i = 0; i < classes.length; i++) {
    const cls = classes[i];
    if (!cls) continue;
    if (typeof cls === "string") {
      result = result ? result + " " + cls : cls;
      continue;
    }
    const obj = cls as Record<string, boolean | null | undefined>;
    for (const key in obj) {
      if (obj[key]) result = result ? result + " " + key : key;
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Stable test data
// ---------------------------------------------------------------------------

const variant = "primary";
const size = "lg";
const isActive = true;
const isDisabled = false;
const isLoading = false;
const isHovered = true;
let tick = 0;
const states = ["idle", "loading", "success", "error"] as const;
let stateIdx = 0;

// ---------------------------------------------------------------------------
// Group 1 — Simple: 3 plain strings
// ---------------------------------------------------------------------------

summary(() => {
  group("simple — 3 strings", () => {
    bench("classigo v2 (optimized) ", () => classigoV2("btn", "btn--primary", "btn--lg"));
    bench("classigo v2 (before)    ", () => classigoV2before("btn", "btn--primary", "btn--lg"));
    bench("classigo v1 (npm 1.0.1) ", () => classigoV1npm("btn", "btn--primary", "btn--lg"));
    bench("classigo v1 (inline)    ", () => classigoV1inline("btn", "btn--primary", "btn--lg"));
    bench("classigo lite           ", () => classigoLite("btn", "btn--primary", "btn--lg"));
    bench("clsx                    ", () => clsx("btn", "btn--primary", "btn--lg"));
    bench("classnames              ", () => classnames("btn", "btn--primary", "btn--lg"));
  });
});

// ---------------------------------------------------------------------------
// Group 2 — Conditional strings with &&
// ---------------------------------------------------------------------------

summary(() => {
  group("conditional — 4 args, 2 with &&", () => {
    bench("classigo v2 (optimized) ", () =>
      classigoV2("btn", `btn--${variant}`, isActive && "btn--active", isDisabled && "btn--disabled"),
    );
    bench("classigo v2 (before)    ", () =>
      classigoV2before("btn", `btn--${variant}`, isActive && "btn--active", isDisabled && "btn--disabled"),
    );
    bench("classigo v1 (npm 1.0.1) ", () =>
      classigoV1npm("btn", `btn--${variant}`, isActive && "btn--active", isDisabled && "btn--disabled"),
    );
    bench("classigo v1 (inline)    ", () =>
      classigoV1inline("btn", `btn--${variant}`, isActive && "btn--active", isDisabled && "btn--disabled"),
    );
    bench("classigo lite           ", () =>
      classigoLite("btn", `btn--${variant}`, isActive && "btn--active", isDisabled && "btn--disabled"),
    );
    bench("clsx                    ", () =>
      clsx("btn", `btn--${variant}`, isActive && "btn--active", isDisabled && "btn--disabled"),
    );
    bench("classnames              ", () =>
      classnames("btn", `btn--${variant}`, isActive && "btn--active", isDisabled && "btn--disabled"),
    );
  });
});

// ---------------------------------------------------------------------------
// Group 3 — Complex: 8 args
// ---------------------------------------------------------------------------

summary(() => {
  group("complex — 8 args, template literals + conditionals", () => {
    bench("classigo v2 (optimized) ", () =>
      classigoV2("card", `card--${variant}`, `card--${size}`, isActive && "card--active",
        isDisabled && "card--disabled", isLoading && "card--loading",
        isHovered && "card--hovered", "card--rounded"),
    );
    bench("classigo v2 (before)    ", () =>
      classigoV2before("card", `card--${variant}`, `card--${size}`, isActive && "card--active",
        isDisabled && "card--disabled", isLoading && "card--loading",
        isHovered && "card--hovered", "card--rounded"),
    );
    bench("classigo v1 (npm 1.0.1) ", () =>
      classigoV1npm("card", `card--${variant}`, `card--${size}`, isActive && "card--active",
        isDisabled && "card--disabled", isLoading && "card--loading",
        isHovered && "card--hovered", "card--rounded"),
    );
    bench("classigo v1 (inline)    ", () =>
      classigoV1inline("card", `card--${variant}`, `card--${size}`, isActive && "card--active",
        isDisabled && "card--disabled", isLoading && "card--loading",
        isHovered && "card--hovered", "card--rounded"),
    );
    bench("classigo lite           ", () =>
      classigoLite("card", `card--${variant}`, `card--${size}`, isActive && "card--active",
        isDisabled && "card--disabled", isLoading && "card--loading",
        isHovered && "card--hovered", "card--rounded"),
    );
    bench("clsx                    ", () =>
      clsx("card", `card--${variant}`, `card--${size}`, isActive && "card--active",
        isDisabled && "card--disabled", isLoading && "card--loading",
        isHovered && "card--hovered", "card--rounded"),
    );
    bench("classnames              ", () =>
      classnames("card", `card--${variant}`, `card--${size}`, isActive && "card--active",
        isDisabled && "card--disabled", isLoading && "card--loading",
        isHovered && "card--hovered", "card--rounded"),
    );
  });
});

// ---------------------------------------------------------------------------
// Group 4 — Object syntax (v1 N/A)
// ---------------------------------------------------------------------------

summary(() => {
  group("object syntax — v1 N/A", () => {
    bench("classigo v2 (optimized) ", () =>
      classigoV2("btn", { "btn--active": isActive, "btn--disabled": isDisabled, "btn--loading": isLoading }),
    );
    bench("classigo v2 (before)    ", () =>
      classigoV2before("btn", { "btn--active": isActive, "btn--disabled": isDisabled, "btn--loading": isLoading }),
    );
    bench("clsx                    ", () =>
      clsx("btn", { "btn--active": isActive, "btn--disabled": isDisabled, "btn--loading": isLoading }),
    );
    bench("classnames              ", () =>
      classnames("btn", { "btn--active": isActive, "btn--disabled": isDisabled, "btn--loading": isLoading }),
    );
  });
});

// ---------------------------------------------------------------------------
// Group 5 — Re-render: boolean toggles each call
// ---------------------------------------------------------------------------

summary(() => {
  group("re-render — boolean toggles each call", () => {
    bench("classigo v2 (optimized) ", () => {
      tick ^= 1;
      return classigoV2("btn", tick ? "btn--active" : null, isDisabled && "btn--disabled");
    });
    bench("classigo v2 (before)    ", () => {
      tick ^= 1;
      return classigoV2before("btn", tick ? "btn--active" : null, isDisabled && "btn--disabled");
    });
    bench("classigo v1 (npm 1.0.1) ", () => {
      tick ^= 1;
      return classigoV1npm("btn", tick ? "btn--active" : undefined, isDisabled && "btn--disabled");
    });
    bench("classigo v1 (inline)    ", () => {
      tick ^= 1;
      return classigoV1inline("btn", tick ? "btn--active" : undefined, isDisabled && "btn--disabled");
    });
    bench("classigo lite           ", () => {
      tick ^= 1;
      return classigoLite("btn", tick ? "btn--active" : undefined, isDisabled && "btn--disabled");
    });
    bench("clsx                    ", () => {
      tick ^= 1;
      return clsx("btn", tick ? "btn--active" : null, isDisabled && "btn--disabled");
    });
    bench("classnames              ", () => {
      tick ^= 1;
      return classnames("btn", tick ? "btn--active" : null, isDisabled && "btn--disabled");
    });
  });
});

// ---------------------------------------------------------------------------
// Group 6 — Re-render inline object (anti-pattern)
// ---------------------------------------------------------------------------

summary(() => {
  group("re-render — inline object recreated each call", () => {
    bench("classigo v2 (optimized) ", () => {
      tick ^= 1;
      return classigoV2("btn", { "btn--active": tick === 1, "btn--primary": true });
    });
    bench("classigo v2 (before)    ", () => {
      tick ^= 1;
      return classigoV2before("btn", { "btn--active": tick === 1, "btn--primary": true });
    });
    bench("clsx                    ", () => {
      tick ^= 1;
      return clsx("btn", { "btn--active": tick === 1, "btn--primary": true });
    });
    bench("classnames              ", () => {
      tick ^= 1;
      return classnames("btn", { "btn--active": tick === 1, "btn--primary": true });
    });
  });
});

// ---------------------------------------------------------------------------
// Group 7 — Ultra-dynamic: all args vary per call
// ---------------------------------------------------------------------------

summary(() => {
  group("ultra-dynamic — all args vary per call", () => {
    bench("classigo v2 (optimized) ", () => {
      stateIdx = (stateIdx + 1) % states.length;
      const s = states[stateIdx]!;
      return classigoV2("badge", `badge--${s}`, s === "loading" && "badge--pulse",
        s === "error" && "badge--shake",
        { "badge--visible": s !== "idle", "badge--highlighted": s === "success" });
    });
    bench("classigo v2 (before)    ", () => {
      stateIdx = (stateIdx + 1) % states.length;
      const s = states[stateIdx]!;
      return classigoV2before("badge", `badge--${s}`, s === "loading" && "badge--pulse",
        s === "error" && "badge--shake",
        { "badge--visible": s !== "idle", "badge--highlighted": s === "success" });
    });
    bench("clsx                    ", () => {
      stateIdx = (stateIdx + 1) % states.length;
      const s = states[stateIdx]!;
      return clsx("badge", `badge--${s}`, s === "loading" && "badge--pulse",
        s === "error" && "badge--shake",
        { "badge--visible": s !== "idle", "badge--highlighted": s === "success" });
    });
    bench("classnames              ", () => {
      stateIdx = (stateIdx + 1) % states.length;
      const s = states[stateIdx]!;
      return classnames("badge", `badge--${s}`, s === "loading" && "badge--pulse",
        s === "error" && "badge--shake",
        { "badge--visible": s !== "idle", "badge--highlighted": s === "success" });
    });
  });
});

// ---------------------------------------------------------------------------
// Group 8 — Design-system: 20 args, fully dynamic (defeats JIT constant folding)
// Simulates a real complex component — large class pool rotating across calls
// ---------------------------------------------------------------------------

const dsComponents = ["btn", "card", "badge", "input", "modal", "chip", "avatar", "tag"] as const;
const dsVariants   = ["primary", "secondary", "danger", "warning", "success", "info", "ghost", "outline"] as const;
const dsSizes      = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
const dsRounded    = ["none", "sm", "md", "lg", "full"] as const;
let dsN = 0;

summary(() => {
  group("design-system — 20 dynamic args (large class pool)", () => {
    bench("classigo v2 (optimized) ", () => {
      const n = ++dsN;
      const c = dsComponents[n % dsComponents.length]!;
      const v = dsVariants[n % dsVariants.length]!;
      const sz = dsSizes[n % dsSizes.length]!;
      const r = dsRounded[n % dsRounded.length]!;
      return classigoV2(
        c, `${c}--${v}`, `${c}--${sz}`, `${c}--rounded-${r}`,
        n % 3 === 0  && `${c}--active`,
        n % 7 === 0  && `${c}--disabled`,
        n % 5 === 0  && `${c}--loading`,
        n % 4 === 0  && `${c}--focused`,
        n % 2 === 0  && `${c}--hovered`,
        n % 6 === 0  && `${c}--selected`,
        n % 9 === 0  && `${c}--dragging`,
        n % 11 === 0 && `${c}--expanded`,
        n % 13 === 0 && `${c}--highlighted`,
        n % 15 === 0 && `${c}--truncated`,
        n % 17 === 0 && `${c}--elevated`,
        n % 19 === 0 && `${c}--bordered`,
        n % 23 === 0 && `${c}--animated`,
        n % 29 === 0 && `${c}--rtl`,
        "transition", "will-change-transform",
      );
    });
    bench("classigo v2 (before)    ", () => {
      const n = ++dsN;
      const c = dsComponents[n % dsComponents.length]!;
      const v = dsVariants[n % dsVariants.length]!;
      const sz = dsSizes[n % dsSizes.length]!;
      const r = dsRounded[n % dsRounded.length]!;
      return classigoV2before(
        c, `${c}--${v}`, `${c}--${sz}`, `${c}--rounded-${r}`,
        n % 3 === 0  && `${c}--active`,
        n % 7 === 0  && `${c}--disabled`,
        n % 5 === 0  && `${c}--loading`,
        n % 4 === 0  && `${c}--focused`,
        n % 2 === 0  && `${c}--hovered`,
        n % 6 === 0  && `${c}--selected`,
        n % 9 === 0  && `${c}--dragging`,
        n % 11 === 0 && `${c}--expanded`,
        n % 13 === 0 && `${c}--highlighted`,
        n % 15 === 0 && `${c}--truncated`,
        n % 17 === 0 && `${c}--elevated`,
        n % 19 === 0 && `${c}--bordered`,
        n % 23 === 0 && `${c}--animated`,
        n % 29 === 0 && `${c}--rtl`,
        "transition", "will-change-transform",
      );
    });
    bench("classigo v1 (npm 1.0.1) ", () => {
      const n = ++dsN;
      const c = dsComponents[n % dsComponents.length]!;
      const v = dsVariants[n % dsVariants.length]!;
      const sz = dsSizes[n % dsSizes.length]!;
      const r = dsRounded[n % dsRounded.length]!;
      return classigoV1npm(
        c, `${c}--${v}`, `${c}--${sz}`, `${c}--rounded-${r}`,
        n % 3 === 0  && `${c}--active`,
        n % 7 === 0  && `${c}--disabled`,
        n % 5 === 0  && `${c}--loading`,
        n % 4 === 0  && `${c}--focused`,
        n % 2 === 0  && `${c}--hovered`,
        n % 6 === 0  && `${c}--selected`,
        n % 9 === 0  && `${c}--dragging`,
        n % 11 === 0 && `${c}--expanded`,
        n % 13 === 0 && `${c}--highlighted`,
        n % 15 === 0 && `${c}--truncated`,
        n % 17 === 0 && `${c}--elevated`,
        n % 19 === 0 && `${c}--bordered`,
        n % 23 === 0 && `${c}--animated`,
        n % 29 === 0 && `${c}--rtl`,
        "transition", "will-change-transform",
      );
    });
    bench("classigo lite           ", () => {
      const n = ++dsN;
      const c = dsComponents[n % dsComponents.length]!;
      const v = dsVariants[n % dsVariants.length]!;
      const sz = dsSizes[n % dsSizes.length]!;
      const r = dsRounded[n % dsRounded.length]!;
      return classigoLite(
        c, `${c}--${v}`, `${c}--${sz}`, `${c}--rounded-${r}`,
        n % 3 === 0  && `${c}--active`,
        n % 7 === 0  && `${c}--disabled`,
        n % 5 === 0  && `${c}--loading`,
        n % 4 === 0  && `${c}--focused`,
        n % 2 === 0  && `${c}--hovered`,
        n % 6 === 0  && `${c}--selected`,
        n % 9 === 0  && `${c}--dragging`,
        n % 11 === 0 && `${c}--expanded`,
        n % 13 === 0 && `${c}--highlighted`,
        n % 15 === 0 && `${c}--truncated`,
        n % 17 === 0 && `${c}--elevated`,
        n % 19 === 0 && `${c}--bordered`,
        n % 23 === 0 && `${c}--animated`,
        n % 29 === 0 && `${c}--rtl`,
        "transition", "will-change-transform",
      );
    });
    bench("clsx                    ", () => {
      const n = ++dsN;
      const c = dsComponents[n % dsComponents.length]!;
      const v = dsVariants[n % dsVariants.length]!;
      const sz = dsSizes[n % dsSizes.length]!;
      const r = dsRounded[n % dsRounded.length]!;
      return clsx(
        c, `${c}--${v}`, `${c}--${sz}`, `${c}--rounded-${r}`,
        n % 3 === 0  && `${c}--active`,
        n % 7 === 0  && `${c}--disabled`,
        n % 5 === 0  && `${c}--loading`,
        n % 4 === 0  && `${c}--focused`,
        n % 2 === 0  && `${c}--hovered`,
        n % 6 === 0  && `${c}--selected`,
        n % 9 === 0  && `${c}--dragging`,
        n % 11 === 0 && `${c}--expanded`,
        n % 13 === 0 && `${c}--highlighted`,
        n % 15 === 0 && `${c}--truncated`,
        n % 17 === 0 && `${c}--elevated`,
        n % 19 === 0 && `${c}--bordered`,
        n % 23 === 0 && `${c}--animated`,
        n % 29 === 0 && `${c}--rtl`,
        "transition", "will-change-transform",
      );
    });
    bench("classnames              ", () => {
      const n = ++dsN;
      const c = dsComponents[n % dsComponents.length]!;
      const v = dsVariants[n % dsVariants.length]!;
      const sz = dsSizes[n % dsSizes.length]!;
      const r = dsRounded[n % dsRounded.length]!;
      return classnames(
        c, `${c}--${v}`, `${c}--${sz}`, `${c}--rounded-${r}`,
        n % 3 === 0  && `${c}--active`,
        n % 7 === 0  && `${c}--disabled`,
        n % 5 === 0  && `${c}--loading`,
        n % 4 === 0  && `${c}--focused`,
        n % 2 === 0  && `${c}--hovered`,
        n % 6 === 0  && `${c}--selected`,
        n % 9 === 0  && `${c}--dragging`,
        n % 11 === 0 && `${c}--expanded`,
        n % 13 === 0 && `${c}--highlighted`,
        n % 15 === 0 && `${c}--truncated`,
        n % 17 === 0 && `${c}--elevated`,
        n % 19 === 0 && `${c}--bordered`,
        n % 23 === 0 && `${c}--animated`,
        n % 29 === 0 && `${c}--rtl`,
        "transition", "will-change-transform",
      );
    });
  });
});

// ---------------------------------------------------------------------------
// Group 9 — CSS-modules pattern: large object, 15 keys, all dynamic
// Closest to real usage: { [styles.active]: isActive, ... }
// ---------------------------------------------------------------------------

let cssN = 0;

summary(() => {
  group("css-modules — large object, 15 dynamic keys", () => {
    bench("classigo v2 (optimized) ", () => {
      const n = ++cssN;
      return classigoV2("root", {
        active:      n % 3 === 0,
        disabled:    n % 7 === 0,
        loading:     n % 5 === 0,
        focused:     n % 4 === 0,
        hovered:     n % 2 === 0,
        selected:    n % 6 === 0,
        dragging:    n % 9 === 0,
        expanded:    n % 11 === 0,
        highlighted: n % 13 === 0,
        truncated:   n % 15 === 0,
        elevated:    n % 17 === 0,
        bordered:    n % 19 === 0,
        animated:    n % 23 === 0,
        rtl:         n % 29 === 0,
        fullWidth:   n % 31 === 0,
      });
    });
    bench("classigo v2 (before)    ", () => {
      const n = ++cssN;
      return classigoV2before("root", {
        active:      n % 3 === 0,
        disabled:    n % 7 === 0,
        loading:     n % 5 === 0,
        focused:     n % 4 === 0,
        hovered:     n % 2 === 0,
        selected:    n % 6 === 0,
        dragging:    n % 9 === 0,
        expanded:    n % 11 === 0,
        highlighted: n % 13 === 0,
        truncated:   n % 15 === 0,
        elevated:    n % 17 === 0,
        bordered:    n % 19 === 0,
        animated:    n % 23 === 0,
        rtl:         n % 29 === 0,
        fullWidth:   n % 31 === 0,
      });
    });
    bench("clsx                    ", () => {
      const n = ++cssN;
      return clsx("root", {
        active:      n % 3 === 0,
        disabled:    n % 7 === 0,
        loading:     n % 5 === 0,
        focused:     n % 4 === 0,
        hovered:     n % 2 === 0,
        selected:    n % 6 === 0,
        dragging:    n % 9 === 0,
        expanded:    n % 11 === 0,
        highlighted: n % 13 === 0,
        truncated:   n % 15 === 0,
        elevated:    n % 17 === 0,
        bordered:    n % 19 === 0,
        animated:    n % 23 === 0,
        rtl:         n % 29 === 0,
        fullWidth:   n % 31 === 0,
      });
    });
    bench("classnames              ", () => {
      const n = ++cssN;
      return classnames("root", {
        active:      n % 3 === 0,
        disabled:    n % 7 === 0,
        loading:     n % 5 === 0,
        focused:     n % 4 === 0,
        hovered:     n % 2 === 0,
        selected:    n % 6 === 0,
        dragging:    n % 9 === 0,
        expanded:    n % 11 === 0,
        highlighted: n % 13 === 0,
        truncated:   n % 15 === 0,
        elevated:    n % 17 === 0,
        bordered:    n % 19 === 0,
        animated:    n % 23 === 0,
        rtl:         n % 29 === 0,
        fullWidth:   n % 31 === 0,
      });
    });
  });
});

// ---------------------------------------------------------------------------
// Package sizes
// ---------------------------------------------------------------------------

import { statSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const kb = (b: number) => (b / 1024).toFixed(2) + " kB";
const sz = (p: string) => { try { return statSync(p).size; } catch { return null; } };

const v2Size   = sz(resolve(__dirname, "../dist/index.js"));
const liteSize = sz(resolve(__dirname, "../dist/lite.js"));
const v1Size   = sz(resolve(__dirname, "../node_modules/classigo-v1/dist/index.mjs"));
const clsxSize = sz(resolve(__dirname, "../node_modules/clsx/dist/clsx.mjs"));
const cnSize   = sz(resolve(__dirname, "../node_modules/classnames/index.js"));

console.log("\n── Package sizes (minified) ────────────────────");
console.log(`classigo v2   ${v2Size   ? kb(v2Size).padStart(9)   : "build first"}`);
console.log(`classigo lite ${liteSize ? kb(liteSize).padStart(9) : "build first"}`);
console.log(`classigo v1   ${v1Size   ? kb(v1Size).padStart(9)   : "N/A"}`);
console.log(`clsx          ${clsxSize ? kb(clsxSize).padStart(9) : "N/A"}`);
console.log(`classnames    ${cnSize   ? kb(cnSize).padStart(9)   : "N/A"}`);
console.log("────────────────────────────────────────────────\n");

await run();
