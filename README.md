# 🍰 ScanCake

> **Cute outside. Security underneath.**

ScanCake adalah project yang sedang dikembangkan untuk membuat **platform web security reconnaissance** yang mengintegrasikan berbagai security tools dalam satu antarmuka.

Project ini dibuat untuk mengeksplorasi bagaimana berbagai command-line security tools dapat diintegrasikan ke dalam workflow yang lebih terstruktur dan mudah digunakan.

## 🎯 Tujuan

ScanCake ingin menyediakan satu workspace untuk melakukan berbagai aktivitas reconnaissance tanpa harus berpindah-pindah antarmuka.

Konsep yang ingin dibangun:

**Discover → Understand → Secure**

## 🔎 Reconnaissance Toolkit

Rencana tools yang akan diintegrasikan:

| Tools         | Fokus                       | Status          |
| ------------- | --------------------------- | --------------- |
| **WhatWeb**   | Technology Fingerprinting   | 🟢 Dikembangkan |
| **httpx**     | HTTP Probing                | 🟡 Direncanakan |
| **Subfinder** | Subdomain Discovery         | 🟡 Direncanakan |
| **Nmap**      | Network & Service Discovery | 🟡 Direncanakan |
| **ffuf**      | Web Content Discovery       | 🟡 Direncanakan |

> Status fitur dapat berubah selama proses pengembangan.

## ✨ Saat Ini

Pengembangan ScanCake dimulai dari integrasi **WhatWeb** sebagai security reconnaissance engine.

Fitur yang sedang dikembangkan meliputi:

* Antarmuka web untuk menjalankan WhatWeb
* Technology fingerprinting
* Tampilan hasil scan yang terstruktur
* Riwayat hasil scanning
* Pemisahan engine berdasarkan fungsi

Engine lainnya akan ditambahkan secara bertahap.

## 🏗️ Rencana Pengembangan

```text
ScanCake
│
├── WhatWeb
│   └── Technology Fingerprinting
│
├── httpx
│   └── HTTP Probing
│
├── Subfinder
│   └── Subdomain Discovery
│
├── Nmap
│   └── Network Discovery
│
├── ffuf
│   └── Content Discovery
│
└── History
    └── Unified Scan History
```

## 🛠️ Teknologi

Saat ini ScanCake menggunakan teknologi seperti:

* Next.js
* TypeScript
* Tailwind CSS
* WhatWeb

Teknologi dan security tools lainnya akan ditambahkan sesuai perkembangan project.

## 📚 Tentang Project

ScanCake merupakan project pembelajaran dan pengembangan yang berfokus pada:

* Security reconnaissance
* Web security
* Integrasi command-line tools
* API dan backend process execution
* Result parsing
* Web interface development
* Security tooling workflow

ScanCake **bukan pengganti dari tools yang diintegrasikan**, tetapi merupakan antarmuka dan integration layer untuk membantu mengorganisasi penggunaannya.

## ⚠️ Penggunaan Bertanggung Jawab

ScanCake ditujukan untuk pembelajaran, penelitian keamanan, dan pengujian yang memiliki izin.

Gunakan tools hanya terhadap sistem, website, jaringan, atau aplikasi yang kamu miliki atau memiliki izin untuk mengujinya.

## 🚧 Status

**Work in Progress**

ScanCake masih dalam tahap pengembangan dan belum seluruh fitur yang direncanakan tersedia.

---

🍰 **ScanCake — Cute outside. Security underneath.**
