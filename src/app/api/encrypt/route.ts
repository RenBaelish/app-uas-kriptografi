import { NextResponse } from "next/server";
import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";

export async function POST(request: Request) {
  try {
    const { text, secretKey } = await request.json();

    if (!text || !secretKey) {
      return NextResponse.json(
        { error: "Text and secretKey are required" },
        { status: 400 }
      );
    }

    const key = crypto.createHash("sha256").update(secretKey).digest();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(text, "utf8");
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    const combinedBuffer = Buffer.concat([iv, encrypted]);
    const base64Data = combinedBuffer.toString("base64");

    return NextResponse.json({ encryptedText: base64Data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal melakukan enkripsi pesan." },
      { status: 500 }
    );
  }
}
