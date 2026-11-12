
import { useEffect, useRef } from "react";
import styles from "./FilterJurnal.module.css";

interface PencarianJurnalProps {
  nilai: string;
  onUbah: (nilai: string) => void;
}

export default function PencarianJurnal({
  nilai,
  onUbah,
}: PencarianJurnalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function tekanTombol(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      // Jangan mengambil tombol "/" ketika pengguna sedang mengetik
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", tekanTombol);

    return () => {
      window.removeEventListener("keydown", tekanTombol);
    };
  }, []);

  return (
    <label className={styles.kolom}>
      Cari kegiatan
      <input
        ref={inputRef}
        className={styles.input}
        type="search"
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
        placeholder='Tekan "/" untuk mencari'
      />
    </label>
  );
}
