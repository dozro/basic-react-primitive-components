import { generateShortId } from "@1ry/short-id";
import clsx from "clsx";
import React, { Children, HTMLAttributes, ReactNode, useMemo } from "react";
export type BoxProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "navbar" | "dock";
  as?: "div" | "nav" | "footer" | "main" | "article" | "aside" | "section" | "header";
  orientation?: "horizontal" | "vertical" | "none";
  align?: "left" | "center" | "right" | "none";
  justify?: "start" | "end" | "center" | "evenly" | "spaceBetween" | "none";
  isolate?: boolean;
  children?: ReactNode;
  gap?: number;
};

export function Box({
  variant = "default",
  as,
  className,
  orientation = "none",
  align = "none",
  justify = "none",
  children,
  isolate = false,
  id: customId,
  gap = 0,
  ...props
}: Readonly<BoxProps>) {
  const id = useMemo(() => customId ?? generateShortId(7), [customId]);
  const Component = variant === "navbar" && !as ? "nav" : as || "div";
  const childrenCount = useMemo(() => Children.count(children) ?? [], [children]);
  const gridShit = useMemo(() => {
    if (orientation === "horizontal") {
      return `grid-cols-${childrenCount}`;
    } else {
      return `grid-cols-1`;
    }
  }, [childrenCount]);
  return (
    <Component
      id={id}
      className={clsx(
        {
          default: "",
          navbar: "navbar",
          dock: "dock",
        }[variant],
        {
          horizontal: "flex flex-row",
          vertical: `flex flex-col ${gap != 0 ? `grid ${gridShit}` : undefined}`,
          none: undefined,
        }[orientation],
        {
          left: "items-start text-left",
          center: "items-center text-center",
          right: `items-end text-right ${gap ? "place-self-end-safe place-content-end-safe place-items-end-safe" : undefined}`,
          none: "",
        }[align],
        {
          start: "justify-start",
          end: "justify-end",
          center: "justify-center",
          evenly: "justify-evenly",
          none: "justify-none",
          spaceBetween: "justify-space-between",
        }[justify],
        `gap-${gap}`,
        isolate ? "isolate" : "",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
