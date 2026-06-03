import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// 1. GET: Ambil detail satu fungsionaris (Untuk form edit)
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const fungsionaris = await prisma.fungsionaris.findUnique({
      where: { id },
    });

    if (!fungsionaris) {
      return NextResponse.json({ success: false, message: "Fungsionaris tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: fungsionaris }, { status: 200 });
  } catch (error) {
    console.error("Error fetching detail fungsionaris:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil detail fungsionaris" }, { status: 500 });
  }
}

// 2. PUT: Update data fungsionaris kabinet
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nama, nim, jabatan, kementerian, fotoUrl, periode } = body;

    if (!nama || !nim || !jabatan || !kementerian || !fotoUrl) {
      return NextResponse.json({ success: false, message: "Kolom wajib diisi semua!" }, { status: 400 });
    }

    const fungsionarisUpdated = await prisma.fungsionaris.update({
      where: { id },
      data: {
        nama,
        nim,
        jabatan,
        kementerian,
        fotoUrl,
        periode: periode || "2026",
      },
    });

    return NextResponse.json({ success: true, message: "Data fungsionaris berhasil diperbarui!", data: fungsionarisUpdated }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating fungsionaris:", error);

    // Cek jika NIM yang diedit bentrok/duplikat dengan orang lain
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json({ success: false, message: "NIM tersebut sudah terdaftar pada pengurus lain!" }, { status: 400 });
    }

    return NextResponse.json({ success: false, message: "Gagal memperbarui data fungsionaris" }, { status: 500 });
  }
}

// 3. DELETE: Hapus fungsionaris dari kabinet (handleDeleteKabinet)
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    await prisma.fungsionaris.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Fungsionaris berhasil dihapus dari kabinet!" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting fungsionaris:", error);
    return NextResponse.json({ success: false, message: "Gagal menghapus fungsionaris" }, { status: 500 });
  }
}
