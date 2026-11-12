# Magang Web

Frontend untuk aplikasi API Magang yang dikembangkan menggunakan React, TypeScript, dan Vite. Proyek ini menampilkan halaman daftar jurnal peserta magang menggunakan data tiruan (dummy data).

## Teknologi

- React
- TypeScript
- Vite
- CSS Modules

## Menjalankan Project

Pastikan Node.js sudah terpasang, kemudian buka terminal di folder proyek dan jalankan:

```bash
npm install
npm run dev
```

Buka alamat `http://localhost:5173` melalui browser.

### Pemeriksaan Kode

Untuk memeriksa kualitas kode dan memastikan proyek dapat dibangun:

```bash
npm run lint
npm run build
```

## Struktur Folder

```text
src/
├── components/
│   ├── ui/          # Komponen UI generik
│   ├── jurnal/      # Komponen khusus jurnal
│   └── layout/      # Komponen tata letak
├── data/            # Data tiruan
├── types/           # Definisi tipe TypeScript
├── utils/           # Fungsi bantuan
├── App.tsx          # Penyusunan halaman utama
├── main.tsx
└── index.css
```

## Keputusan Desain

1. **Memisahkan komponen UI dan jurnal**  
   Komponen di folder `ui` dibuat agar dapat digunakan kembali tanpa bergantung pada fitur jurnal. Sementara itu, komponen di folder `jurnal` berisi tampilan dan fungsi yang khusus menangani data jurnal.

2. **Menggunakan TypeScript untuk tipe data**  
   Interface dan tipe union digunakan untuk menentukan bentuk data peserta, jurnal, dan status review. Hal ini membantu mendeteksi kesalahan tipe data sejak proses pengembangan.

3. **Menggunakan CSS Modules**  
   CSS Modules digunakan agar aturan CSS setiap komponen terpisah dan tidak mudah bertabrakan dengan komponen lain.

## Refleksi Minggu 17

### Imperatif dan Deklaratif

Pendekatan imperatif dilakukan dengan memberikan perintah kepada komputer secara bertahap, seperti membuat elemen dan menambahkan teks ke halaman. Sedangkan pendekatan deklaratif seperti React berfokus pada hasil tampilan yang diinginkan. React akan mengatur perubahan tampilan berdasarkan data yang diberikan.

### Pemisahan Frontend dan Backend

Frontend dan backend dibuat sebagai dua aplikasi terpisah karena memiliki fungsi yang berbeda. Backend bertugas mengolah dan menyediakan data dalam format JSON, sedangkan frontend bertugas menampilkan data kepada pengguna melalui browser. Keduanya berkomunikasi menggunakan HTTP sehingga dapat dikembangkan, diuji, dan dikelola secara terpisah.

### Mengapa Key Menggunakan ID, Bukan Indeks?

React menggunakan `key` untuk mengenali setiap item dalam daftar ketika data ditambahkan, dihapus, atau diurutkan ulang. ID lebih tepat digunakan karena setiap data memiliki identitas yang unik dan tetap. Sementara itu, indeks hanya menunjukkan posisi item dalam array sehingga bisa berubah ketika urutan data berubah.

## Refleksi Minggu 18: Kenapa Key Indeks Menimbulkan Bug

React menggunakan key untuk mengenali setiap elemen dalam daftar. Ketika menggunakan indeks sebagai key, penghapusan item pertama membuat item berikutnya menempati indeks yang sama. React dapat menganggap elemen tersebut masih sama dan menggunakan kembali elemen input beserta isinya. Akibatnya, teks yang saya ketik pada item pertama dapat berpindah ke item berikutnya. Dengan menggunakan key unik dan stabil seperti ID data, React dapat mengenali setiap item dengan benar.

## Alur Data dan Pengelolaan State

```text
App (tanpa state)
 └─ DaftarJurnalPage       state: jurnal
     ├─ Header              judul, namaPeserta
     ├─ RingkasanJurnal     jurnal
     ├─ Button "Pulihkan"   → setJurnal
     └─ DaftarJurnal        jurnal, onHapus, onUbahStatus
          └─ JurnalCard    jurnal, onHapus, onUbahStatus
               │           state lokal: terbuka
               └─ Button  → onHapus(id) / onUbahStatus(id, status)


## Minggu 18 — Kamis
### SOAL 9 — Efek atau Bukan?

Pada soal ini, saya mempelajari perbedaan antara data turunan (*derived data*), event handler, dan effect dalam React. Setiap proses harus ditempatkan sesuai dengan fungsinya agar pengelolaan state lebih sederhana dan tidak menimbulkan efek samping yang tidak diperlukan.

| No. | Kasus | Kategori | Alasan |
| --- | --- | --- | --- |
| a | Menghitung jumlah jurnal belum direview | Data turunan | Jumlah jurnal dapat dihitung langsung dari data yang tersedia menggunakan `filter()` dan `length`. |
| b | Mengosongkan form setelah jurnal berhasil disimpan | Event handler | Dilakukan sebagai bagian dari proses penyimpanan setelah pengguna menekan tombol Simpan. |
| c | Menyimpan jurnal ke localStorage setiap kali berubah | Effect | Menyinkronkan perubahan state jurnal dengan penyimpanan browser. |
| d | Mengatur judul tab sesuai jumlah jurnal | Effect | Mengubah `document.title` berdasarkan jumlah jurnal. |
| e | Menampilkan pesan "Berhasil disimpan" setelah tombol Simpan ditekan | Event handler | Pesan ditampilkan sebagai respons terhadap aksi pengguna setelah penyimpanan berhasil. |
| f | Mengurutkan daftar dari terbaru | Data turunan | Urutan jurnal dihitung dari data yang tersedia tanpa mengubah array state asli. |

### Contoh Penerapan

**1. Data turunan — menghitung jurnal belum direview**

```tsx
const jumlahBelum = jurnal.filter(
  (j) => j.statusReview === "belum"
).length;
```

**2. Event handler — mengosongkan form**

```tsx
function kirim() {
  // Proses penyimpanan jurnal
  setNilai(NILAI_AWAL);
}
```

**3. Effect — menyimpan jurnal ke localStorage**

```tsx
useEffect(() => {
  localStorage.setItem("jurnal-magang-v1", JSON.stringify(jurnal));
}, [jurnal]);
```

**4. Effect — mengatur judul tab**

```tsx
useEffect(() => {
  document.title = `Jurnal Magang (${jurnal.length})`;
}, [jurnal.length]);
```

**5. Event handler — menampilkan pesan berhasil**

```tsx
function simpan() {
  // Proses penyimpanan berhasil
  setPesan("Berhasil disimpan");
}
```

**6. Data turunan — mengurutkan jurnal terbaru**

```tsx
const jurnalTerurut = [...jurnal].sort(
  (a, b) =>
    new Date(b.createdAt).getTime() -
    new Date(a.createdAt).getTime()
);
```

### Kesimpulan

- **Data turunan:** digunakan untuk menghitung atau mengolah data yang sudah tersedia.
- **Event handler:** digunakan untuk menjalankan proses sebagai respons terhadap tindakan pengguna.
- **Effect:** digunakan untuk menyinkronkan React dengan sistem di luar React, seperti `localStorage` dan `document.title`.

Penggunaan `[...jurnal]` sebelum `sort()` diperlukan agar pengurutan tidak mengubah array state asli.