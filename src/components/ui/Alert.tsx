import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import styles from "./Alert.module.css";

export type AlertTipe = "info" | "sukses" | "bahaya";

interface AlertProps {
  tipe: AlertTipe;
  children: ReactNode;
}

export default function Alert({ tipe, children }: AlertProps) {
  return (
    <div
      role={tipe === "bahaya" ? "alert" : "status"}
      className={cx(styles.alert, styles[tipe])}
    >
      {children}
    </div>
  );
}