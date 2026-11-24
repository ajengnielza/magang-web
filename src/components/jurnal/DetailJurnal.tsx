
import { useNavigate } from "react-router";
import { kodeLaporan, pesanUntukPengguna } from "../../api/pesan";
import { useJurnal } from "../../hooks/useJurnal";
import { formatTanggal } from "../../utils/format";
import { adalahUrlHttp } from "../../utils/url";
import Alert from "../ui/Alert";
import Button from "../ui/Button";
import StatusBadge from "./StatusBadge";

interface DetailJurnalProps {
  id: number;
}

export default function DetailJurnal({ id }: DetailJurnalProps) {
  const { hasil, muatUlang } = useJurnal(id);
  const navigate = useNavigate();

  switch (hasil.status) {
    case "memuat":
      return <p role="status">Memuat jurnal...</p>;

    case "gagal": {
      const laporan = kodeLaporan(hasil.error);

      return (
        <Alert tipe="bahaya">
          <p>{pesanUntukPengguna(hasil.error)}</p>

          {laporan && <p>{laporan}</p>}

          <Button size="sm" onClick={muatUlang}>
            Coba lagi
          </Button>{" "}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate("/jurnal")}
          >
            ← Kembali ke daftar
          </Button>
        </Alert>
      );
    }

    case "berhasil": {
      const j = hasil.data;

      const link =
        j.linkCommit !== null && adalahUrlHttp(j.linkCommit)
          ? j.linkCommit
          : null;

      return (
        <article>
          <p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate("/jurnal")}
            >
              ← Kembali ke daftar
            </Button>
          </p>

          <h1>Jurnal #{j.id}</h1>

          <p>
            <time dateTime={j.createdAt}>
              {formatTanggal(j.createdAt)}
            </time>{" "}
            <StatusBadge status={j.statusReview} />
          </p>

          <p>{j.kegiatan}</p>

          {j.hambatan && <p>Hambatan: {j.hambatan}</p>}

          {j.catatanMentor && (
            <p>Catatan mentor: {j.catatanMentor}</p>
          )}

          {link !== null && (
            <p>
              <a href={link} target="_blank" rel="noreferrer">
                Lihat commit
              </a>
            </p>
          )}

          {j.lampiran && j.lampiran.length > 0 && (
            <>
              <h2>Lampiran</h2>

              <ul>
                {j.lampiran.map((l, i) => (
                  <li key={`${i}:${l.url}`}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        navigate(`/jurnal/${j.id}/lampiran/${i + 1}`)
                      }
                    >
                      Lampiran {i + 1}
                    </Button>

                    {l.keterangan && ` · ${l.keterangan}`}
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>
      );
    }
  }
}
