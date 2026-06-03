import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 1. GET: Mengambil data konten Beranda
export async function GET() {
  try {
    // Menggunakan upsert agar jika data kosong, otomatis terbuat data default & anti-error
    const beranda = await prisma.kontenBeranda.upsert({
      where: { id: "main-config" },
      update: {},
      create: {
        id: "main-config",
        videoUrl: "https://www.youtube.com/watch?v=example",
        visi: "Menjadikan HMBD sebagai wadah yang transformatif dan inovatif.",
        misi: "1. Mengembangkan potensi mahasiswa.\n2. Membangun sinergi internal.",
        namaKahim: "Nama Ketua Himpunan",
        fotoKahim: "https://placehold.co/400x600",
        namaWakahim: "Nama Wakil Ketua Himpunan",
        fotoWakahim: "https://placehold.co/400x600",
        namaPembimbing: "Nama Dosen Pembimbing",
        fotoPembimbing: "https://placehold.co/400x600",
      },
    });

    return NextResponse.json({ success: true, data: beranda }, { status: 200 });
  } catch (error) {
    console.error("Error fetching beranda:", error);
    return NextResponse.json({ success: false, message: "Gagal mengambil data beranda" }, { status: 500 });
  }
}

// 2. PUT: Mengubah/Update data konten Beranda (Dashboard Admin)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { videoUrl, visi, misi, namaKahim, fotoKahim, namaWakahim, fotoWakahim, namaPembimbing, fotoPembimbing } = body;

    // Validasi dasar
    if (!videoUrl || !visi || !misi || !namaKahim || !namaWakahim || !namaPembimbing) {
      return NextResponse.json({ success: false, message: "Semua kolom teks wajib diisi!" }, { status: 400 });
    }

    const berandaUpdated = await prisma.kontenBeranda.update({
      where: { id: "main-config" },
      data: {
        videoUrl,
        visi,
        misi,
        namaKahim,
        fotoKahim,
        namaWakahim,
        fotoWakahim,
        namaPembimbing,
        fotoPembimbing,
      },
    });

    return NextResponse.json({ success: true, message: "Konten Beranda berhasil diperbarui!", data: berandaUpdated }, { status: 200 });
  } catch (error) {
    console.error("Error updating beranda:", error);
    return NextResponse.json({ success: false, message: "Gagal memperbarui data beranda" }, { status: 500 });
  }
}
