# Damessa - API Manajemen Produk & Kategori

Proyek ini adalah REST API untuk Mini Project Backend Developer, dibangun menggunakan Node.js, Express.js, Sequelize, dan MySQL. API ini mengelola data Pengguna (User), Kategori (Category), dan Produk (Product) dengan Clean Architecture yang modular.

## Fitur Utama
- **Authentication & Security**: Registrasi dan login aman menggunakan JWT (JSON Web Tokens) dan password hashing dengan `bcrypt`.
- **User Management**: Endpoint untuk mendaftarkan dan login pengguna.
- **CRUD Kategori**: Membuat, membaca, mengubah, dan menghapus (soft delete) kategori produk.
- **CRUD Produk**: Membuat, membaca, mengubah, dan menghapus (soft delete) data produk.
- **Fitur Tambahan (Bonus)**:
    - **Pagination**: Mendukung parameter `?page=...&limit=...` untuk daftar produk.
    - **Filter**: Mendukung filter berdasarkan nama kategori dengan `?category=...`.
    - **Logging**: Semua request ke server dicatat di konsol (mode development) menggunakan `morgan`.
- **Clean Architecture**: Pemisahan jelas antara `Controllers`, `Services`, dan `Repositories`.
- **Input Validation**: Menggunakan `Zod` untuk memvalidasi semua data masuk sebelum diproses.
- **Centralized Error Handling**: Penanganan error global yang konsisten.

---

## Struktur Folder

Struktur folder berbasis fitur yang modular memudahkan proses development dan maintenance.

```
src/
├── config/          # Konfigurasi environment & database
├── database/        # Model Sequelize, migrasi, dan seeder
│   ├── models/
│   ├── migrations/
│   └── seeders/
├── modules/         # Modul berbasis fitur
│   ├── users/       # Authentication & pengguna
│   ├── categories/  # CRUD kategori
│   └── products/    # CRUD produk
├── middlewares/     # Middleware kustom (auth, error handling, validation)
├── utils/           # Fungsi helper
├── types/           # Deklarasi tipe TypeScript kustom
├── app.ts           # Inisialisasi Express & routing utama
└── server.ts        # Entry point server (bootstrap)
```

---

## Teknologi & Library
- **Framework**: Node.js, Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Bahasa**: TypeScript
- **Validation**: Zod
- **Authentication**: JSON Web Token (`jsonwebtoken`) & `bcrypt`
- **Lain-lain**: `dotenv`, `cors`, `helmet`, `morgan`, `ts-node-dev`, `eslint`, `prettier`

---

## Instalasi & Menjalankan Aplikasi

### Requirements
- Node.js (disarankan v18+)
- NPM atau Yarn
- MySQL Server

### Langkah Instalasi
1.  **Clone repository:**
    ```bash
    git clone https://github.com/tioirawan/damessa-backend-project
    cd damessa-backend-project
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment:**
    - Salin file `.env.example` menjadi `.env`.
      ```bash
      cp .env.example .env
      ```
    - Sesuaikan konfigurasi database dan JWT di dalam file `.env` yang baru dibuat.
      ```env
      NODE_ENV=development
      PORT=3000

      DB_HOST=localhost
      DB_PORT=3306
      DB_USER=root
      DB_PASSWORD=
      DB_NAME=damessa_db

      JWT_SECRET=secret
      JWT_EXPIRES_IN=86400 # 1 hari dalam detik
      ```

4.  **Buat Database di MySQL:**
    Jalankan perintah SQL berikut di MySQL client.
    ```sql
    CREATE DATABASE damessa_db;
    ```

5.  **Jalankan Database Migration:**
    Perintah ini akan membuat semua tabel yang dibutuhkan (`Users`, `Categories`, `Products`).
    ```bash
    npm run db:migrate
    ```

6.  **Menjalankan Aplikasi:**
    - Untuk mode development dengan auto-reload:
      ```bash
      npm run dev
      ```
    - Server akan berjalan di `http://localhost:3000`.

---

## Testing dengan Postman

Untuk memudahkan testing API, file **Postman Collection** dapat diakses pada
- **File**: `Damessa API.postman_collection.json`

---

## Dokumentasi API (Endpoints)

Semua endpoint, kecuali `/register` dan `/login`, memerlukan **Authorization Header**.
- **Key**: `Authorization`
- **Value**: `Bearer <token_jwt>`

### Auth Module
- `POST /api/v1/auth/register` - Mendaftarkan pengguna baru.
- `POST /api/v1/auth/login` - Login untuk mendapatkan token JWT.

### Category Module (Auth Required)
- `POST /api/v1/categories` - Membuat kategori baru.
- `GET /api/v1/categories` - Mendapatkan semua kategori.
- `GET /api/v1/categories/:id` - Mendapatkan detail satu kategori.
- `PUT /api/v1/categories/:id` - Mengubah nama kategori.
- `DELETE /api/v1/categories/:id` - Menghapus (soft delete) kategori.

### Product Module (Auth Required)
- `POST /api/v1/products` - Membuat produk baru.
- `GET /api/v1/products` - Mendapatkan semua produk.
  - Query Params (Opsional): `?page=1&limit=10&category=NamaKategori`
- `GET /api/v1/products/:id` - Mendapatkan detail satu produk.
- `PUT /api/v1/products/:id` - Mengubah data produk.
- `DELETE /api/v1/products/:id` - Menghapus (soft delete) produk.

---

## Kesimpulan
Proyek ini dibangun dengan mengikuti panduan pada dokumen yang diberikan. Beberapa fitur tambahan seperti pagination, filter, dan logging telah diimplementasikan untuk meningkatkan fungsionalitas API dan memenuhi kriteria penilaian.
