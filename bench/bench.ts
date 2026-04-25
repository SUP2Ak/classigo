import { bench, run, summary } from "mitata";
import { clsx } from "clsx";
import classnames from "classnames";
import classigo from "../src/index.ts";

const isActive = true;
const isLarge = false;
const variant = "primary";

summary(() => {
  bench("classigo — strings only", () =>
    classigo("btn", "btn--primary", isActive && "btn--active", isLarge && "btn--lg"),
  );
  bench("clsx    — strings only", () =>
    clsx("btn", "btn--primary", isActive && "btn--active", isLarge && "btn--lg"),
  );
  bench("classnames — strings only", () =>
    classnames("btn", "btn--primary", isActive && "btn--active", isLarge && "btn--lg"),
  );
});

summary(() => {
  bench("classigo — object syntax", () =>
    classigo("btn", { "btn--active": isActive, "btn--disabled": isLarge }),
  );
  bench("clsx    — object syntax", () =>
    clsx("btn", { "btn--active": isActive, "btn--disabled": isLarge }),
  );
  bench("classnames — object syntax", () =>
    classnames("btn", { "btn--active": isActive, "btn--disabled": isLarge }),
  );
});

summary(() => {
  bench("classigo — mixed", () =>
    classigo("btn", `btn--${variant}`, { "btn--active": isActive }, isLarge && "btn--lg"),
  );
  bench("clsx    — mixed", () =>
    clsx("btn", `btn--${variant}`, { "btn--active": isActive }, isLarge && "btn--lg"),
  );
  bench("classnames — mixed", () =>
    classnames("btn", `btn--${variant}`, { "btn--active": isActive }, isLarge && "btn--lg"),
  );
});

await run();
