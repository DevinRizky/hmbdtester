import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// 1. GET: Ambil semua artikel (Bisa difilter lewat ?kategori=BERITA atau ?kategori=INSIGHT)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("kategori");

    const queryOptions: Prisma.ArtikelFindManyArgs = {
      orderBy: {
        createdAt: "desc",
      },
    };

    if (kategori) {
      queryOptions.where = {
        kategori: kategori.toUpperCase() as "BERITA" | "INSIGHT",
      };
    }

    const artikel = await prisma.artikel.findMany(queryOptions);
    return NextResponse.json({ success: true, data: artikel }, { status: 200 });
  } catch (error) {
    console.error("Error fetching publikasi:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil data artikel" }, { status: 500 });
  }
}

// 2. POST: Membuat artikel berita/insight baru dari Admin
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { judul, konten, bannerUrl, kategori, penulis } = body;

    if (!judul || !konten || !kategori || !bannerUrl) {
      return NextResponse.json({ success: false, message: "Semua kolom wajib diisi!" }, { status: 400 });
    }

    const slug = judul
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const artikelBaru = await prisma.artikel.create({
      data: {
        judul,
        slug,
        konten,
        bannerUrl,
        kategori: kategori.toUpperCase() as "BERITA" | "INSIGHT",
        penulis: penulis || "Humas HMBD",
      },
    });

    return NextResponse.json({ success: true, message: "Artikel berhasil diterbitkan!", data: artikelBaru }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating artikel:", error);
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json({ success: false, message: "Judul artikel sudah pernah digunakan!" }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: "Gagal menerbitkan artikel" }, { status: 500 });
  }
}
