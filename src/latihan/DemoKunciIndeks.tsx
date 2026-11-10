
import { useState } from "react";
import Button from "../components/ui/Button";

const AWAL = ["Satu", "Dua", "Tiga"];

export default function DemoKunciIndeks() {
  const [item, setItem] = useState(AWAL);

  return (
    <div>
      <ul>
        {item.map((nama) => (
          <li key={nama}>
            {nama}{" "}
            <input
              placeholder="catatan"
              aria-label={`Catatan untuk ${nama}`}
            />
          </li>
        ))}
      </ul>

      <Button onClick={() => setItem((d) => d.slice(1))}>
        Hapus yang pertama
      </Button>

      <Button variant="secondary" onClick={() => setItem(AWAL)}>
        Reset
      </Button>
    </div>
  );
}
