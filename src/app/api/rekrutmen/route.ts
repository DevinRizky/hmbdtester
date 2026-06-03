import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Mengambil semua data pendaftar rekrutmen
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    // Filter berdasarkan eventId jika ada di query params
    const whereClause = eventId ? { eventId } : {};

    const pendaftar = await prisma.pendaftar.findMany({
      where: whereClause,
      include: {
        event: true, // Menyertakan data OprecEvent terkait jika relasinya ada
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: pendaftar }, { status: 200 });
  } catch (error) {
    console.error("Error fetching pendaftar:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil data pendaftar dari database" }, { status: 500 });
  }
}
