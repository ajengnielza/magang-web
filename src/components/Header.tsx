interface HeaderProps {
  judul: string;
}

export default function Header({ judul }: HeaderProps) {
  return (
    <header>
      <h1>{judul}</h1>
    </header>
  );
}