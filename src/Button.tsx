import styles from "./Button.module.scss";
import { generateShortId } from "@1ry/short-id";
import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import React, { useMemo } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  glowing?: boolean;
  transparent?: boolean;
  noBorder?: boolean;
  asSubmit?: boolean;
};

export function Button({
  className,
  children,
  glowing = false,
  noBorder = true,
  transparent = true,
  asSubmit = false,
  title,
  id: customId,
  ...props
}: Readonly<ButtonProps>) {
  const id = useMemo(() => customId ?? generateShortId(7), [customId]);
  if (!title) {
    console.warn("button title is missing");
  }
  const cname = clsx("RyButton", className, styles.noBorder, styles.glow, styles.transparent);
  if (asSubmit) {
    return (
      <button type="submit" className={cname} title={title} id={id} {...props}>
        {children}
      </button>
    );
  }
  return (
    <button className={cname} title={title} id={id} {...props}>
      {children}
    </button>
  );
}
