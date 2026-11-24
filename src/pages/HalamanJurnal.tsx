
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { buatJurnal } from "../api/jurnal";
import type { JurnalBaru } from "../api/types";
import FormJurnal from "../components/jurnal/FormJurnal";
import HasilDaftarJurnal from "../components/jurnal/HasilDaftarJurnal";
import Kartu from "../components/ui/Kartu";
import { useJurnalSaya } from "../hooks/useJurnalSaya";
import { bacaHalaman } from "../utils/parameter";

export default function HalamanJurnal() {
  const [params, setParams] = useSearchParams();
  const nilaiHalaman = params.get("halaman");
  const halaman = bacaHalaman(nilaiHalaman);

  useEffect(() => {
    if (nilaiHalaman !== null && String(halaman) !== nilaiHalaman) {
      setParams({ halaman: String(halaman) }, { replace: true });
    }
  }, [nilaiHalaman, halaman, setParams]);

  const { hasil, muatUlang } = useJurnalSaya(halaman);

  function gantiHalaman(tujuan: number) {
    setParams({ halaman: String(tujuan) });
  }

  async function tambah(data: JurnalBaru): Promise<void> {
    await buatJurnal(data);
    setParams({ halaman: "1" }, { replace: true });
    muatUlang();
  }

  return (
    <>
      <Kartu judul="Tambah jurnal">
        <FormJurnal onTambah={tambah} />
      </Kartu>

      <Kartu judul="Jurnal saya">
        <HasilDaftarJurnal
          hasil={hasil}
          onMuatUlang={muatUlang}
          onGantiHalaman={gantiHalaman}
        />
      </Kartu> 
      
    </>
  );
}
