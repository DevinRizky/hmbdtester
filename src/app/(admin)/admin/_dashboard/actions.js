"use server";

import { revalidatePath } from "next/cache";
// Nanti di sini tempat import supabase client server-side
// import { createClient } from "@/utils/supabase/server";

/**
 * ─── MODUL AGENDA & KEGIATAN ───
 */
export async function addAgenda(data) {
  try {
    console.log("Menyimulasikan tambah agenda:", data);

    // TODO: Integrasi Supabase nanti
    // const supabase = await createClient();
    // const { data: res, error } = await supabase.from("agenda").insert([data]);
    // if (error) throw error;

    revalidatePath("/admin/dashboard");
    return { success: true, message: "Agenda berhasil ditambahkan!" };
  } catch (error) {
    console.error("Gagal menambahkan agenda:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteAgenda(id) {
  try {
    console.log("Menyimulasikan hapus agenda ID:", id);

    revalidatePath("/admin/dashboard");
    return { success: true, message: "Agenda berhasil dihapus!" };
  } catch (error) {
    console.error("Gagal menghapus agenda:", error);
    return { success: false, error: error.message };
  }
}

/**
 * ─── MODUL PUBLIKASI & ARTIKEL ───
 */
export async function addArticle(data) {
  try {
    console.log("Menyimulasikan tambah artikel:", data);

    revalidatePath("/admin/dashboard");
    return { success: true, message: "Artikel berhasil diterbitkan!" };
  } catch (error) {
    console.error("Gagal menambahkan artikel:", error);
    return { success: false, error: error.message };
  }
}

export async function updateArticle(id, data) {
  try {
    console.log(`Menyimulasikan update artikel ID: ${id}`, data);

    revalidatePath("/admin/dashboard");
    return { success: true, message: "Artikel berhasil diperbarui!" };
  } catch (error) {
    console.error("Gagal memperbarui artikel:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteArticle(id) {
  try {
    console.log("Menyimulasikan hapus artikel ID:", id);

    revalidatePath("/admin/dashboard");
    return { success: true, message: "Artikel berhasil dihapus!" };
  } catch (error) {
    console.error("Gagal menghapus artikel:", error);
    return { success: false, error: error.message };
  }
}

/**
 * ─── MODUL FUNGSIONARIS KABINET ───
 */
export async function addKabinetMember(data) {
  try {
    console.log("Menyimulasikan tambah anggota kabinet:", data);

    revalidatePath("/admin/dashboard");
    return { success: true, message: "Anggota kabinet berhasil ditambahkan!" };
  } catch (error) {
    console.error("Gagal menambahkan anggota kabinet:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteKabinetMember(id) {
  try {
    console.log("Menyimulasikan hapus anggota kabinet ID:", id);

    revalidatePath("/admin/dashboard");
    return { success: true, message: "Anggota kabinet berhasil dihapus!" };
  } catch (error) {
    console.error("Gagal menghapus anggota kabinet:", error);
    return { success: false, error: error.message };
  }
}
