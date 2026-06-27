import clsx from "clsx";
import { BoxProps, Box } from "./Box";
import styles from "./Card.module.scss";
import React from "react";

type CardProps = BoxProps & {
  noBorder?: boolean;
};

export const Card = ({ children, className, noBorder, ...props }: CardProps) => (
  <Box
    {...props}
    className={clsx(
      styles.card,
      {
        [styles.noBorder]: noBorder,
      },
      className,
    )}
  >
    {children}
  </Box>
);
