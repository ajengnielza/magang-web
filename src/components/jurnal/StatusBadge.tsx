import type { StatusReview } from "../../types/jurnal";
import Badge, { type BadgeVariasi } from "../ui/Badge";

const TAMPILAN: Record<
  StatusReview,
  { label: string; variasi: BadgeVariasi }
> = {
  belum: {
    label: "Belum direview",
    variasi: "netral",
  },
  disetujui: {
    label: "Disetujui",
    variasi: "sukses",
  },
  revisi: {
    label: "Perlu revisi",
    variasi: "peringatan",
  },
};

interface StatusBadgeProps {
  status: StatusReview;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, variasi } = TAMPILAN[status];

  return <Badge variasi={variasi}>{label}</Badge>;
}