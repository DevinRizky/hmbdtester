import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. GET: Mengambil semua daftar foto di galeri dokumentasi
export async function GET() {
  try {
    const galeri = await prisma.galeri.findMany({
      orderBy: {
        createdAt: "desc", // Foto terbaru yang diunggah muncul paling awal
      },
    });
    return NextResponse.json({ success: true, data: galeri }, { status: 200 });
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil data galeri" }, { status: 500 });
  }
}

// 2. POST: Menambah foto dokumentasi baru (handleAddGallery)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { caption, imageUrl } = body;

    if (!caption || !imageUrl) {
      return NextResponse.json({ success: false, message: "Caption dan URL Gambar wajib diisi!" }, { status: 400 });
    }

    const fotoBaru = await prisma.galeri.create({
      data: {
        caption,
        imageUrl,
      },
    });

    return NextResponse.json({ success: true, message: "Foto berhasil ditambahkan ke galeri!", data: fotoBaru }, { status: 201 });
  } catch (error) {
    console.error("Error creating galeri:", error);
    return NextResponse.json({ success: false, message: "Gagal menambahkan foto ke galeri" }, { status: 500 });
  }
}
