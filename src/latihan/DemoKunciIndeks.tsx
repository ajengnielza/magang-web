
import { useState } from "react";
import Button from "../components/ui/Button";


const AWAL = ["Satu", "Dua", "Tiga"];

export default function DemoKunciIndeks() {
  const [item, setItem] = useState(AWAL);

  return (
    <div className="demo-key">
      <p className="demo-key-description">
        Hapus item pertama untuk mengamati perubahan pada daftar.
      </p>

      <div className="demo-key-list">
        {item.map((nama) => (
          <div className="demo-key-row" key={nama}>
            <span className="demo-key-name">{nama}</span>

            <input
              type="text"
              placeholder="Masukkan catatan..."
              aria-label={`Catatan untuk ${nama}`}
            />
          </div>
        ))}
      </div>

      <div className="demo-key-actions">
        <Button
          onClick={() => setItem((data) => data.slice(1))}
          disabled={item.length === 0}
        >
          Hapus yang pertama
        </Button>

        <Button variant="secondary" onClick={() => setItem(AWAL)}>
          Reset
        </Button>
      </div>
    </div>
  );
}
