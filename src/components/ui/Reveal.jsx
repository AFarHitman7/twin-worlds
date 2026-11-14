import { useCallback, useRef } from "react";
import { useInView } from "../../hooks/useInView.js";
import { cx } from "../../lib/cx.js";

export default function Reveal({
  as: Tag = "div",
  delay,
  className,
  style,
  nodeRef,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const inView = useInView(ref);
  // Reduced motion is handled in global.css: .reveal is always visible there.
  const visible = inView;

  const setNode = useCallback(
    (node) => {
      ref.current = node;
      if (typeof nodeRef === "function") nodeRef(node);
      else if (nodeRef) nodeRef.current = node;
    },
    [nodeRef]
  );

  return (
    <Tag
      ref={setNode}
      className={cx("reveal", visible && "is-visible", className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
