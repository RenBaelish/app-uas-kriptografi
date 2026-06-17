import { NextResponse } from "next/server";
import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";

export async function POST(request: Request) {
  try {
    const { encryptedText, secretKey } = await request.json();

    if (!encryptedText || !secretKey) {
      return NextResponse.json(
        { error: "encryptedText and secretKey are required" },
        { status: 400 }
      );
    }

    const key = crypto.createHash("sha256").update(secretKey).digest();
    const combinedBuffer = Buffer.from(encryptedText, "base64");

    if (combinedBuffer.length <= 16) {
      return NextResponse.json(
        { error: "Format encryptedText tidak valid." },
        { status: 400 }
      );
    }

    const iv = combinedBuffer.subarray(0, 16);
    const encryptedData = combinedBuffer.subarray(16);
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return NextResponse.json(
      { text: decrypted.toString("utf8") },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mendekripsi pesan. Pastikan secret key Anda benar dan pesan belum dimodifikasi." },
      { status: 400 }
    );
  }
}
