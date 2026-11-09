export default function PenghitungVariabel() {
  let jumlah = 0;

  function tambah() {
    jumlah = jumlah + 1;
    console.log("jumlah sekarang:", jumlah);
  }

  return (
    <button type="button" onClick={tambah}>
      Jumlah: {jumlah}
    </button>
  );
}