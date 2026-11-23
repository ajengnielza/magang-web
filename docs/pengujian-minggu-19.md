# Pengujian Minggu 19 — Coba Rusakkan Koneksiku

## Tujuan

Pengujian ini dilakukan untuk memastikan frontend Jurnal Magang dapat menangani berbagai kondisi tidak normal, seperti gangguan koneksi, respons error dari backend, input tidak valid, dan masalah autentikasi.

Pengujian dilakukan pada aplikasi frontend yang terhubung dengan REST API backend.

## Lingkungan Pengujian

| Komponen | Keterangan |
|---|---|
| Frontend | React, TypeScript, dan Vite |
| Backend | Node.js, Express, dan TypeScript |
| Database | PostgreSQL |
| Frontend URL | `http://localhost:5173/?jurnal-api` |
| API Base URL | `http://localhost:3000/api/v1` |
| Browser | Isi browser yang digunakan |
| Tanggal Pengujian | Isi tanggal pengujian |

## Daftar Skenario Pengujian

### 1. Backend Tidak Aktif

**Langkah pengujian:**
1. Matikan server backend.
2. Buka aplikasi frontend.
3. Coba memuat daftar jurnal atau melakukan penghapusan jurnal.

**Hasil yang diharapkan:**
- Aplikasi tidak mengalami crash.
- Pesan kesalahan yang mudah dipahami ditampilkan.
- Kode laporan ditampilkan jika tersedia.

**Hasil aktual:** Belum diuji.

**Status:** Belum diuji.

---

### 2. Koneksi Internet Lambat

**Langkah pengujian:**
1. Buka Developer Tools pada browser.
2. Pilih tab Network.
3. Ubah pengaturan koneksi menjadi Slow 4G.
4. Muat ulang daftar jurnal.

**Hasil yang diharapkan:**
- Aplikasi menampilkan status memuat selama request berlangsung.
- Data ditampilkan setelah respons diterima.
- Tidak terjadi perubahan data yang tidak sesuai.

**Hasil aktual:** Belum diuji.

**Status:** Belum diuji.

---

### 3. Klik Pagination Berulang Kali

**Langkah pengujian:**
1. Login menggunakan akun yang memiliki beberapa halaman jurnal.
2. Klik tombol Berikutnya beberapa kali dengan cepat.
3. Perhatikan data dan nomor halaman yang ditampilkan.

**Hasil yang diharapkan:**
- Data yang ditampilkan sesuai dengan halaman yang dipilih.
- Respons request lama tidak menimpa data dari request terbaru.
- Tidak terjadi error yang tidak tertangani.

**Hasil aktual:** Belum diuji.

**Status:** Belum diuji.

---

### 4. Login Menggunakan Password Salah

**Langkah pengujian:**
1. Buka halaman login.
2. Masukkan email yang benar.
3. Masukkan password yang salah.
4. Klik tombol Login.

**Hasil yang diharapkan:**
- Login ditolak oleh backend.
- Aplikasi menampilkan pesan email atau password salah.
- Pengguna tidak diarahkan ke halaman jurnal.

**Hasil aktual:** Login ditolak dan pesan kesalahan ditampilkan dengan benar.

**Status:** Berhasil.

---

### 5. Percobaan Login Berulang

**Langkah pengujian:**
1. Masukkan email dan password yang salah secara berulang.
2. Lanjutkan hingga backend memberikan respons pembatasan permintaan jika tersedia.
3. Perhatikan pesan yang ditampilkan aplikasi.

**Hasil yang diharapkan:**
- Backend membatasi permintaan sesuai konfigurasi rate limit.
- Aplikasi menangani respons `429`.
- Pesan kesalahan ditampilkan tanpa memperlihatkan detail teknis.

**Hasil aktual:** Belum diuji.

**Status:** Belum diuji.

---

### 6. Input Login Tidak Valid

**Langkah pengujian:**
1. Buka halaman login.
2. Masukkan email dengan format tidak valid.
3. Kosongkan password atau masukkan data yang tidak sesuai.
4. Klik tombol Login.

**Hasil yang diharapkan:**
- Validasi formulir berjalan.
- Pengguna mendapatkan informasi mengenai input yang harus diperbaiki.
- Request tidak dikirim jika validasi frontend gagal.

