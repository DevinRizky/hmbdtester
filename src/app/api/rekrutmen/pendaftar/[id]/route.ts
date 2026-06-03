import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. GET: Ambil detail profil satu pendaftar
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // Tulis langsung di sini
) {
  try {
    const { id } = await params;
    const pendaftar = await prisma.pendaftar.findUnique({
      where: { id },
      include: { event: true },
    });

    if (!pendaftar) {
      return NextResponse.json({ success: false, message: "Pendaftar tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: pendaftar }, { status: 200 });
  } catch (error) {
    console.error("Error fetching detail pendaftar:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil detail pendaftar" }, { status: 500 });
  }
}

// 2. PUT: Update status seleksi pendaftar (Pending -> Lolos / Tolak)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // Tulis langsung di sini
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { statusSeleksi } = body;

    if (!statusSeleksi) {
      return NextResponse.json({ success: false, message: "Status seleksi wajib dikirim!" }, { status: 400 });
    }

    const pendaftarUpdated = await prisma.pendaftar.update({
      where: { id },
      data: {
        statusSeleksi: statusSeleksi.toUpperCase(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Status pendaftar berhasil diubah menjadi ${statusSeleksi}!`,
        data: pendaftarUpdated,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating status pendaftar:", error);
    return NextResponse.json({ success: false, message: "Gagal mengubah status pendaftar" }, { status: 500 });
  }
}
