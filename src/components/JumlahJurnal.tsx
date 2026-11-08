interface JumlahJurnalProps {
  jumlah: number;
}

export default function JumlahJurnal({ jumlah }: JumlahJurnalProps) {
 return <div>{jumlah > 0 && <p>{jumlah} jurnal</p>}</div>;
}