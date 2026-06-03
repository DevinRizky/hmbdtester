import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Mengambil data statistik pendaftaran (Total, Pending, Lolos, Ditolak)
export async function GET() {
  try {
    // Jalankan query secara paralel agar super cepat
    const [total, pending, lolos, ditolak] = await Promise.all([
      prisma.pendaftar.count(),
      prisma.pendaftar.count({ where: { statusSeleksi: "PENDING" } }),
      prisma.pendaftar.count({ where: { statusSeleksi: "LOLOS" } }),
      prisma.pendaftar.count({ where: { statusSeleksi: "DITOLAK" } }),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: { total, pending, lolos, ditolak },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching rekrutmen stats:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil statistik rekrutmen" }, { status: 500 });
  }
}
