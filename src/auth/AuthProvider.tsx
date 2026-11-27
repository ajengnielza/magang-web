
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { login, logout, pulihkanSesi } from "../api/auth";
import { setSesiBerakhirHandler } from "../api/client";
import { keApiError } from "../api/errors";
import { AuthContext } from "./context";
import type { NilaiAuth, StatusAuth } from "./context";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<StatusAuth>({ status: "memeriksa" });

  useEffect(() => {
    let dibatalkan = false;

    pulihkanSesi()
      .then((pengguna) => {
        if (!dibatalkan) {
          setAuth(
            pengguna
              ? { status: "masuk", pengguna }
              : { status: "keluar" }
          );
        }
      })
      .catch((err: unknown) => {
        if (!dibatalkan) {
          setAuth({ status: "galat", error: keApiError(err) });
        }
      });

    return () => {
      dibatalkan = true;
    };
  }, []);

  useEffect(() => {
    setSesiBerakhirHandler(() => setAuth({ status: "keluar" }));

    return () => setSesiBerakhirHandler(null);
  }, []);

  const masuk = useCallback(async (email: string, password: string) => {
    const pengguna = await login(email, password);
    setAuth({ status: "masuk", pengguna });
  }, []);

  const keluar = useCallback(async () => {
    try {
      await logout();
    } catch {
      // Sesi di sisi client tetap diakhiri meskipun server tidak terjangkau.
    }

    setAuth({ status: "keluar" });
  }, []);

  const nilai = useMemo<NilaiAuth>(
    () => ({ auth, masuk, keluar }),
    [auth, masuk, keluar]
  );

  return <AuthContext value={nilai}>{children}</AuthContext>;
}
