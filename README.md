# Secure Your Message

Secure Your Message is a stateless web utility for secure text encryption and decryption, implemented with Node.js, TypeScript, and the AES-256-CBC cryptographic standard.

## Features

- **Stateless Architecture**: No sensitive data is stored on a database.
- **AES-256-CBC**: Industry-standard encryption mode.
- **SHA-256 Key Normalization**: Ensures that all secret keys are exactly 32 bytes.
- **Random Initialization Vector (IV)**: Generates a 16-byte random IV for each encryption.
- **Base64 Encoding**: Provides a safe transmission format for the encrypted payloads.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Cryptography**: Native Node.js `crypto` module

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.
