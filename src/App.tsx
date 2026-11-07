export default function App() {
  const nama = "Budi";
  const tahun = new Date().getFullYear();

  return (
    <>
      <header className="salam">
        <h1>Halo, {nama}!</h1>
        <p>Tahun {tahun}, 1 + 1 = {1 + 1}</p>
      </header>
      <main>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" />
        <p style={{ color: "crimson" }}>Merah</p>
      </main>
    </>
  );
}