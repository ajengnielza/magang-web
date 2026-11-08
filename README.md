# magang-web

Frontend untuk API Magang yang dikembangkan menggunakan React, TypeScript, dan Vite.

## Teknologi

- React
- TypeScript
- Vite

## Menjalankan Project

Pastikan sudah berada di folder project, kemudian jalankan:

```bash
npm install
npm run dev
```

Buka alamat `http://localhost:5173` melalui browser.

## Refleksi Minggu 17

Pendekatan imperatif dilakukan dengan memberikan perintah kepada komputer secara bertahap, seperti membuat elemen dan menambahkan teks ke halaman. Sedangkan pendekatan deklaratif seperti React berfokus pada hasil tampilan yang diinginkan. React akan mengatur perubahan tampilan berdasarkan data yang diberikan.

Frontend dan backend dibuat sebagai dua aplikasi terpisah karena memiliki fungsi yang berbeda. Backend bertugas mengolah dan menyediakan data dalam format JSON, sedangkan frontend bertugas menampilkan data kepada pengguna melalui browser. Keduanya berkomunikasi menggunakan HTTP sehingga dapat dikembangkan, diuji, dan dikelola secara terpisah.

## Refleksi Minggu 17: Mengapa Key Menggunakan ID, Bukan Indeks?

React menggunakan `key` untuk mengenali setiap item dalam daftar ketika data ditambahkan, dihapus, atau diurutkan ulang. ID dari database lebih tepat digunakan karena setiap data memiliki identitas yang unik dan tetap. Sementara itu, indeks hanya menunjukkan posisi item dalam array sehingga bisa berubah ketika urutan data berubah. Jika menggunakan indeks, React berisiko menganggap item yang berbeda sebagai item yang sama, terutama ketika ada data yang dihapus atau dipindahkan.