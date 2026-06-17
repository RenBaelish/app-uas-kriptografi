"use client";

import React, { useState } from "react";
import ButtonPrimary from "@/components/ui/ButtonPrimary";
import ButtonUtility from "@/components/ui/ButtonUtility";
import TextInput from "@/components/ui/TextInput";
import FeatureCard from "@/components/ui/FeatureCard";

export default function Home() {
  const [encryptText, setEncryptText] = useState("");
  const [encryptSecret, setEncryptSecret] = useState("");
  const [encryptResult, setEncryptResult] = useState("");
  const [encryptLoading, setEncryptLoading] = useState(false);
  const [encryptError, setEncryptError] = useState("");

  const [decryptText, setDecryptText] = useState("");
  const [decryptSecret, setDecryptSecret] = useState("");
  const [decryptResult, setDecryptResult] = useState("");
  const [decryptLoading, setDecryptLoading] = useState(false);
  const [decryptError, setDecryptError] = useState("");

  const handleEncrypt = async () => {
    setEncryptLoading(true);
    setEncryptError("");
    setEncryptResult("");

    try {
      const res = await fetch("/api/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: encryptText, secretKey: encryptSecret }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal melakukan enkripsi");

      setEncryptResult(data.encryptedText);
    } catch (err: any) {
      setEncryptError(err.message);
    } finally {
      setEncryptLoading(false);
    }
  };

  const handleDecrypt = async () => {
    setDecryptLoading(true);
    setDecryptError("");
    setDecryptResult("");

    try {
      const res = await fetch("/api/decrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          encryptedText: decryptText,
          secretKey: decryptSecret,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal melakukan dekripsi");

      setDecryptResult(data.text);
    } catch (err: any) {
      setDecryptError(err.message);
    } finally {
      setDecryptLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Disalin ke clipboard!");
  };

  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-secondary text-surface w-full py-24 px-6 sm:px-12 flex flex-col items-center justify-center text-center">
        <h1 className="text-display-1 text-white">Secure Your Message</h1>
        <p className="text-body-md mt-4 max-w-2xl opacity-90 text-white">
          Platform enkripsi dan dekripsi pesan rahasia menggunakan algoritma
          standar industri AES-256-CBC. Data Anda dikunci dengan aman.
        </p>
      </section>

      <section className="bg-canvas-soft flex-1 w-full flex justify-center py-16 px-6 sm:px-12">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <FeatureCard className="space-y-6">
            <div className="border-b border-hairline pb-4">
              <h2 className="text-heading-3 text-ink">Enkripsi Pesan</h2>
              <p className="text-caption text-ink-muted mt-1">
                Ubah teks biasa Anda menjadi cipher acak yang tidak dapat dibaca.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-[6px] w-full">
                <label className="text-eyebrow text-ink-muted uppercase">
                  Pesan Asli
                </label>
                <textarea
                  className="input-text w-full min-h-[120px] resize-y"
                  placeholder="Ketik pesan yang ingin Anda rahasiakan..."
                  value={encryptText}
                  onChange={(e) => setEncryptText(e.target.value)}
                />
              </div>

              <TextInput
                label="Secret Key"
                type="password"
                placeholder="Masukkan kata sandi pengaman..."
                value={encryptSecret}
                onChange={(e) => setEncryptSecret(e.target.value)}
              />

              <ButtonPrimary
                className="w-full mt-2"
                onClick={handleEncrypt}
                disabled={!encryptText || !encryptSecret || encryptLoading}
              >
                {encryptLoading ? "Memproses..." : "Enkripsi"}
              </ButtonPrimary>
            </div>

            {encryptError && (
              <p className="text-caption text-[#dd5b00]">{encryptError}</p>
            )}

            {encryptResult && (
              <div className="mt-6 p-4 bg-canvas-soft rounded-md border border-hairline space-y-3">
                <p className="text-eyebrow text-ink-muted uppercase">
                  Hasil Enkripsi (Base64)
                </p>
                <p className="text-body-sm text-ink break-all font-mono">
                  {encryptResult}
                </p>
                <div className="flex justify-end pt-2">
                  <ButtonUtility onClick={() => copyToClipboard(encryptResult)}>
                    Salin Hasil
                  </ButtonUtility>
                </div>
              </div>
            )}
          </FeatureCard>

          <FeatureCard className="space-y-6">
            <div className="border-b border-hairline pb-4">
              <h2 className="text-heading-3 text-ink">Dekripsi Pesan</h2>
              <p className="text-caption text-ink-muted mt-1">
                Kembalikan teks cipher ke pesan aslinya dengan secret key yang benar.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-[6px] w-full">
                <label className="text-eyebrow text-ink-muted uppercase">
                  Pesan Terenkripsi (Base64)
                </label>
                <textarea
                  className="input-text w-full min-h-[120px] resize-y"
                  placeholder="Tempel (paste) string Base64 di sini..."
                  value={decryptText}
                  onChange={(e) => setDecryptText(e.target.value)}
                />
              </div>

              <TextInput
                label="Secret Key"
                type="password"
                placeholder="Masukkan kata sandi pembuka..."
                value={decryptSecret}
                onChange={(e) => setDecryptSecret(e.target.value)}
              />

              <ButtonPrimary
                className="w-full mt-2"
                onClick={handleDecrypt}
                disabled={!decryptText || !decryptSecret || decryptLoading}
              >
                {decryptLoading ? "Memproses..." : "Dekripsi"}
              </ButtonPrimary>
            </div>

            {decryptError && (
              <p className="text-caption text-[#dd5b00]">{decryptError}</p>
            )}

            {decryptResult && (
              <div className="mt-6 p-4 bg-canvas-soft rounded-md border border-hairline space-y-3">
                <p className="text-eyebrow text-ink-muted uppercase">
                  Pesan Asli Terbongkar
                </p>
                <p className="text-body-md text-ink whitespace-pre-wrap">
                  {decryptResult}
                </p>
              </div>
            )}
          </FeatureCard>
        </div>
      </section>
    </main>
  );
}
