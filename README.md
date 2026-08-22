# 🍔 Food Order

Food Order adalah aplikasi pemesanan makanan berbasis web yang dibangun menggunakan **React.js**. Aplikasi ini memungkinkan pengguna melihat menu makanan, menambahkan makanan ke keranjang, dan melakukan pemesanan.

## ✨ Fitur

* 🍽️ Menampilkan daftar makanan
* 🔎 Mencari makanan
* 🏷️ Filter berdasarkan kategori
* 🛒 Menambahkan makanan ke keranjang
* ➕ Menambah dan mengurangi jumlah pesanan
* 💰 Menghitung total harga
* 📦 Membuat pesanan
* 📋 Melihat detail pesanan
* 📱 Responsive untuk berbagai ukuran layar

## 🛠️ Teknologi

* React.js
* JavaScript
* HTML5
* CSS3
* Vite
* Axios
* React Router

> Sesuaikan daftar teknologi dengan library yang benar-benar digunakan dalam project.

## 📋 Persyaratan

Pastikan sudah menginstall:

* Node.js
* NPM
* Git

Untuk mengecek:

```bash id="q1h7xk"
node -v
npm -v
git --version
```

## 🚀 Instalasi

### 1. Clone repository

```bash id="y4s8vz"
git clone https://github.com/indratjgnoc/food-order.git
```

Masuk ke folder project:

```bash id="7k3f2m"
cd food-order
```

### 2. Install dependency

```bash id="f8x2kd"
npm install
```

### 3. Konfigurasi Environment

Jika project menggunakan environment variable, buat file:

```text id="p6w9na"
.env
```

Contoh:

```env id="m4z2qp"
VITE_API_URL=http://localhost:8000/api
```

> Jangan upload `.env` ke GitHub jika berisi API key, token, password, atau informasi sensitif.

Gunakan `.env.example` sebagai template:

```env id="v7k3rc"
VITE_API_URL=
```

### 4. Jalankan Project

Untuk development:

```bash id="b9x4mt"
npm run dev
```

Setelah itu buka alamat yang diberikan oleh Vite, biasanya:

```text id="r2n8vf"
http://localhost:5173
```

## 📁 Struktur Project

```text id="c5w1hz"
food-order/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

> Struktur folder dapat berbeda tergantung struktur project yang kamu gunakan.

## ▶️ Menjalankan Build Production

Untuk membuat build production:

```bash id="s6k2qx"
npm run build
```

Untuk melihat hasil build:

```bash id="w8v4pd"
npm run preview
```

## 🔐 Environment Variable

Environment variable disimpan di file `.env` dan **tidak disarankan untuk di-push ke GitHub**.

Tambahkan `.env` ke `.gitignore`:

```gitignore id="e4n9kc"
.env
.env.local
.env.production
```

Kemudian gunakan `.env.example`:

```env id="a1d7qm"
VITE_API_URL=
```

## 📡 API

Jika aplikasi terhubung dengan backend API, URL API dapat dikonfigurasi melalui:

```env id="u3r8pf"
VITE_API_URL=http://localhost:8000/api
```

Contoh penggunaan:

```javascript id="k5m2vx"
const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/foods`
);
```

## 🧑‍💻 Development

Jalankan:

```bash id="z9c4wn"
npm install
npm run dev
```

Setiap perubahan pada source code akan otomatis diperbarui oleh Vite selama development.

## 📄 License

Project ini dibuat untuk keperluan pembelajaran dan pengembangan aplikasi Food Order.

