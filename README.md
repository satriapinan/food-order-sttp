# 🍔 Food Order — Final Project

Halo semuanya! 👋

Selamat telah menyelesaikan kelas **React Beginner** bersama. Perjalanan dari nol hingga bisa membangun aplikasi React adalah sesuatu yang patut dibanggakan. Terima kasih sudah semangat belajar, bertanya, dan tidak menyerah ketika ada error 😄

Semoga ilmu yang didapat bisa menjadi bekal untuk terus berkembang. Ini bukan akhir, tapi awal dari perjalanan kalian sebagai developer. **Keep coding, keep learning!** 🚀

---

## 📋 Instruksi Final Project

Final project kalian adalah membangun aplikasi **Food Order** menggunakan React. Aplikasi ini mencakup semua materi yang sudah kita pelajari selama kelas.

### Fitur yang Harus Dibuat

1. **Halaman Login** — Form login dengan validasi menggunakan Formik & Yup
2. **Halaman Register** — Form registrasi user baru dengan validasi
3. **Halaman Food Order** — Menampilkan daftar menu makanan dari API, lengkap dengan:
   - 🔍 Search makanan berdasarkan nama
   - 📂 Filter berdasarkan kategori
   - 🔃 Sorting (harga terendah/tertinggi, nama A-Z)
   - 🛒 Tombol tambah ke keranjang

### Tech Stack

- **React** (Vite)
- **React Router** — untuk navigasi antar halaman
- **MUI (Material UI)** — untuk komponen UI
- **Formik + Yup** — untuk form handling & validasi
- **Axios** — untuk komunikasi dengan API
- **Context API** — untuk state management (Auth & Theme)

### ✅ Kriteria Penilaian

#### 1. Penggunaan Provider & Context API
- Menggunakan **AuthProvider** untuk mengelola state autentikasi (login, logout, data user)
- Menggunakan **ThemeProvider** untuk mengelola dark/light mode
- Provider membungkus seluruh aplikasi dengan benar

#### 2. Custom Hooks
- Menggunakan **custom hooks** (`useAuth`, `useTheme`) untuk mengakses context
- Tidak mengakses context secara langsung di komponen, melainkan melalui hooks

#### 3. Custom Component yang Reusable
- Membuat komponen-komponen reusable seperti (tidak wajib semua):
  - `AppButton` — tombol yang konsisten di seluruh aplikasi
  - `AppTextField` — input field dengan styling seragam
  - `AppSelect` — dropdown select yang reusable
  - `AppCard` — card wrapper yang bisa dipakai ulang
  - `AppSnackbar` — notifikasi/feedback untuk user
  - `AppLayout` — layout utama dengan navbar (toggle theme, logout, dll)
  - `FoodCard` — card untuk menampilkan data makanan
- Komponen harus menerima **props** dan bisa digunakan di berbagai halaman

#### 4. Form Handling & Validasi
- Menggunakan **Formik** untuk mengelola state form
- Menggunakan **Yup** untuk validasi (required, min length, dll)
- Menampilkan **pesan error** validasi dengan jelas di bawah input field

#### 5. Integrasi API
- Menggunakan **Axios** untuk melakukan request ke API
- Menggunakan **useEffect** untuk fetch data saat komponen dimount
- Menangani **loading state** dan **error handling** dengan baik

#### 6. Routing & Navigasi
- Menggunakan **React Router** untuk navigasi antar halaman
- Redirect setelah login berhasil ke halaman Food Order
- Navigasi antara halaman Login dan Register berjalan dengan baik

#### 7. Tampilan Responsive & Rapih
- Layout menyesuaikan di berbagai ukuran layar (desktop, tablet, mobile)
- Menggunakan **flexbox/grid** yang responsive
- Spacing, typography, dan warna konsisten di seluruh halaman
- Mendukung **dark mode & light mode** dengan tampilan yang tetap rapih di kedua mode

#### 8. Kualitas Kode
- Struktur folder rapi (`components/`, `pages/`, `hooks/`, `providers/`, `services/`)
- Penamaan file dan variabel jelas dan konsisten
- Tidak ada kode yang tidak terpakai atau di-comment tanpa alasan
- Setiap komponen memiliki tanggung jawab yang jelas (Single Responsibility)

### 📌 Butuh Contoh?

Jika kalian butuh referensi atau contoh implementasi, silakan lihat branch **`example`**:

```bash
git checkout example
```

Atau bisa langsung dilihat di GitHub:
👉 [Branch example](https://github.com/satriapinan/food-order-sttp/tree/example)

> **Catatan:** Branch `example` hanya untuk referensi. Pastikan kalian mengerjakan di branch masing-masing dan memahami setiap baris kode yang kalian tulis. Jangan hanya copy-paste! 😉

---

Sukses selalu untuk kalian semua! 💪
