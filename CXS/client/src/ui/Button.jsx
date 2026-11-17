import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Magnetic } from "./motion";

/**
 * Pill button. Renders a router Link (to) or a native element.
 * variant: primary | glass | ink | plain
 */
export default function Button({
  to,
  href,
  variant = "primary",
  size,
  children,
  icon = true,
  magnetic = true,
  className = "",
  ...rest
}) {
  const classes = `btn btn--${variant} ${size === "sm" ? "btn--sm" : ""} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          <ArrowRight size={size === "sm" ? 16 : 18} strokeWidth={2} />
        </span>
      )}
    </>
  );

  let node;
  if (to) {
    node = (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  } else if (href) {
    node = (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  } else {
    node = (
      <button type="button" className={classes} {...rest}>
        {content}
      </button>
    );
  }

  return magnetic && variant !== "plain" ? <Magnetic>{node}</Magnetic> : node;
}
