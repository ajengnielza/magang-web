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