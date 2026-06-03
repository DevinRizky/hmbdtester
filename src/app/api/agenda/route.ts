import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. GET: Ambil semua daftar agenda untuk kalender proker
export async function GET() {
  try {
    const agenda = await prisma.kegiatan.findMany({
      orderBy: {
        tanggal: "asc", // Tanggal terdekat muncul paling atas
      },
    });
    return NextResponse.json({ success: true, data: agenda }, { status: 200 });
  } catch (error) {
    console.error("Error fetching agenda:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil data agenda" }, { status: 500 });
  }
}

// 2. POST: Tambah agenda/proker baru dari Dashboard Admin (handleAddAgenda)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { namaProker, deskripsi, tanggal, tempat, status, bannerUrl } = body;

    if (!namaProker || !deskripsi || !tanggal || !tempat || !status) {
      return NextResponse.json({ success: false, message: "Semua kolom wajib diisi!" }, { status: 400 });
    }

    const agendaBaru = await prisma.kegiatan.create({
      data: {
        namaProker,
        deskripsi,
        tanggal: new Date(tanggal),
        tempat,
        status: status.toUpperCase(),
        bannerUrl: bannerUrl || null,
      },
    });

    return NextResponse.json({ success: true, message: "Agenda berhasil ditambahkan!", data: agendaBaru }, { status: 201 });
  } catch (error) {
    console.error("Error creating agenda:", error);
    return NextResponse.json({ success: false, message: "Gagal menambahkan agenda" }, { status: 500 });
  }
}
