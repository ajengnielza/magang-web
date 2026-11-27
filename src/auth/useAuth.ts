import { useContext } from "react";
import { AuthContext } from "./context";
import type { NilaiAuth } from "./context";

export function useAuth(): NilaiAuth {
  const nilai = useContext(AuthContext);

  if (nilai === null) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider");
  }

  return nilai;
}