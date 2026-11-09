import Button from "./Button";

export default function GaleriButton() {
  return (
    <section>
      <h2>Button Primary</h2>
      <Button variant="primary">Primary</Button>

      <h2>Button Secondary</h2>
      <Button variant="secondary">Secondary</Button>

      <h2>Button Danger</h2>
      <Button variant="danger">Danger</Button>

      <h2>Ukuran Small</h2>
      <Button size="sm">Small</Button>

      <h2>Ukuran Medium</h2>
      <Button size="md">Medium</Button>

      <h2>Disabled</h2>
      <Button disabled>Nonaktif</Button>

      <h2>On Click</h2>
      <Button onClick={() => console.log("Tombol diklik!")}>
        Klik Saya
      </Button>

      <h2>Submit</h2>
      <form
        onSubmit={(event) => {
            event.preventDefault();
            console.log("Form berhasil dikirim!");
        }}
        >
        <Button type="submit">Kirim</Button>
        </form>
    </section>
  );
}