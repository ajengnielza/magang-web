
import { useEffect } from "react";

export default function EfekStrictMode() {
  useEffect(() => {
    console.log("pasang");

    return () => console.log("lepas");
  }, []);

  return <p>Lihat Console: urutan log efek.</p>;
}
