# Magang-web

Frontend untuk aplikasi API Magang yang digunakan untuk mengelola jurnal harian peserta magang. Proyek ini dikembangkan menggunakan React, TypeScript, dan Vite.

Saat ini aplikasi menggunakan data lokal melalui `localStorage` dan belum terhubung dengan API backend. Integrasi API direncanakan pada Minggu 19.

## Fitur

- Menampilkan daftar jurnal harian peserta magang.
- Menambahkan jurnal melalui formulir dengan validasi.
- Menghapus jurnal menggunakan konfirmasi dua langkah.
- Melakukan review jurnal dengan status Belum, Disetujui, dan Revisi.
- Mewajibkan catatan mentor ketika status review bukan Belum.
- Memfilter jurnal berdasarkan status.
- Mencari jurnal berdasarkan kegiatan dengan jeda 300 ms.
- Menampilkan ringkasan jumlah jurnal secara otomatis.
- Menyimpan data menggunakan `localStorage` agar tetap tersedia setelah halaman dimuat ulang.
- Mengubah judul tab berdasarkan jumlah jurnal.
- Menyediakan pintasan keyboard `/` untuk membuka pencarian.

## Teknologi

- React 19
- TypeScript 7
- Vite 8
- CSS Modules
- Oxlint
- Browser Local Storage

## Cara Menjalankan

Prasyarat: Node.js yang mendukung versi Vite pada proyek ini.

```bash
git clone https://github.com/USERNAME/magang-web.git
cd magang-web
npm install
npm run dev
```

Buka alamat `http://localhost:5173` melalui browser.

### Halaman Tambahan

- Galeri komponen: `http://localhost:5173/?galeri`
- Latihan state: `http://localhost:5173/?latihan`

### Perintah yang Tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan |
| `npm run lint` | Memeriksa kode menggunakan Oxlint |
| `npx tsc -b` | Memeriksa tipe TypeScript |
| `npm run build` | Memeriksa tipe dan membangun aplikasi untuk produksi |
| `npm run preview` | Menjalankan pratinjau hasil build |

## Struktur Folder

```text
src/
├── assets/                 # Aset gambar dan file statis
├── components/
│   ├── ui/                 # Komponen UI yang dapat digunakan kembali
│   ├── jurnal/             # Komponen khusus pengelolaan jurnal
│   ├── peserta/            # Komponen khusus peserta
│   └── layout/             # Komponen tata letak
├── data/                   # Data tiruan peserta dan jurnal
├── hooks/                  # Custom React hooks
├── latihan/                # Komponen dan latihan pembelajaran React
├── pages/                  # Halaman utama dan galeri komponen
├── types/                  # Definisi tipe TypeScript
├── utils/                  # Fungsi bantuan, validasi, dan type guard
├── App.tsx                 # Komponen utama aplikasi
├── main.tsx                # Titik masuk aplikasi React
└── index.css               # CSS global
```

## Keputusan Desain

1. **State ditempatkan pada komponen yang membutuhkan.** State `jurnal` dikelola di `DaftarJurnalPage` karena digunakan oleh beberapa komponen. Sementara itu, state konfirmasi hapus dikelola di `JurnalCard` karena hanya digunakan oleh kartu tersebut.

2. **Data turunan dihitung saat render.** Daftar jurnal yang sudah difilter, ringkasan jumlah jurnal, dan informasi hasil pencarian dihitung dari state yang tersedia. Dengan demikian, tidak ada state tambahan yang berpotensi memiliki nilai berbeda dari sumber data utama.

3. **Pembaruan array dan objek dilakukan secara immutable.** Operasi seperti menambah, menghapus, dan memperbarui jurnal menggunakan pola yang menghasilkan array baru, bukan mengubah state secara langsung.

4. **Data `localStorage` diperiksa menggunakan type guard.** Data hasil `JSON.parse` diperlakukan sebagai `unknown` dan diperiksa bentuknya sebelum digunakan. Data yang tidak valid akan ditolak dan aplikasi menggunakan data awal.

5. **Validasi formulir mengikuti aturan data jurnal.** Formulir memeriksa panjang kegiatan, catatan review, dan data lainnya sebelum menyimpan perubahan. Validasi frontend membantu pengguna, sedangkan backend tetap menjadi penentu validitas data setelah integrasi API.

6. **Effect digunakan untuk sinkronisasi eksternal.** Contohnya menyimpan perubahan jurnal ke `localStorage` dan memperbarui judul tab browser. Effect yang memasang event listener atau timer perlu memiliki cleanup.

## Alur Data dan Pengelolaan State

```text
App
└── DaftarJurnalPage
    ├── Header
    ├── RingkasanJurnal
    ├── FormJurnal
    └── DaftarJurnal
        └── JurnalCard
            └── FormReview
```

- `jurnal` dikelola pada `DaftarJurnalPage` sebagai sumber data utama.
- `RingkasanJurnal` menerima data jurnal melalui props.
- `DaftarJurnal` menerima daftar jurnal dan callback untuk menghapus serta memperbarui review.
- `JurnalCard` mengelola state lokal untuk konfirmasi penghapusan.
- `FormReview` mengelola input status dan catatan review.

## Keterbatasan

