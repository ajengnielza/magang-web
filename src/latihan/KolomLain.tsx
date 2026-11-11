
import { useState } from "react";
import type { StatusReview } from "../types/jurnal";

type FilterStatus = "semua" | StatusReview;

function adalahFilterStatus(x: string): x is FilterStatus {
  return (
    x === "semua" ||
    x === "belum" ||
    x === "disetujui" ||
    x === "revisi"
  );
}

export default function KolomLain() {
  const [filter, setFilter] = useState<FilterStatus>("semua");
  const [aktif, setAktif] = useState(false);

  return (
    <div>
      <label htmlFor="filter-status">Status</label>{" "}
      <select
        id="filter-status"
        value={filter}
        onChange={(e) => {
          const pilihan = e.target.value;

          if (adalahFilterStatus(pilihan)) {
            setFilter(pilihan);
          }
        }}
      >
        <option value="semua">Semua</option>
        <option value="belum">Belum direview</option>
        <option value="disetujui">Disetujui</option>
        <option value="revisi">Perlu revisi</option>
      </select>{" "}

      <label>
        <input
          type="checkbox"
          checked={aktif}
          onChange={(e) => setAktif(e.target.checked)}
        />{" "}
        Hanya yang aktif
      </label>

      <p>
        Filter: {filter} · aktif: {aktif ? "ya" : "tidak"}
      </p>
    </div>
  );
}
