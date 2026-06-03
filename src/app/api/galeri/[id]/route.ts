import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// DELETE: Menghapus foto dari galeri berdasarkan ID
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    await prisma.galeri.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Foto berhasil dihapus dari galeri!" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting galeri:", error);
    return NextResponse.json({ success: false, message: "Gagal menghapus foto dari galeri" }, { status: 500 });
  }
}
