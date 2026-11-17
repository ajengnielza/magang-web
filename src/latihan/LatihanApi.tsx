
import { useState } from "react";
import { BASE_URL } from "../config";

export default function LatihanApi() {
  const [hasil, setHasil] = useState("Belum ada pengujian");

  async function cekPreflight() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/me",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer abc",
          },
        }
      );

      const requestId = response.headers.get("X-Request-Id");

      setHasil(
        `Status: ${response.status}\n` +
        `OK: ${response.ok}\n` +
        `X-Request-Id: ${requestId ?? "tidak terbaca"}`
      );
    } catch (error) {
      console.error("Gagal menghubungi API:", error);
      setHasil("Gagal menghubungi server");
    }
  }

  async function cek401ViaProxy() {
    try {
      const response = await fetch(`${BASE_URL}/me`, {
        method: "GET",
        headers: {
          Authorization: "Bearer abc",
        },
      });

      const requestId = response.headers.get("X-Request-Id");

      setHasil(
        `Status: ${response.status}\n` +
        `OK: ${response.ok}\n` +
        `X-Request-Id: ${requestId ?? "tidak terbaca"}`
      );
    } catch (error) {
      console.error("Gagal menghubungi API:", error);
      setHasil("Gagal menghubungi server");
    }
  }

  function eksperimenThen() {
  fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: "Bearer abc",
    },
  })
    .then(async (res) => {
      console.log("ok?", res.ok, "status:", res.status);

      const body = await res.json();

      return {
        sukses: res.ok,
        error: body,
      };
    })
    .then((hasil) => {
      console.log("then kedua tetap jalan:", hasil);
    })
    .catch((error) => {
      console.log("catch TIDAK terpanggil:", error);
    });
}

async function loginTanpaContentType() {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: "mentor@test.com",
        password: "mentor123",
      }),
    });

    const body = await response.json();

    setHasil(
      `Status: ${response.status}\n` +
      `OK: ${response.ok}\n` +
      `Isi: ${JSON.stringify(body)}`
    );
  } catch (error) {
    console.error(error);
    setHasil("Gagal menghubungi server");
  }
}

async function loginDenganContentType() {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "mentor@test.com",
        password: "mentor123",
      }),
    });

    const body = await response.json();

    setHasil(
      `Status: ${response.status}\n` +
      `OK: ${response.ok}\n` +
      `Isi: ${JSON.stringify(body)}`
    );
  } catch (error) {
    console.error(error);
    setHasil("Gagal menghubungi server");
  }
}

  return (
    <main style={{ padding: "24px" }}>
      <h1>Latihan API</h1>

      <p>BASE_URL: {BASE_URL}</p>

      <section>
        <h2>Preflight (langsung ke backend)</h2>
        <p>
          Menguji permintaan GET /me dengan Authorization Bearer abc.
        </p>

        <button onClick={cekPreflight}>
          Preflight (langsung ke backend)
        </button>

        <button onClick={cek401ViaProxy}>
          401 via proxy
        </button>
        
        <button onClick={eksperimenThen}>
        Eksperimen .then (lihat Console)
        </button>

        <button onClick={loginTanpaContentType}>
        Login TANPA Content-Type
        </button>

        <button onClick={loginDenganContentType}>
        Login dengan Content-Type
        </button>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: "16px" }}>
          {hasil}
        </pre>
      </section>
    </main>
  );
}
