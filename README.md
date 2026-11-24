# Magang-web

Frontend aplikasi **API Magang** untuk mengelola jurnal harian peserta magang. Proyek ini dikembangkan menggunakan React, TypeScript, dan Vite, serta telah terintegrasi dengan REST API backend.

Aplikasi memungkinkan peserta melakukan login, melihat daftar jurnal miliknya, menambahkan jurnal baru, dan menghapus jurnal yang telah dibuat.

## Fitur

- Login menggunakan email dan password.
- Menyimpan access token di memori aplikasi.
- Menampilkan daftar jurnal milik peserta dari API.
- Menggunakan pagination dari server.
- Menambahkan jurnal melalui formulir dengan validasi.
- Menghapus jurnal dengan konfirmasi.
- Menampilkan status loading, error, data kosong, dan data berhasil.
- Menampilkan pesan error yang ramah berdasarkan respons API.
- Menampilkan kode laporan untuk membantu pelacakan error.
- Memuat ulang daftar jurnal setelah penambahan atau penghapusan data.
- Menggunakan `AbortController` untuk membatalkan request ketika diperlukan.

## Teknologi

- React 19
- TypeScript 7
- Vite 8
- CSS Modules
- Oxlint
- REST API
- Node.js dan Express (backend)
- PostgreSQL (database)

## Cara Menjalankan

### Prasyarat

- Node.js
- npm
- Repository backend API Magang
- PostgreSQL yang telah dikonfigurasi untuk backend

### 1. Menjalankan Backend

Buka terminal pertama:

```bash
cd E:\Api-magang
npm install
npm run dev
```

Pastikan backend berjalan di:

```text
http://localhost:3000
```

### 2. Menjalankan Frontend

Buka terminal kedua:

```bash
cd E:\magang-web-ajeng
npm install
npm run dev
```

Buka alamat berikut melalui browser:

```text
http://localhost:5173
```

Frontend menggunakan proxy Vite untuk meneruskan request `/api` ke backend.

## Perintah yang Tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan |
| `npm run lint` | Memeriksa kode menggunakan Oxlint |
| `npx tsc -b` | Memeriksa tipe TypeScript |
| `npm run build` | Memeriksa tipe dan membangun aplikasi untuk produksi |
| `npm run preview` | Menjalankan pratinjau hasil build |

## Integrasi API

Frontend berkomunikasi dengan backend melalui endpoint API berikut:

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/api/v1/auth/login` | Login peserta |
| GET | `/api/v1/me/jurnal` | Mengambil jurnal peserta dengan pagination |
| POST | `/api/v1/jurnal` | Menambahkan jurnal |
| DELETE | `/api/v1/jurnal/:id` | Menghapus jurnal |

Seluruh komunikasi HTTP dikelola melalui `client.ts`, sehingga komponen frontend tidak memanggil `fetch` secara langsung.

## Pengelolaan Autentikasi

Access token disimpan di memori aplikasi menggunakan `setAccessToken`. Token tidak disimpan di `localStorage` maupun URL.

Konsekuensinya, ketika halaman dimuat ulang, sesi login akan berakhir dan pengguna perlu login kembali. Ketika pengguna melakukan logout, token dihapus dari memori aplikasi.

## Penanganan Error

Aplikasi menangani beberapa kondisi error dari API, antara lain:

- `401 Unauthorized`: menampilkan pesan bahwa email atau password salah pada proses login.
- `422 Validation Error`: menampilkan pesan validasi pada kolom formulir yang sesuai.
- `429 Rate Limited`: menampilkan pesan ketika terlalu banyak permintaan.
- `NETWORK_ERROR`: menampilkan pesan ketika koneksi ke server bermasalah.
- `BAD_RESPONSE`: menampilkan pesan ketika respons server tidak dikenali.

Error ditangani melalui utilitas pemetaan pesan agar pengguna tidak perlu melihat pesan teknis mentah dari server.

## Pembaruan Tipe API

Tipe TypeScript frontend mengikuti dokumentasi OpenAPI backend. Jika dokumentasi API mengalami perubahan, tipe frontend perlu diperbarui menggunakan perintah:

```bash
npm run api:types
```

Pastikan backend atau sumber dokumentasi OpenAPI tersedia sesuai konfigurasi perintah tersebut sebelum menjalankannya.

## Keputusan Desain

1. **Pemisahan komunikasi API.** Seluruh request HTTP ditempatkan pada lapisan API, sedangkan komponen berfokus pada tampilan dan interaksi pengguna.

2. **Penggunaan tipe TypeScript.** Data request dan response menggunakan tipe yang sesuai dengan kontrak API agar kesalahan penggunaan struktur data dapat diketahui saat pengembangan.

3. **Token disimpan di memori.** Access token tidak disimpan secara permanen di browser. Hal ini membuat pengguna perlu login kembali setelah halaman dimuat ulang.

4. **Status request menggunakan discriminated union.** Status loading, gagal, dan berhasil dibedakan agar setiap kondisi memiliki penanganan yang jelas.

5. **Pengambilan data menggunakan AbortController.** Request dapat dibatalkan ketika komponen tidak lagi membutuhkan hasilnya sehingga membantu mencegah respons lama memperbarui tampilan.

6. **Validasi dilakukan di frontend dan backend.** Validasi frontend membantu pengguna mengisi formulir dengan benar, sedangkan backend tetap menjadi penentu validitas data.

## Keterbatasan

- Pengguna perlu login kembali setelah halaman dimuat ulang karena access token hanya disimpan di memori.
- Aplikasi membutuhkan backend yang aktif untuk mengambil dan mengelola data jurnal.
- Fitur refresh token belum menjadi bagian dari mekanisme autentikasi frontend saat ini.

---

# Catatan Pembelajaran

Catatan pembelajaran Minggu 17, Minggu 18, dan Minggu 19 tetap dipertahankan di bagian bawah dokumen.
## Refleksi Minggu 20: Link vs Elemen a

Elemen `<a>` digunakan untuk berpindah halaman dengan memuat ulang seluruh dokumen. Akibatnya, JavaScript dijalankan kembali dari awal dan state aplikasi yang tersimpan di memori akan hilang. Karena token akses disimpan di dalam variabel pada `client.ts`, pemuatan ulang halaman membuat token kembali menjadi `null`, sehingga permintaan API berikutnya dapat menghasilkan error 401.

Sementara itu, `Link` dan `NavLink` dari React Router memungkinkan perpindahan halaman tanpa memuat ulang seluruh dokumen. Dengan begitu, state React dan token yang tersimpan di memori tetap terjaga.

Oleh karena itu, tautan untuk berpindah halaman di dalam aplikasi sebaiknya menggunakan `Link` atau `NavLink`, sedangkan elemen `<a>` digunakan untuk membuka tautan di luar aplikasi.