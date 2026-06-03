import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// 1. GET: Mengambil seluruh anggota kabinet (Bisa difilter per kementerian)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const kementerian = searchParams.get("kementerian"); // Contoh: /api/kabinet?kementerian=KOMINFO

    // Menggunakan tipe data bawaan Prisma agar type-safe
    const queryOptions: Prisma.FungsionarisFindManyArgs = {
      orderBy: {
        createdAt: "asc", // Urutan berdasarkan waktu input
      },
    };

    if (kementerian) {
      queryOptions.where = {
        kementerian: kementerian, // Menyesuaikan dengan string di database (bisa disesuaikan case-sensitive-nya)
      };
    }

    const fungsionaris = await prisma.fungsionaris.findMany(queryOptions);

    return NextResponse.json({ success: true, data: fungsionaris }, { status: 200 });
  } catch (error) {
    console.error("Error fetching kabinet:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil data fungsionaris" }, { status: 500 });
  }
}

// 2. POST: Menambah fungsionaris baru (Dashboard Admin)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nama, nim, jabatan, kementerian, fotoUrl, periode } = body;

    // Validasi kolom wajib sesuai model schema.prisma kamu
    if (!nama || !nim || !jabatan || !kementerian || !fotoUrl) {
      return NextResponse.json({ success: false, message: "Nama, NIM, Jabatan, Kementerian, dan Foto wajib diisi!" }, { status: 400 });
    }

    // Menyimpan data sesuai dengan struktur model Fungsionaris asli
    const fungsionarisBaru = await prisma.fungsionaris.create({
      data: {
        nama,
        nim,
        jabatan,
        kementerian,
        fotoUrl,
        periode: periode || "2026",
      },
    });

    return NextResponse.json({ success: true, message: "Fungsionaris berhasil ditambahkan!", data: fungsionarisBaru }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating fungsionaris:", error);

    // Validasi error tanpa menggunakan 'any'
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json({ success: false, message: "Fungsionaris dengan NIM tersebut sudah terdaftar!" }, { status: 400 });
    }

    return NextResponse.json({ success: false, message: "Gagal menambahkan fungsionaris" }, { status: 500 });
  }
}