**Hasil aktual:** Belum diuji.

**Status:** Belum diuji.

---

### 7. Kegiatan Jurnal Terlalu Pendek

**Langkah pengujian:**
1. Login ke aplikasi.
2. Buka formulir penambahan jurnal.
3. Masukkan kegiatan dengan panjang kurang dari batas minimum.
4. Klik tombol Simpan.

**Hasil yang diharapkan:**
- Validasi menolak input yang terlalu pendek.
- Pesan validasi ditampilkan pada kolom kegiatan.
- Jurnal tidak disimpan.

**Hasil aktual:** Belum diuji.

**Status:** Belum diuji.

---

### 8. Link Commit Tidak Valid

**Langkah pengujian:**
1. Buka formulir penambahan jurnal.
2. Isi kegiatan dengan data yang valid.
3. Masukkan link commit dengan format URL yang tidak valid.
4. Klik tombol Simpan.

**Hasil yang diharapkan:**
- Validasi menolak link yang tidak sesuai.
- Pesan kesalahan ditampilkan pada kolom link commit.
- Jurnal tidak disimpan.

**Hasil aktual:** Belum diuji.

**Status:** Belum diuji.

---

### 9. Klik Tombol Simpan Berulang Kali

**Langkah pengujian:**
1. Buka formulir penambahan jurnal.
2. Isi semua data dengan benar.
3. Klik tombol Simpan ketika request sedang berjalan.
4. Perhatikan apakah tombol dapat ditekan kembali.

**Hasil yang diharapkan:**
- Tombol dinonaktifkan selama proses penyimpanan.
- Teks tombol berubah menjadi `Menyimpan...`.
- Tidak terjadi penambahan jurnal ganda.

**Hasil aktual:** Tombol dinonaktifkan selama proses penyimpanan dan tidak ditemukan duplikasi jurnal.

**Status:** Berhasil.

---

### 10. Token Tidak Valid

**Langkah pengujian:**
1. Login ke aplikasi.
2. Gunakan mekanisme pengujian untuk mengganti access token dengan token yang tidak valid.
3. Coba mengakses daftar jurnal.

**Hasil yang diharapkan:**
- Backend menolak request dengan status `401`.
- Aplikasi tidak menampilkan data yang tidak berhak diakses.
- Pengguna diarahkan untuk melakukan login kembali jika mekanisme tersebut diterapkan.

**Hasil aktual:** Belum diuji.

**Status:** Belum diuji.

---

### 11. Backend Mengirim Error 500

**Langkah pengujian:**
1. Siapkan simulasi respons HTTP 500 dari backend.
2. Lakukan request dari frontend.
3. Perhatikan pesan kesalahan yang ditampilkan.

**Hasil yang diharapkan:**
- Aplikasi tetap berjalan.
- Pesan kesalahan umum ditampilkan.
- Detail teknis internal backend tidak diperlihatkan kepada pengguna.

**Hasil aktual:** Belum diuji.

**Status:** Belum diuji.

---

### 12. Pemeriksaan Network dan Console

**Langkah pengujian:**
1. Buka Developer Tools.
2. Periksa tab Network selama login dan pengelolaan jurnal.
3. Periksa tab Console.
4. Amati request, response, dan pesan error.

**Hasil yang diharapkan:**
- Request menggunakan endpoint API yang sesuai.
- Access token tidak muncul pada URL.
- Tidak terdapat error JavaScript yang tidak tertangani.
- Tidak terdapat informasi sensitif yang dicetak ke Console.

**Hasil aktual:** Belum diuji.

**Status:** Belum diuji.

## Rekapitulasi Pengujian

| Status | Jumlah |
|---|---:|
| Berhasil | 2 |
| Gagal | 0 |
| Belum diuji | 10 |
| **Total** | **12** |

## Kesimpulan

Pengujian dilakukan untuk memeriksa ketahanan frontend ketika menghadapi gangguan koneksi, kesalahan input, kegagalan autentikasi, dan respons error dari backend.

Hasil pengujian akan digunakan untuk menemukan kekurangan aplikasi, memperbaiki perilaku yang belum sesuai, dan mendokumentasikan temuan selama proses pengembangan Minggu 19.