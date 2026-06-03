import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// 1. PUT: Update data agenda berdasarkan ID
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { namaProker, deskripsi, tanggal, tempat, status, bannerUrl } = body;

    if (!namaProker || !deskripsi || !tanggal || !tempat || !status) {
      return NextResponse.json({ success: false, message: "Semua kolom wajib diisi!" }, { status: 400 });
    }

    const agendaUpdated = await prisma.kegiatan.update({
      where: { id },
      data: {
        namaProker,
        deskripsi,
        tanggal: new Date(tanggal),
        tempat,
        status: status.toUpperCase(),
        bannerUrl: bannerUrl || null,
      },
    });

    return NextResponse.json({ success: true, message: "Agenda berhasil diperbarui!", data: agendaUpdated }, { status: 200 });
  } catch (error) {
    console.error("Error updating agenda:", error);
    return NextResponse.json({ success: false, message: "Gagal memperbarui agenda" }, { status: 500 });
  }
}

// 2. DELETE: Hapus agenda berdasarkan ID (handleDeleteAgenda)
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    await prisma.kegiatan.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Agenda berhasil dihapus!" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting agenda:", error);
    return NextResponse.json({ success: false, message: "Gagal menghapus agenda" }, { status: 500 });
  }
}
