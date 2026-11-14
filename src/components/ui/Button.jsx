import { useFinePointer, useReducedMotion } from "../../hooks/useMediaQuery.js";
import { useMagnetic } from "../../hooks/useMotion.js";
import { cx } from "../../lib/cx.js";

export default function Button({
  href,
  variant = "solid",
  size,
  magnetic = false,
  className,
  children,
  ...rest
}) {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const handlers = useMagnetic(magnetic && fine && !reduced);
  const Tag = href ? "a" : "button";

  return (
    <Tag
      href={href}
      type={href ? undefined : "button"}
      className={cx("btn", `btn--${variant}`, size === "big" && "btn--big", className)}
      {...handlers}
      {...rest}
    >
      <span className="btn__flare" />
      {children}
    </Tag>
  );
}