- Aplikasi belum terhubung dengan API backend.
- Data hanya tersimpan pada `localStorage` browser yang digunakan.
- Dua tab yang membuka aplikasi secara bersamaan berpotensi memiliki data yang tidak sinkron.
- ID jurnal masih dibuat di sisi frontend.
- Fokus keyboard setelah beberapa interaksi belum sepenuhnya dikembalikan ke elemen yang sebelumnya aktif.

---

# Catatan Pembelajaran

## Minggu 17

### 1. Imperatif dan Deklaratif

Pendekatan imperatif dilakukan dengan memberikan perintah kepada komputer secara bertahap, seperti membuat elemen dan menambahkan teks ke halaman. Sedangkan pendekatan deklaratif seperti React berfokus pada hasil tampilan yang diinginkan. React akan mengatur perubahan tampilan berdasarkan data yang diberikan.

### 2. Pemisahan Frontend dan Backend

Frontend dan backend dibuat sebagai dua aplikasi terpisah karena memiliki fungsi yang berbeda. Backend bertugas mengolah dan menyediakan data dalam format JSON, sedangkan frontend bertugas menampilkan data kepada pengguna melalui browser. Keduanya berkomunikasi menggunakan HTTP sehingga dapat dikembangkan, diuji, dan dikelola secara terpisah.

### 3. Mengapa Key Menggunakan ID, Bukan Indeks?

React menggunakan `key` untuk mengenali setiap item dalam daftar ketika data ditambahkan, dihapus, atau diurutkan ulang. ID lebih tepat digunakan karena setiap data memiliki identitas yang unik dan tetap. Sementara itu, indeks hanya menunjukkan posisi item dalam array sehingga bisa berubah ketika urutan data berubah.

## Minggu 18

### 1. Kenapa Key Indeks Menimbulkan Bug?

React menggunakan key untuk mengenali setiap elemen dalam daftar. Ketika menggunakan indeks sebagai key, penghapusan item pertama membuat item berikutnya menempati indeks yang sama. React dapat menganggap elemen tersebut masih sama dan menggunakan kembali elemen input beserta isinya. Akibatnya, teks yang diketik pada item pertama dapat berpindah ke item berikutnya. Dengan menggunakan key unik dan stabil seperti ID data, React dapat mengenali setiap item dengan benar.

### 2. Efek atau Bukan? (Kamis, Soal 9)

Pada soal ini, saya mempelajari perbedaan antara data turunan (*derived data*), event handler, dan effect dalam React. Setiap proses harus ditempatkan sesuai dengan fungsinya agar pengelolaan state lebih sederhana dan tidak menimbulkan efek samping yang tidak diperlukan.

| No. | Kasus | Kategori | Alasan |
|---|---|---|---|
| a | Menghitung jumlah jurnal belum direview | Data turunan | Jumlah jurnal dapat dihitung langsung dari data yang tersedia menggunakan `filter()` dan `length`. |
| b | Mengosongkan form setelah jurnal berhasil disimpan | Event handler | Dilakukan sebagai bagian dari proses penyimpanan setelah pengguna menekan tombol Simpan. |
| c | Menyimpan jurnal ke localStorage setiap kali berubah | Effect | Menyinkronkan perubahan state jurnal dengan penyimpanan browser. |
| d | Mengatur judul tab sesuai jumlah jurnal | Effect | Mengubah `document.title` berdasarkan jumlah jurnal. |
| e | Menampilkan pesan berhasil disimpan setelah tombol Simpan ditekan | Event handler | Pesan ditampilkan sebagai respons terhadap aksi pengguna setelah penyimpanan berhasil. |
| f | Mengurutkan daftar dari terbaru | Data turunan | Urutan jurnal dihitung dari data yang tersedia tanpa mengubah array state asli. |

#### Contoh Penerapan

**Data turunan — menghitung jurnal belum direview**

```tsx
const jumlahBelum = jurnal.filter(
  (j) => j.statusReview === "belum"
).length;
```

**Event handler — mengosongkan form**

```tsx
function kirim() {
  // Proses penyimpanan jurnal
  setNilai(NILAI_AWAL);
}
```

**Effect — menyimpan jurnal ke localStorage**

```tsx
useEffect(() => {
  localStorage.setItem("jurnal-magang-v1", JSON.stringify(jurnal));
}, [jurnal]);
```

**Effect — mengatur judul tab**

```tsx
useEffect(() => {
  document.title = `Jurnal Magang (${jurnal.length})`;
}, [jurnal.length]);
```

**Event handler — menampilkan pesan berhasil**

```tsx
function simpan() {
  // Proses penyimpanan berhasil
  setPesan("Berhasil disimpan");
}
```

**Data turunan — mengurutkan jurnal terbaru**

```tsx
const jurnalTerurut = [...jurnal].sort(
  (a, b) =>
    new Date(b.createdAt).getTime() -
    new Date(a.createdAt).getTime()
);
```

### 3. Kesimpulan

- **Data turunan:** digunakan untuk menghitung atau mengolah data yang sudah tersedia.
- **Event handler:** digunakan untuk menjalankan proses sebagai respons terhadap tindakan pengguna.
- **Effect:** digunakan untuk menyinkronkan React dengan sistem di luar React, seperti `localStorage` dan `document.title`.

Penggunaan `[...jurnal]` sebelum `sort()` diperlukan agar pengurutan tidak mengubah array state asli.
