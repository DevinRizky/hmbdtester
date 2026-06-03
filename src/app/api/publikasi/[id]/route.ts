import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// 1. GET: Ambil detail satu artikel berdasarkan ID (Untuk isi form edit)
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const artikel = await prisma.artikel.findUnique({
      where: { id },
    });

    if (!artikel) {
      return NextResponse.json({ success: false, message: "Artikel tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: artikel }, { status: 200 });
  } catch (error) {
    console.error("Error fetching detail artikel:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil detail artikel" }, { status: 500 });
  }
}

// 2. PUT: Update data artikel
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { judul, konten, bannerUrl, kategori, penulis } = body;

    if (!judul || !konten || !kategori || !bannerUrl) {
      return NextResponse.json({ success: false, message: "Semua kolom wajib diisi!" }, { status: 400 });
    }

    const slug = judul
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const artikelUpdated = await prisma.artikel.update({
      where: { id },
      data: {
        judul,
        slug,
        konten,
        bannerUrl,
        kategori: kategori.toUpperCase() as "BERITA" | "INSIGHT",
        penulis: penulis || "Humas HMBD",
      },
    });

    return NextResponse.json({ success: true, message: "Artikel berhasil diperbarui!", data: artikelUpdated }, { status: 200 });
  } catch (error) {
    console.error("Error updating artikel:", error);
    return NextResponse.json({ success: false, message: "Gagal memperbarui artikel" }, { status: 500 });
  }
}

// 3. DELETE: Hapus artikel berdasarkan ID
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    await prisma.artikel.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Artikel berhasil dihapus!" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting artikel:", error);
    return NextResponse.json({ success: false, message: "Gagal menghapus artikel" }, { status: 500 });
  }
}
