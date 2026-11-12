
import type { FilterStatus } from "../../types/jurnal";
import { adalahFilterStatus } from "../../utils/guard";
import styles from "./FilterJurnal.module.css";

interface FilterStatusJurnalProps {
  nilai: FilterStatus;
  onUbah: (nilai: FilterStatus) => void;
}

export default function FilterStatusJurnal({
  nilai,
  onUbah,
}: FilterStatusJurnalProps) {
  return (
    <label className={styles.kolom}>
      Status review

      <select
        className={styles.input}
        value={nilai}
        onChange={(e) => {
          const pilihan = e.target.value;

          if (adalahFilterStatus(pilihan)) {
            onUbah(pilihan);
          }
        }}
      >
        <option value="semua">Semua</option>
        <option value="belum">Belum direview</option>
        <option value="disetujui">Disetujui</option>
        <option value="revisi">Perlu revisi</option>
      </select>
    </label>
  );
}
