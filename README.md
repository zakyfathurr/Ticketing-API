## Deskripsi Aplikasi
Studi Kasus:
API ini merupakan penghubung database tiket dengan sistem penjualan tiket untuk pertandingan Timnas Indonesia. API memungkinkan untuk melakukan CRUD pada table Customer dan Transaksi untuk pembelian tiket. Tiket yang tersedia terkait dengan zona dan kursi tertentu di stadion. 
Platform: 
• Backend/API: Node.js (menggunakan Express.js) 
• Database: PostgreSQL (relational database) 
alasan menggunakan Node.js dengan Express JS:
- memudahkan organisasi modul-modul dan memudahkan meng-handle masalah-masalah yang umum.
- memudahkan integrasi terhadap database postgreSQL hanya dengan ```npm i pg```

alasan menggunakan PostgreSQL
- postgre menggunakan relational database sehingga cocok dengan studi kasus yang menggunakan banyak tabel yang berelasi sehingga dapat menggunakan query JOIN.
- PostgreSQL menyediakan transaksi ACID sehingga dapat digunakan pada pembelian tiket di table transaksi.
- PostgreSQL dapat menggunakan Indexing sehingga dapat memgoptimalkan query.
### ERD
![image](https://github.com/user-attachments/assets/66699c6f-50cd-4b42-9eba-3d0d08cc1fd1)


## Fitur Utama (Operasi CRUD)
### Customer:
Create: Registrasi customer baru. 
Read: Melihat data customer. 
Update: Update data customer. 
Delete: Menghapus customer.

### Transaksi:
Create: Membuat transaksi baru ketika customer membeli tiket. 
Read: Melihat histori transaksi dari id_transaksi. 
Update: Update status transaksi (misalnya, pembayaran berhasil,pending atau gagal). 
Delete: penghapusan transaksi .

## Justifikasi pemilihan database
alasan menggunakan PostgreSQL
- postgre menggunakan relational database sehingga cocok dengan studi kasus yang menggunakan banyak tabel yang berelasi sehingga dapat menggunakan query JOIN.
- PostgreSQL menyediakan transaksi ACID sehingga dapat digunakan pada pembelian tiket di table transaksi.
- PostgreSQL dapat menggunakan Indexing sehingga dapat memgoptimalkan query.

## Fitur penting database
- menggunakan indexing pada kolom id_tiket,id_kursi dan NIK.
- menggunakan ACID transaction pada pembuatan transaksi baru.
- menggunakan fitur JOIN pada banyak table.