
import { validasiFormJurnal } from "../utils/validasiJurnal";

const hasil = validasiFormJurnal({
  kegiatan: "Mempelajari",
  hambatan: "",
  linkCommit: "github.com/budi",
});

console.log("Hasil validasi:", hasil);
