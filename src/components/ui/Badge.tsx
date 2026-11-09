import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Badge.module.css";

export type BadgeVariasi = "netral" | "sukses" | "peringatan" | "bahaya";

interface BadgeProps {
  variasi?: BadgeVariasi;
  children: ReactNode;
}

export default function Badge({
  variasi = "netral",
  children,
}: BadgeProps) {
  return (
    <span className={cx(styles.badge, styles[variasi])}>
      {children}
    </span>
  );
}