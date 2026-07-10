"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { addKabinetMember, deleteKabinetMember } from "./actions";

export default function AdminDashboardPage() {
  // UI State
  const [activeTab, setActiveTab] = useState("ringkasan");
  const [subTab, setSubTab] = useState("agenda");

  // ─── BERANDA DATA ───
  const [berandaData, setBerandaData] = useState(null);
  const [inputVideo, setInputVideo] = useState("");
  const [inputVisi, setInputVisi] = useState("");
  const [inputMisi, setInputMisi] = useState("");

  // ─── DATA KETUA & WAKIL ───
  const [inputNamaKahim, setInputNamaKahim] = useState("");
  const [inputFotoKahim, setInputFotoKahim] = useState(null);
  const [inputNamaWakahim, setInputNamaWakahim] = useState("");
  const [inputFotoWakahim, setInputFotoWakahim] = useState(null);

  // ─── DATA DOSEN PEMBIMBING ───
  const [inputDosen1Nama, setInputDosen1Nama] = useState("");
  const [inputDosen1Keahlian, setInputDosen1Keahlian] = useState("");
  const [inputDosen1NIP, setInputDosen1NIP] = useState("");
  const [inputFotoDosen1, setInputFotoDosen1] = useState(null);
  const [inputDosen2Nama, setInputDosen2Nama] = useState("");
  const [inputDosen2Keahlian, setInputDosen2Keahlian] = useState("");
  const [inputDosen2NIP, setInputDosen2NIP] = useState("");
  const [inputFotoDosen2, setInputFotoDosen2] = useState(null);

  // ─── AGENDA/KEGIATAN DATA ───
  const [eventsCalendar, setEventsCalendar] = useState([]);
  const [newAgenda, setNewAgenda] = useState({ namaProker: "", deskripsi: "", tanggal: "", tempat: "", status: "MENDATANG", bannerUrl: "" });

  // ─── GALERI DATA ───
  const [eventGallery, setEventGallery] = useState([]);
  const [newGallery, setNewGallery] = useState({ caption: "", imageUrl: "" });

  // ─── PUBLIKASI DATA ───
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ judul: "", konten: "", bannerUrl: "", kategori: "BERITA", penulis: "" });

  // ─── KABINET DATA ───
  const [kabinetMembers, setKabinetMembers] = useState([]);
  const [newKabinetMember, setNewKabinetMember] = useState({ nama: "", nim: "", jabatan: "", kementerian: "", fotoUrl: "", periode: "2026" });

  // ─── REKRUTMEN DATA ───
  const [applicants, setApplicants] = useState([]);
  const [recruitmentStats, setRecruitmentStats] = useState({ total: 0, pending: 0, lolos: 0, ditolak: 0 });

  // ─── LOADING & ERROR STATES ───
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─── FETCH DATA ON MOUNT ───
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // TODO: Integrasi Supabase — fetch data asli nanti
        // Sementara isi state dengan data kosong agar dashboard terbuka tanpa crash

        setBerandaData({ videoUrl: "", visi: "", misi: "", namaKahim: "", namaWakahim: "", namaPembimbing: "" });
        setInputVideo("");
        setInputVisi("");
        setInputMisi("");
        setInputNamaKahim("");
        setInputNamaWakahim("");
        setInputDosen1Nama("");
        setInputDosen1Keahlian("");
        setInputDosen1NIP("");
        setInputDosen2Nama("");
        setInputDosen2Keahlian("");
        setInputDosen2NIP("");

        setEventsCalendar([]);
        setEventGallery([]);
        setArticles([]);
        setKabinetMembers([]);
        setApplicants([]);
        setRecruitmentStats({ total: 0, pending: 0, lolos: 0, ditolak: 0 });
      } catch (err) {
        console.error("Error initializing data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // ─── LOGIKA AKSI (DENGAN API INTEGRATION) ───

  // 1. Aksi Simpan Media Utama & Visi Misi
  const handleSaveMediaVisi = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/beranda", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoUrl: inputVideo,
          visi: inputVisi,
          misi: inputMisi,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBerandaData(data.data);
        window.alert("🎉 Media Utama & Visi Misi berhasil diperbarui!");
      } else {
        window.alert(`❌ Gagal: ${data.message}`);
      }
    } catch (err) {
      console.error("Error saving media & visi misi:", err);
      window.alert(`❌ Error: ${err.message}`);
    }
  };

  // 2. Aksi Simpan Data Ketua & Wakil Ketua
  const handleSaveKetuaWakil = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/beranda", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namaKahim: inputNamaKahim,
          namaWakahim: inputNamaWakahim,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBerandaData(data.data);
        window.alert("🎉 Data Ketua & Wakil Ketua berhasil diperbarui!");
      } else {
        window.alert(`❌ Gagal: ${data.message}`);
      }
    } catch (err) {
      console.error("Error saving ketua wakil:", err);
      window.alert(`❌ Error: ${err.message}`);
    }
  };

  // 3. Aksi Simpan Data Dosen Pembimbing
  const handleSaveDosenPembimbing = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/beranda", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namaPembimbing1: inputDosen1Nama,
          namaPembimbing2: inputDosen2Nama,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBerandaData(data.data);
        window.alert("🎉 Data Dosen Pembimbing berhasil diperbarui!");
      } else {
        window.alert(`❌ Gagal: ${data.message}`);
      }
    } catch (err) {
      console.error("Error saving dosen pembimbing:", err);
      window.alert(`❌ Error: ${err.message}`);
    }
  };

  // 2. Aksi Tambah Agenda Kalender Baru
  const handleAddAgenda = async (e) => {
    e.preventDefault();
    if (!newAgenda.namaProker || !newAgenda.deskripsi || !newAgenda.tanggal || !newAgenda.tempat) {
      window.alert("Mohon isi semua bidang agenda!");
      return;
    }
    try {
      const res = await fetch("/api/agenda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAgenda),
      });

      const data = await res.json();
      if (data.success) {
        setEventsCalendar([...eventsCalendar, data.data]);
        setNewAgenda({ namaProker: "", deskripsi: "", tanggal: "", tempat: "", status: "MENDATANG", bannerUrl: "" });
        window.alert("📅 Agenda kegiatan baru berhasil ditambahkan!");
      } else {
        window.alert(`❌ Gagal: ${data.message}`);
      }
    } catch (err) {
      console.error("Error adding agenda:", err);
      window.alert(`❌ Error: ${err.message}`);
    }
  };

  // 3. Aksi Tambah Foto Galeri Baru
  const handleAddGallery = async (e) => {
    e.preventDefault();
    if (!newGallery.caption || !newGallery.imageUrl) {
      window.alert("Mohon isi caption dan URL gambar!");
      return;
    }
    try {
      const res = await fetch("/api/galeri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGallery),
      });

      const data = await res.json();
      if (data.success) {
        setEventGallery([...eventGallery, data.data]);
        setNewGallery({ caption: "", imageUrl: "" });
        window.alert("📸 Foto dokumentasi berhasil ditambahkan!");
      } else {
        window.alert(`❌ Gagal: ${data.message}`);
      }
    } catch (err) {
      console.error("Error adding gallery:", err);
      window.alert(`❌ Error: ${err.message}`);
    }
  };

  // 4. Aksi Hapus Agenda
  const handleDeleteAgenda = async (id) => {
    if (!confirm("Apakah kamu yakin ingin menghapus agenda kegiatan ini?")) return;
    try {
      const res = await fetch(`/api/agenda/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        setEventsCalendar(eventsCalendar.filter((item) => item.id !== id));
        window.alert("✅ Agenda berhasil dihapus!");
      } else {
        window.alert(`❌ Gagal: ${data.message}`);
      }
    } catch (err) {
      console.error("Error deleting agenda:", err);
      window.alert(`❌ Error: ${err.message}`);
    }
  };

  // 5. Aksi Hapus Foto Galeri
  const handleDeleteGallery = async (id) => {
    if (!confirm("Apakah kamu yakin ingin menghapus foto ini?")) return;
    try {
      const res = await fetch(`/api/galeri/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        setEventGallery(eventGallery.filter((item) => item.id !== id));
        window.alert("✅ Foto berhasil dihapus!");
      } else {
        window.alert(`❌ Gagal: ${data.message}`);
      }
    } catch (err) {
      console.error("Error deleting gallery:", err);
      window.alert(`❌ Error: ${err.message}`);
    }
  };

  // 6. Aksi Tambah Artikel Publikasi
  const handleAddArticle = async (e) => {
    e.preventDefault();
    if (!newArticle.judul || !newArticle.konten || !newArticle.bannerUrl || !newArticle.kategori) {
      window.alert("Mohon isi semua bidang artikel!");
      return;
    }
    try {
      const res = await fetch("/api/publikasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArticle),
      });

      const data = await res.json();
      if (data.success) {
        setArticles([...articles, data.data]);
        setNewArticle({ judul: "", konten: "", bannerUrl: "", kategori: "BERITA", penulis: "" });
        window.alert("📰 Artikel berhasil diterbitkan!");
      } else {
        window.alert(`❌ Gagal: ${data.message}`);
      }
    } catch (err) {
      console.error("Error adding article:", err);
      window.alert(`❌ Error: ${err.message}`);
    }
  };

  // 7. Aksi Update/Edit Artikel
  const handleUpdateArticle = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/publikasi/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (data.success) {
        setArticles(articles.map((art) => (art.id === id ? data.data : art)));
        window.alert("✅ Artikel berhasil diperbarui!");
      } else {
        window.alert(`❌ Gagal: ${data.message}`);
      }
    } catch (err) {
      console.error("Error updating article:", err);
      window.alert(`❌ Error: ${err.message}`);
    }
  };

  // 8. Aksi Hapus Artikel
  const handleDeleteArticle = async (id) => {
    if (!confirm("Apakah kamu yakin ingin menghapus artikel ini?")) return;
    try {
      const res = await fetch(`/api/publikasi/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        setArticles(articles.filter((art) => art.id !== id));
        window.alert("✅ Artikel berhasil dihapus!");
      } else {
        window.alert(`❌ Gagal: ${data.message}`);
      }
    } catch (err) {
      console.error("Error deleting article:", err);
      window.alert(`❌ Error: ${err.message}`);
    }
  };

  // 9. Aksi Tambah Member Kabinet (Server Action)
  const handleAddKabinetMember = async (e) => {
    e.preventDefault();
    if (!newKabinetMember.nama || !newKabinetMember.nim || !newKabinetMember.jabatan || !newKabinetMember.kementerian || !newKabinetMember.fotoUrl) {
      window.alert("Mohon isi semua bidang yang diperlukan!");
      return;
    }
    try {
      const result = await addKabinetMember(newKabinetMember);

      if (result.success) {
        setKabinetMembers([...kabinetMembers, { ...newKabinetMember, id: Date.now() }]);
        setNewKabinetMember({ nama: "", nim: "", jabatan: "", kementerian: "", fotoUrl: "", periode: "2026" });
        window.alert("✅ Anggota kabinet berhasil ditambahkan!");
      } else {
        window.alert(`❌ Gagal: ${result.error}`);
      }
    } catch (err) {
      console.error("Error adding kabinet member:", err);
      window.alert(`❌ Error: ${err.message}`);
    }
  };

  // 10. Aksi Hapus Member Kabinet (Server Action)
  const handleDeleteKabinetMember = async (id) => {
    if (!confirm("Apakah kamu yakin ingin menghapus anggota ini?")) return;
    try {
      const result = await deleteKabinetMember(id);

      if (result.success) {
        setKabinetMembers(kabinetMembers.filter((member) => member.id !== id));
        window.alert("✅ Anggota kabinet berhasil dihapus!");
      } else {
        window.alert(`❌ Gagal: ${result.error}`);
      }
    } catch (err) {
      console.error("Error deleting kabinet member:", err);
      window.alert(`❌ Error: ${err.message}`);
    }
  };

  // 11. Aksi Update Status Rekrutmen (Lolos/Tolak)
  const handleUpdateRecruitmentStatus = async (id, statusSeleksi) => {
    try {
      const res = await fetch(`/api/rekrutmen/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statusSeleksi }),
      });

      const data = await res.json();
      if (data.success) {
        setApplicants(applicants.map((app) => (app.id === id ? { ...app, statusSeleksi } : app)));

        // Refetch stats untuk update infografis
        const statsRes = await fetch("/api/rekrutmen/stats");
        const statsData = await statsRes.json();
        if (statsData.success) {
          setRecruitmentStats(statsData.data);
        }
        window.alert(`✅ Status pendaftar berhasil diubah menjadi ${statusSeleksi}!`);
      } else {
        window.alert(`❌ Gagal: ${data.message}`);
      }
    } catch (err) {
      console.error("Error updating recruitment status:", err);
      window.alert(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex font-sans text-body selection:bg-m-blue-light selection:text-white">
      {/* ─── SIDEBAR CMS NAVIGASI KIRI ─── */}
      <aside className="w-64 border-r border-hairline bg-surface-soft flex flex-col justify-between p-6 select-none sticky top-0 h-screen">
        <div className="space-y-6 overflow-y-auto pr-1">
          <div className="flex items-center gap-3 pb-4 border-b border-hairline">
            <img src="/assets/logo-hmbd-small.webp" alt="Logo HMBD" className="h-8 w-8 object-contain" />
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-on-dark">HQ Aradhana</h2>
              <p className="text-[10px] text-muted uppercase tracking-tight">Pusat Kendali Konten</p>
            </div>
          </div>

          <nav className="space-y-1">
            <span className="block text-[9px] font-black text-muted uppercase tracking-widest pl-2 mb-2">Navigasi CMS</span>
            {[
              { id: "ringkasan", label: "Ringkasan Dashboard", desc: "Statistik global website" },
              { id: "beranda", label: "Konten Beranda", desc: "Form video & visi-misi" },
              { id: "publikasi", label: "Berita & Insight", desc: "Kelola artikel dan rilis media" },
              { id: "kabinet", label: "Fungsionaris Kabinet", desc: "Kelola struktur staf & divisi" }, // 🎯 TAMBAHKAN INI SINKRON DENGAN TAB CRUD
              { id: "kegiatan", label: "Modul Kegiatan", desc: "Kalender & galeri arsip" },
              { id: "rekrutmen", label: "Kelola Rekrutmen", desc: "Kelola proses rekrutmen" },
            ].map((menu) => (
              <button
                key={menu.id}
                onClick={() => setActiveTab(menu.id)}
                className={`w-full flex flex-col px-3 py-2 text-left transition-all cursor-pointer rounded-xs ${
                  activeTab === menu.id ? "bg-m-blue-dark/10 text-m-blue-light border-l-2 border-m-blue-dark font-bold" : "text-muted hover:text-on-dark hover:bg-canvas/50"
                }`}
              >
                <span className="text-xs uppercase tracking-wider">{menu.label}</span>
                <span className="text-[9px] font-light text-muted/80 tracking-tight mt-0.5">{menu.desc}</span>
              </button>
            ))}
          </nav>
        </div>

        <Link href="/admin/login" className="flex items-center justify-center gap-2 w-full py-2.5 border border-m-red/20 bg-m-red/5 hover:bg-m-red/10 text-[11px] font-bold uppercase tracking-wider text-m-red transition-all mt-4">
          Keluar Sistem ↩
        </Link>
      </aside>

      {/* ─── AREA KONTEN UTAMA (KANAN) ─── */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* ─── LOADING STATE ─── */}
        {isLoading && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 border-2 border-m-blue-light border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-muted font-mono uppercase tracking-wider">Memuat data Himpunan...</p>
            </div>
          </div>
        )}

        {/* ─── ERROR STATE ─── */}
        {!isLoading && error && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-3 max-w-md">
              <span className="text-3xl">⚠️</span>
              <h2 className="text-sm font-black uppercase tracking-wider text-m-red">Gagal Memuat Data</h2>
              <p className="text-xs text-muted font-light">{error}</p>
              <button onClick={() => window.location.reload()} className="py-2 px-4 bg-m-blue-dark text-white text-xs font-bold uppercase tracking-wider hover:bg-m-blue-light transition-all cursor-pointer">
                Muat Ulang Halaman
              </button>
            </div>
          </div>
        )}

        {/* ─── TAB 1: RINGKASAN GLOBAL ─── */}
        {!isLoading && !error && activeTab === "ringkasan" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-black uppercase tracking-wider text-on-dark">Ringkasan Sistem</h1>
              <p className="text-xs text-muted font-light mt-1">Garis besar data yang sedang aktif dan tampil di halaman publik.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="border border-hairline bg-surface-soft p-4 rounded-xs">
                <span className="text-[10px] font-bold text-muted uppercase block">Video Beranda Aktif</span>
                <span className="text-xs font-mono text-m-blue-light block truncate mt-1">{berandaData?.videoUrl || "N/A"}</span>
              </div>
              <div className="border border-hairline bg-surface-soft p-4 rounded-xs">
                <span className="text-[10px] font-bold text-muted uppercase block">Agenda Kalender</span>
                <span className="text-2xl font-black text-on-dark block mt-1">{eventsCalendar?.length || 0} Jadwal</span>
              </div>
              <div className="border border-hairline bg-surface-soft p-4 rounded-xs">
                <span className="text-[10px] font-bold text-muted uppercase block">Arsip Dokumentasi Foto</span>
                <span className="text-2xl font-black text-on-dark block mt-1">#{(eventGallery?.length || 0).toString().padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: FORM INPUT BERANDA LENGKAP ─── */}
        {!isLoading && !error && activeTab === "beranda" && (
          <div className="space-y-8 max-w-6xl">
            {" "}
            {/* 🎯 SEKARANG SUDAH MAKSIMAL max-w-6xl SEPERTI TAB LAINNYA */}
            <div>
              <h1 className="text-xl font-black uppercase tracking-wider text-on-dark">Kelola Halaman Beranda</h1>
              <p className="text-xs text-muted font-light mt-1">Sesuaikan video utama, visi-misi, info pimpinan (Kahim/Wakahim), dan data dosen pembimbing.</p>
            </div>
            {/* ─── KONTEN BERANDA: SEGMEN 1 & 2 REVISI TOTAL (FULL UPLOADERS) ─── */}
            {/* SEGMEN 1: MEDIA VIDEO UTAMA & VISI MISI */}
            <form onSubmit={handleSaveMediaVisi} className="border border-hairline bg-surface-soft p-6 space-y-5 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-hairline pb-2 gap-2">
                <h3 className="text-xs font-bold uppercase text-m-blue-light tracking-wider">1. Media Utama & Visi Misi</h3>
                <span className="text-[9px] bg-canvas px-2 py-0.5 font-mono text-muted border border-hairline rounded-xs">Format: .mp4 Only</span>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {/* 🎯 Fitur Unggah File Video Langsung */}
                <div className="space-y-1.5 p-3 bg-canvas/30 border border-hairline">
                  <label className="text-[10px] font-bold uppercase tracking-wide text-body-strong block">Unggah Video Company Profile Baru</label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-1">
                    <input
                      type="file"
                      accept="video/mp4"
                      className="w-full text-xs text-muted file:mr-4 file:py-1.5 file:px-3 file:border file:border-hairline file:bg-canvas file:text-on-dark file:text-[10px] file:font-bold file:uppercase file:tracking-wider hover:file:bg-surface-soft file:cursor-pointer"
                    />
                    <span className="text-[10px] font-mono text-muted italic shrink-0">Video Aktif: ARADHANA-COMPANY-PROFILE.mp4</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wide text-body-strong">Teks Visi HMBD</label>
                  <textarea
                    rows="2"
                    value={inputVisi}
                    onChange={(e) => setInputVisi(e.target.value)}
                    className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:outline-hidden focus:border-m-blue-dark resize-none font-light"
                  />
                </div>
              </div>

              <div className="text-right mt-4">
                <button type="submit" className="py-2.5 px-6 bg-gradient-to-r from-m-blue-dark to-m-blue-light text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-90 transition-all cursor-pointer">
                  Simpan Media Utama & Visi Misi
                </button>
              </div>
            </form>
            {/* SEGMEN 2: STRUKTUR PIMPINAN (KAHIM & WAKAHIM + INPUT FILE FOTO) */}
            <form onSubmit={handleSaveKetuaWakil} className="border border-hairline bg-surface-soft p-6 space-y-4 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-hairline pb-2 gap-2">
                <h3 className="text-xs font-bold uppercase text-m-red tracking-wider">2. Data Ketua & Wakil Ketua Himpunan</h3>
                <span className="text-[9px] bg-canvas px-2 py-0.5 font-mono text-muted border border-hairline rounded-xs">Rekomendasi Rasio: 3:4 (Portrait)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Sisi Ketua (Kahim) */}
                <div className="space-y-4 p-4 bg-canvas/40 border border-hairline flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-m-blue-light uppercase tracking-wider block">Data Ketua (Kahim)</span>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-muted">Nama Lengkap & Gelar</label>
                      <input
                        type="text"
                        value={inputNamaKahim}
                        onChange={(e) => setInputNamaKahim(e.target.value)}
                        className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden"
                      />
                    </div>
                  </div>
                  {/* 🎯 Tombol Upload Foto Kahim */}
                  <div className="space-y-1 pt-3 border-t border-hairline/30">
                    <label className="text-[9px] font-bold uppercase text-muted block">Ganti Foto Resmi Kahim</label>
                    <div className="flex flex-col gap-1.5 mt-1">
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full text-xs text-muted file:mr-3 file:py-1 file:px-2.5 file:border file:border-hairline file:bg-canvas file:text-on-dark file:text-[9px] file:font-bold file:uppercase hover:file:bg-surface-soft file:cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-muted italic truncate">Bawaan: Nabiel.webp</span>
                    </div>
                  </div>
                </div>

                {/* Sisi Wakil (Wakahim) */}
                <div className="space-y-4 p-4 bg-canvas/40 border border-hairline flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[10px] font-black text-m-red uppercase tracking-wider block">Data Wakil (Wakahim)</span>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-muted">Nama Lengkap & Gelar</label>
                      <input
                        type="text"
                        value={inputNamaWakahim}
                        onChange={(e) => setInputNamaWakahim(e.target.value)}
                        className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden"
                      />
                    </div>
                  </div>
                  {/* 🎯 Tombol Upload Foto Wakahim */}
                  <div className="space-y-1 pt-3 border-t border-hairline/30">
                    <label className="text-[9px] font-bold uppercase text-muted block">Ganti Foto Resmi Wakahim</label>
                    <div className="flex flex-col gap-1.5 mt-1">
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full text-xs text-muted file:mr-3 file:py-1 file:px-2.5 file:border file:border-hairline file:bg-canvas file:text-on-dark file:text-[9px] file:font-bold file:uppercase hover:file:bg-surface-soft file:cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-muted italic truncate">Bawaan: Farrel.webp</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right mt-4">
                <button type="submit" className="py-2.5 px-6 bg-gradient-to-r from-m-blue-dark to-m-blue-light text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-90 transition-all cursor-pointer">
                  Simpan Data Ketua & Wakil Ketua
                </button>
              </div>
            </form>
            {/* SEGMEN 3: DOSEN PEMBIMBING (REVISI + INPUT FILE FOTO) */}
            <form onSubmit={handleSaveDosenPembimbing} className="border border-hairline bg-surface-soft p-6 space-y-4 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-hairline pb-2 gap-2">
                <h3 className="text-xs font-bold uppercase text-muted tracking-wider">3. Data Dosen Pembimbing Himpunan</h3>
                <span className="text-[9px] bg-canvas px-2 py-0.5 font-mono text-muted border border-hairline rounded-xs">Rekomendasi Rasio: 4:3 (Landscape)</span>
              </div>

              <div className="space-y-6">
                {/* ─── DOSEN 1 ─── */}
                <div className="p-4 bg-canvas/40 border border-hairline space-y-4">
                  <div className="text-[10px] font-bold text-m-blue-light uppercase tracking-wider">Profil Dosen Pembimbing 1</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-muted uppercase">Nama Lengkap & Gelar</label>
                      <input
                        type="text"
                        value={inputDosen1Nama}
                        onChange={(e) => setInputDosen1Nama(e.target.value)}
                        className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-muted uppercase">Keahlian / Fokus Role</label>
                      <input
                        type="text"
                        value={inputDosen1Keahlian}
                        onChange={(e) => setInputDosen1Keahlian(e.target.value)}
                        className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-muted uppercase">Nomor Induk Pegawai (NIP)</label>
                      <input
                        type="text"
                        value={inputDosen1NIP}
                        onChange={(e) => setInputDosen1NIP(e.target.value)}
                        className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden"
                      />
                    </div>
                  </div>
                  {/* 🎯 Fitur Unggah Foto Dosen 1 */}
                  <div className="space-y-1 max-w-md pt-2 border-t border-hairline/30">
                    <label className="text-[9px] font-bold text-muted uppercase block">Unggah Foto Profil Dosen 1</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full text-xs text-muted file:mr-4 file:py-1 file:px-3 file:border file:border-hairline file:bg-canvas file:text-on-dark file:text-[10px] file:font-bold file:uppercase file:tracking-wider hover:file:bg-surface-soft file:cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-muted italic truncate">Bawaan: Alfilia.webp</span>
                    </div>
                  </div>
                </div>

                {/* ─── DOSEN 2 ─── */}
                <div className="p-4 bg-canvas/40 border border-hairline space-y-4">
                  <div className="text-[10px] font-bold text-m-blue-light uppercase tracking-wider">Profil Dosen Pembimbing 2</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-muted uppercase">Nama Lengkap & Gelar</label>
                      <input
                        type="text"
                        value={inputDosen2Nama}
                        onChange={(e) => setInputDosen2Nama(e.target.value)}
                        className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-muted uppercase">Keahlian / Fokus Role</label>
                      <input
                        type="text"
                        value={inputDosen2Keahlian}
                        onChange={(e) => setInputDosen2Keahlian(e.target.value)}
                        className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-muted uppercase">Nomor Induk Pegawai (NIP)</label>
                      <input
                        type="text"
                        value={inputDosen2NIP}
                        onChange={(e) => setInputDosen2NIP(e.target.value)}
                        className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden"
                      />
                    </div>
                  </div>
                  {/* 🎯 Fitur Unggah Foto Dosen 2 */}
                  <div className="space-y-1 max-w-md pt-2 border-t border-hairline/30">
                    <label className="text-[9px] font-bold text-muted uppercase block">Unggah Foto Profil Dosen 2</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        className="w-full text-xs text-muted file:mr-4 file:py-1 file:px-3 file:border file:border-hairline file:bg-canvas file:text-on-dark file:text-[10px] file:font-bold file:uppercase file:tracking-wider hover:file:bg-surface-soft file:cursor-pointer"
                      />
                      <span className="text-[10px] font-mono text-muted italic truncate">Bawaan: Imam.webp</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right mt-4">
                <button type="submit" className="py-2.5 px-6 bg-gradient-to-r from-m-blue-dark to-m-blue-light text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-90 transition-all cursor-pointer">
                  Simpan Data Dosen Pembimbing
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ─── TAB 3: MANAJEMEN PUBLIKASI BERITA & INSIGHT (CRUD) ─── */}
        {!isLoading && !error && activeTab === "publikasi" && (
          <div className="space-y-8 max-w-6xl">
            {/* HEADER KONTROL KONTEN */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <h1 className="text-xl font-black uppercase tracking-wider text-on-dark">Pusat Publikasi Media HMBD</h1>
                <p className="text-xs text-muted font-light mt-1">Kelola arsip rilis berita kabinet, pers rilis, dan artikel edukasi digital (Insight).</p>
              </div>
              {/* Tombol trigger tambah data baru */}
              <button className="py-2 px-4 bg-m-blue-dark text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-m-blue-light transition-all cursor-pointer shrink-0">+ Buat Artikel Baru</button>
            </div>

            {/* FORMULIR BUAT / EDIT ARTIKEL (Bisa dijadikan Modal atau Form Collapse) */}
            <div className="border border-hairline bg-surface-soft p-6 space-y-5 shadow-lg">
              <div className="border-b border-hairline pb-2">
                <h3 className="text-xs font-bold uppercase text-m-red tracking-wider">Formulir Editor Artikel Kabinet</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Kolom Kiri: Meta Informasi */}
                <div className="md:col-span-1 space-y-4 border-r border-hairline/40 pr-0 md:pr-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-body-strong">Kategori Publikasi</label>
                    <select
                      value={newArticle.kategori}
                      onChange={(e) => setNewArticle({ ...newArticle, kategori: e.target.value })}
                      className="w-full border border-hairline bg-canvas px-3 py-2 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden cursor-pointer"
                    >
                      <option value="BERITA">Berita Kabinet Aradhana</option>
                      <option value="INSIGHT">Insight (Research & Education)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-body-strong">Nama Penulis / Author</label>
                    <input
                      type="text"
                      value={newArticle.penulis}
                      onChange={(e) => setNewArticle({ ...newArticle, penulis: e.target.value })}
                      placeholder="Contoh: Divisi Creative Media"
                      className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-body-strong">Tanggal Rilis Konten</label>
                    <input type="date" className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden" />
                  </div>

                  {/* 🎯 Upload Sampul Gambar Berita */}
                  <div className="space-y-1 pt-1">
                    <label className="text-[10px] font-bold uppercase text-body-strong block">Gambar Utama (Spanduk 16:9)</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full text-xs text-muted file:mr-3 file:py-1 file:px-2 file:border file:border-hairline file:bg-canvas file:text-on-dark file:text-[9px] file:font-bold file:uppercase hover:file:bg-surface-soft file:cursor-pointer"
                    />
                  </div>
                </div>

                {/* Kolom Kanan: Isi Artikel */}
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-body-strong">Judul Artikel Utama</label>
                    <input
                      type="text"
                      value={newArticle.judul}
                      onChange={(e) => setNewArticle({ ...newArticle, judul: e.target.value })}
                      placeholder="Masukkan judul berita atau artikel edukasi di sini..."
                      className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark font-bold focus:border-m-blue-dark focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-body-strong">Kutipan Ringkas / Excerpt (Maksimal 3 Baris di Grid)</label>
                    <textarea
                      rows="2"
                      placeholder="Tuliskan intisari pembuka berita yang memikat untuk memancing minat baca..."
                      className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden resize-none font-light"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase text-body-strong">Konten Narasi Utuh</label>
                      <span className="text-[9px] text-muted italic font-mono">Gunakan [Nama Sub] untuk sub-heading</span>
                    </div>
                    <textarea
                      rows="8"
                      value={newArticle.konten}
                      onChange={(e) => setNewArticle({ ...newArticle, konten: e.target.value })}
                      placeholder="Tuliskan isi berita lengkap di sini. Pisahkan antar paragraf dengan menekan enter dua kali.&#10;&#10;[Tantangan Ekonomi Digital]&#10;Contoh paragraf baru di bawah sub-judul..."
                      className="w-full border border-hairline bg-canvas p-3 text-xs text-on-dark font-mono focus:border-m-blue-dark focus:outline-hidden font-light"
                    />
                  </div>
                </div>
              </div>

              {/* Aksi Form */}
              <div className="flex justify-end gap-3 pt-3 border-t border-hairline/40">
                <button className="py-1.5 px-4 border border-hairline bg-canvas text-body text-[11px] font-bold uppercase tracking-wider hover:bg-surface-soft cursor-pointer">Batal</button>
                <button onClick={handleAddArticle} className="py-1.5 px-5 bg-gradient-to-r from-m-blue-dark to-m-blue-light text-white text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer">
                  Terbitkan Artikel
                </button>
              </div>
            </div>

            {/* DAFTAR ARSIP ARTIKEL YANG SUDAH TERBIT (TABEL MONITORING KONTEN) */}
            <div className="border border-hairline bg-surface-soft p-6 space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-hairline pb-2">
                <h3 className="text-xs font-bold uppercase text-muted tracking-wider">Arsip dan Manajemen Postingan</h3>
                <div className="flex gap-2">
                  <input type="text" placeholder="Cari judul..." className="border border-hairline bg-canvas px-2 py-0.5 text-[11px] text-on-dark focus:outline-hidden" />
                </div>
              </div>

              {/* Tabel Grid Konten */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="border-b-2 border-hairline text-body-strong uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-2 font-bold">Tanggal</th>
                      <th className="py-2.5 px-2 font-bold">Kategori</th>
                      <th className="py-2.5 px-2 font-bold">Judul Postingan</th>
                      <th className="py-2.5 px-2 font-bold">Penulis</th>
                      <th className="py-2.5 px-2 font-bold text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline/40 text-body font-light">
                    {articles && articles.length > 0 ? (
                      articles.map((article) => (
                        <tr key={article.id} className="hover:bg-canvas/30 transition-colors">
                          <td className="py-3 px-2 whitespace-nowrap">{new Date(article.createdAt).toLocaleDateString("id-ID")}</td>
                          <td className="py-3 px-2">
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 ${article.kategori === "BERITA" ? "bg-m-blue-dark/10 text-m-blue-light border border-m-blue-dark/20" : "bg-m-red/10 text-m-red border border-m-red/20"} uppercase`}
                            >
                              {article.kategori}
                            </span>
                          </td>
                          <td className="py-3 px-2 font-sans font-medium text-on-dark truncate max-w-xs">{article.judul}</td>
                          <td className="py-3 px-2">{article.penulis}</td>
                          <td className="py-3 px-2 text-center whitespace-nowrap space-x-1">
                            <button onClick={() => handleUpdateArticle(article.id, article)} className="px-2 py-0.5 border border-hairline bg-canvas text-[10px] text-m-blue-light hover:bg-m-blue-dark/10 uppercase cursor-pointer">
                              Edit
                            </button>
                            <button onClick={() => handleDeleteArticle(article.id)} className="px-2 py-0.5 border border-hairline bg-canvas text-[10px] text-m-red hover:bg-m-red/10 uppercase cursor-pointer">
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-4 px-2 text-center text-muted text-sm">
                          Belum ada artikel yang diterbitkan
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 4: MANAJEMEN FUNGSIONARIS KABINET (CRUD) ─── */}
        {!isLoading && !error && activeTab === "kabinet" && (
          <div className="space-y-8 max-w-6xl">
            {/* HEADER KONTROL */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <h1 className="text-xl font-black uppercase tracking-wider text-on-dark">Struktur Fungsionaris Kabinet</h1>
                <p className="text-xs text-muted font-light mt-1">Daftar total 51 pengurus aktif Kabinet Aradhana HMBD Telkom University Purwokerto.</p>
              </div>
              <button className="py-2 px-4 bg-m-red text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-90 transition-all cursor-pointer shrink-0">+ Tambah Anggota Baru</button>
            </div>

            {/* FORMULIR INPUT / EDIT DATA ANGGOTA */}
            <div className="border border-hairline bg-surface-soft p-6 space-y-5 shadow-lg">
              <div className="border-b border-hairline pb-2">
                <h3 className="text-xs font-bold uppercase text-m-blue-light tracking-wider">Formulir Profil Pengurus Himpunan</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Input Text Kiri */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase text-body-strong">Nama Lengkap Anggota</label>
                    <input
                      type="text"
                      value={newKabinetMember.nama}
                      onChange={(e) => setNewKabinetMember({ ...newKabinetMember, nama: e.target.value })}
                      placeholder="Masukkan nama lengkap beserta gelar jika ada..."
                      className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-body-strong">Jabatan / Role Kerja</label>
                    <input
                      type="text"
                      value={newKabinetMember.jabatan}
                      onChange={(e) => setNewKabinetMember({ ...newKabinetMember, jabatan: e.target.value })}
                      placeholder="Contoh: Staff Creative Media"
                      className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-body-strong">Kategori Divisi / Departemen</label>
                    <select
                      value={newKabinetMember.kementerian}
                      onChange={(e) => setNewKabinetMember({ ...newKabinetMember, kementerian: e.target.value })}
                      className="w-full border border-hairline bg-canvas px-3 py-2 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden cursor-pointer uppercase font-mono text-[11px]"
                    >
                      <option value="Inti Kabinet">Inti Kabinet</option>
                      <option value="Human Resources Development">Human Resources Development</option>
                      <option value="Internal Relations">Internal Relations</option>
                      <option value="External Relations">External Relations</option>
                      <option value="Democratic Advocacy">Democratic Advocacy</option>
                      <option value="Research and Education">Research and Education</option>
                      <option value="Business and Entrepreneur">Business and Entrepreneur</option>
                      <option value="Creative Media">Creative Media</option>
                    </select>
                  </div>
                </div>

                {/* Upload Foto Kanan */}
                <div className="md:col-span-1 p-4 bg-canvas/30 border border-hairline flex flex-col justify-between">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-body-strong block">Foto Resmi Pasfoto</label>
                    <span className="text-[9px] text-muted italic block mb-2">Rekomendasi background seragam/polos (Rasio 3:4)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full text-xs text-muted file:mr-3 file:py-1 file:px-2 file:border file:border-hairline file:bg-canvas file:text-on-dark file:text-[9px] file:font-bold file:uppercase hover:file:bg-surface-soft file:cursor-pointer"
                    />
                  </div>
                  <div className="text-[9px] font-mono text-muted border-t border-hairline/30 pt-2 mt-3 truncate italic">Aset Aktif: Belum ada file dipilih</div>
                </div>
              </div>

              {/* Aksi Trigger Tombol */}
              <div className="flex justify-end gap-3 pt-3 border-t border-hairline/40">
                <button className="py-1.5 px-4 border border-hairline bg-canvas text-body text-[11px] font-bold uppercase tracking-wider hover:bg-surface-soft cursor-pointer">Batal</button>
                <button onClick={handleAddKabinetMember} className="py-1.5 px-5 bg-m-blue-dark text-white text-[11px] font-bold uppercase tracking-wider hover:bg-m-blue-light transition-all cursor-pointer">
                  Simpan Data Pengurus
                </button>
              </div>
            </div>

            {/* MONITORING TABEL DAFTAR ANGGOTA TERSEDIA */}
            <div className="border border-hairline bg-surface-soft p-6 space-y-4 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-hairline pb-2 gap-3">
                <h3 className="text-xs font-bold uppercase text-muted tracking-wider">Database Fungsionaris Terdaftar</h3>
                <input type="text" placeholder="Cari nama staf kabinet..." className="border border-hairline bg-canvas px-3 py-1 text-[11px] text-on-dark focus:outline-hidden w-full sm:w-56" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="border-b-2 border-hairline text-body-strong uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-2 font-bold w-12 text-center">ID</th>
                      <th className="py-2.5 px-2 font-bold">Foto</th>
                      <th className="py-2.5 px-2 font-bold">Nama Fungsionaris</th>
                      <th className="py-2.5 px-2 font-bold">Jabatan / Role</th>
                      <th className="py-2.5 px-2 font-bold">Divisi</th>
                      <th className="py-2.5 px-2 font-bold text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline/40 text-body font-light">
                    {kabinetMembers && kabinetMembers.length > 0 ? (
                      kabinetMembers.map((member, idx) => (
                        <tr key={member.id} className="hover:bg-canvas/30 transition-colors">
                          <td className="py-2 px-2 text-center text-muted">{(idx + 1).toString().padStart(2, "0")}</td>
                          <td className="py-2 px-2">
                            <div className="h-9 w-7 border border-hairline overflow-hidden bg-canvas">
                              <img src={member.fotoUrl} alt="Preview" className="h-full w-full object-cover" />
                            </div>
                          </td>
                          <td className="py-2 px-2 font-sans font-bold text-on-dark">{member.nama}</td>
                          <td className="py-2 px-2 text-m-blue-light font-sans text-[11px]">{member.jabatan}</td>
                          <td className="py-2 px-2">
                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-canvas border border-hairline uppercase whitespace-nowrap">{member.kementerian}</span>
                          </td>
                          <td className="py-2 px-2 text-center whitespace-nowrap space-x-1">
                            <button className="px-2 py-0.5 border border-hairline bg-canvas text-[10px] text-m-blue-light hover:bg-m-blue-dark/10 uppercase cursor-pointer">Edit</button>
                            <button onClick={() => handleDeleteKabinetMember(member.id)} className="px-2 py-0.5 border border-hairline bg-canvas text-[10px] text-m-red hover:bg-m-red/10 uppercase cursor-pointer">
                              Hapus
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-4 px-2 text-center text-muted text-sm">
                          Belum ada anggota kabinet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 5: MANAJEMEN MODUL KEGIATAN (AGENDA & GALERI) ─── */}
        {!isLoading && !error && activeTab === "kegiatan" && (
          <div className="space-y-8 max-w-6xl">
            {/* HEADER UTAMA MODUL */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-hairline pb-4">
              <div>
                <h1 className="text-xl font-black uppercase tracking-wider text-on-dark">Pusat Aktivitas & Kegiatan</h1>
                <p className="text-xs text-muted font-light mt-1">Kelola lini masa kalender agenda mendatang serta arsip dokumentasi galeri foto proker HMBD.</p>
              </div>

              {/* SWITCHER SUB-TAB MINI */}
              <div className="flex border border-hairline bg-canvas p-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                <button onClick={() => setSubTab("agenda")} className={`px-3 py-1.5 transition-all cursor-pointer ${subTab === "agenda" ? "bg-m-blue-dark text-white font-black" : "text-muted hover:text-on-dark"}`}>
                  📅 Kalender Agenda
                </button>
                <button onClick={() => setSubTab("galeri")} className={`px-3 py-1.5 transition-all cursor-pointer ${subTab === "galeri" ? "bg-m-blue-dark text-white font-black" : "text-muted hover:text-on-dark"}`}>
                  🖼️ Galeri Foto
                </button>
              </div>
            </div>

            {/* ───────────────── SUB-PANEL A: KALENDER AGENDA ───────────────── */}
            {subTab === "agenda" && (
              <div className="space-y-6">
                {/* FORM INPUT AGENDA */}
                <div className="border border-hairline bg-surface-soft p-6 space-y-4 shadow-lg">
                  <div className="border-b border-hairline pb-2">
                    <h3 className="text-xs font-bold uppercase text-m-blue-light tracking-wider">Formulir Jadwal Agenda Baru</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] font-bold uppercase text-body-strong">Nama / Judul Kegiatan Agenda</label>
                      <input
                        type="text"
                        value={newAgenda.namaProker}
                        onChange={(e) => setNewAgenda({ ...newAgenda, namaProker: e.target.value })}
                        placeholder="Contoh: Kuliah tamu: strategi industri digital bagi startup kampus"
                        className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-body-strong">Tanggal Pelaksanaan</label>
                      <input
                        type="date"
                        value={newAgenda.tanggal}
                        onChange={(e) => setNewAgenda({ ...newAgenda, tanggal: e.target.value })}
                        className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden font-mono uppercase"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-body-strong">Status Agenda</label>
                      <select
                        value={newAgenda.status}
                        onChange={(e) => setNewAgenda({ ...newAgenda, status: e.target.value })}
                        className="w-full border border-hairline bg-canvas px-3 py-2 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden cursor-pointer uppercase font-mono text-[11px]"
                      >
                        <option value="MENDATANG">🆕 Mendatang (Belum Terlaksana)</option>
                        <option value="SELESAI">✅ Selesai (Arsip Kegiatan)</option>
                      </select>
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[10px] font-bold uppercase text-body-strong">Tempat / Lokasi Acara</label>
                      <input
                        type="text"
                        value={newAgenda.tempat}
                        onChange={(e) => setNewAgenda({ ...newAgenda, tempat: e.target.value })}
                        placeholder="Contoh: Ruang Auditorium — Telkom University Purwokerto"
                        className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-hairline/40">
                    <button onClick={handleAddAgenda} className="py-1.5 px-5 bg-m-blue-dark text-white text-[11px] font-bold uppercase tracking-wider hover:bg-m-blue-light transition-all cursor-pointer">
                      Tambahkan ke Kalender
                    </button>
                  </div>
                </div>

                {/* MONITORING TABEL AGENDA */}
                <div className="border border-hairline bg-surface-soft p-6 shadow-md">
                  <div className="border-b border-hairline pb-2 mb-4">
                    <h3 className="text-xs font-bold uppercase text-muted tracking-wider">Lini Masa Agenda Terdaftar</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse font-mono text-xs">
                      <thead>
                        <tr className="border-b-2 border-hairline text-body-strong uppercase tracking-wider text-[10px]">
                          <th className="py-2.5 px-2 font-bold">Tanggal</th>
                          <th className="py-2.5 px-2 font-bold">Nama Agenda / Kegiatan</th>
                          <th className="py-2.5 px-2 font-bold">Lokasi / Tempat</th>
                          <th className="py-2.5 px-2 font-bold text-center">Status</th>
                          <th className="py-2.5 px-2 font-bold text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-hairline/40 text-body">
                        {eventsCalendar && eventsCalendar.length > 0 ? (
                          eventsCalendar.map((event) => (
                            <tr key={event.id} className="hover:bg-canvas/30 transition-colors">
                              <td className="py-3 px-2 text-on-dark font-bold whitespace-nowrap">{new Date(event.tanggal).toLocaleDateString("id-ID")}</td>
                              <td className="py-3 px-2 font-sans font-bold text-on-dark max-w-xs truncate">{event.namaProker}</td>
                              <td className="py-3 px-2 font-sans text-muted">{event.tempat}</td>
                              <td className="py-3 px-2 text-center">
                                <span
                                  className={`text-[9px] font-black px-1.5 py-0.5 ${event.status === "MENDATANG" ? "bg-m-blue-dark/10 text-m-blue-light border border-m-blue-dark/30" : "bg-canvas text-muted border border-hairline"} uppercase`}
                                >
                                  {event.status}
                                </span>
                              </td>
                              <td className="py-3 px-2 text-center space-x-1 whitespace-nowrap">
                                <button onClick={() => handleDeleteAgenda(event.id)} className="px-1.5 py-0.5 border border-hairline bg-canvas text-[10px] text-m-red hover:bg-m-red/10 uppercase cursor-pointer">
                                  Hapus
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="py-4 px-2 text-center text-muted text-sm">
                              Belum ada agenda
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ───────────────── SUB-PANEL B: GALERI FOTO KEGIATAN ───────────────── */}
            {subTab === "galeri" && (
              <div className="space-y-6">
                {/* FORM UPLOAD FOTO GALERI */}
                <div className="border border-hairline bg-surface-soft p-6 space-y-4 shadow-lg">
                  <div className="border-b border-hairline pb-2">
                    <h3 className="text-xs font-bold uppercase text-m-red tracking-wider">Formulir Dokumentasi Foto Baru</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2 space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-body-strong">Keterangan / Label Foto</label>
                        <input
                          type="text"
                          value={newGallery.caption}
                          onChange={(e) => setNewGallery({ ...newGallery, caption: e.target.value })}
                          placeholder="Contoh: Workshop dokumentasi multimedia kepengurusan"
                          className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-body-strong">Tautan Luar / Dokumentasi Instagram (Opsional)</label>
                        <input type="url" placeholder="https://www.instagram.com/p/..." className="w-full border border-hairline bg-canvas px-3 py-1.5 text-xs text-on-dark focus:border-m-blue-dark focus:outline-hidden font-mono" />
                      </div>
                    </div>

                    <div className="md:col-span-1 p-4 bg-canvas/30 border border-hairline flex flex-col justify-between">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-body-strong block">File Foto Dokumentasi</label>
                        <span className="text-[9px] text-muted block mb-2">Rasio kotak industri (4:5)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="w-full text-xs text-muted file:mr-3 file:py-1 file:px-2 file:border file:border-hairline file:bg-canvas file:text-on-dark file:text-[9px] file:font-bold file:uppercase file:cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-hairline/40">
                    <button onClick={handleAddGallery} className="py-1.5 px-5 bg-m-red text-white text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer">
                      Arsipkan Foto Kegiatan
                    </button>
                  </div>
                </div>

                {/* GRID MONITORING DOKUMEN FOTO */}
                <div className="border border-hairline bg-surface-soft p-6 shadow-md">
                  <div className="border-b border-hairline pb-2 mb-4">
                    <h3 className="text-xs font-bold uppercase text-muted tracking-wider">Koleksi Grid Arsip Terbit</h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {eventGallery && eventGallery.length > 0 ? (
                      eventGallery.map((photo, idx) => (
                        <div key={photo.id} className="border border-hairline bg-canvas p-2 space-y-2 relative group">
                          <div className="aspect-[4/5] bg-black border border-hairline/20 overflow-hidden">
                            <img src={photo.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-[8px] font-mono font-bold text-muted uppercase">Arsip #{(idx + 1).toString().padStart(2, "0")}</span>
                            <p className="text-[11px] font-light text-on-dark truncate mt-0.5">{photo.caption}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteGallery(photo.id)}
                            className="w-full py-1 border border-hairline/40 bg-surface-soft text-[9px] font-mono text-m-red uppercase font-bold hover:bg-m-red/10 transition-colors cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-8 text-center text-muted text-sm">Belum ada foto di galeri</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 6: MANAJEMEN REKRUTMEN (DATABASE INTEGRATED) ─── */}
        {!isLoading && !error && activeTab === "rekrutmen" && (
          <div className="space-y-8 max-w-6xl">
            {/* Header Tab */}
            <div>
              <h1 className="text-xl font-black uppercase tracking-wider text-on-dark">Manajemen Rekrutmen & Oprec</h1>
              <p className="text-xs text-muted font-light mt-1">Kelola database pendaftar, ubah status kelulusan secara langsung, dan pantau metrik distribusi divisi Kabinet Aradhana.</p>
            </div>

            {/* ─── ROW STATISTIK TERINTEGRASI DATABASE ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="border border-hairline bg-surface-soft p-4 shadow-sm">
                <span className="block text-[10px] font-bold uppercase text-muted tracking-wider">Total Pendaftar Masuk</span>
                <span className="block text-2xl font-black text-m-blue-light mt-1">
                  {recruitmentStats.total} <span className="text-xs font-normal text-muted">Orang</span>
                </span>
              </div>
              <div className="border border-hairline bg-surface-soft p-4 shadow-sm">
                <span className="block text-[10px] font-bold uppercase text-muted tracking-wider">Perlu Review (Pending)</span>
                <span className="block text-2xl font-black text-amber-500 mt-1">
                  {recruitmentStats.pending} <span className="text-xs font-normal text-muted">Berkas</span>
                </span>
              </div>
              <div className="border border-hairline bg-surface-soft p-4 shadow-sm">
                <span className="block text-[10px] font-bold uppercase text-muted tracking-wider">Dinyatakan Lolos</span>
                <span className="block text-2xl font-black text-emerald-500 mt-1">
                  {recruitmentStats.lolos} <span className="text-xs font-normal text-muted">Mahasiswa</span>
                </span>
              </div>
              <div className="border border-hairline bg-surface-soft p-4 shadow-sm">
                <span className="block text-[10px] font-bold uppercase text-muted tracking-wider">Rasio Kelulusan</span>
                <span className="block text-2xl font-black text-purple-500 mt-1">{recruitmentStats.total > 0 ? ((recruitmentStats.lolos / recruitmentStats.total) * 100).toFixed(1) : 0}%</span>
              </div>
            </div>

            {/* ─── KONTROL FILTER EVENT REKRUTMEN ─── */}
            <div className="border border-hairline bg-surface-soft p-5 space-y-4 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Filter Berdasarkan Event di Database */}
                <div className="space-y-1 w-full md:max-w-md">
                  <label className="text-[10px] font-bold uppercase tracking-wide text-body-strong block">Pilih Event Rekrutmen (Database Query):</label>
                  <select
                    onChange={(e) => console.log(`Querying database for event ID: ${e.target.value}`)}
                    className="w-full mt-1.5 border border-hairline bg-canvas px-3 py-2 text-xs font-mono font-bold uppercase text-on-dark focus:outline-hidden focus:border-m-blue-dark cursor-pointer"
                  >
                    <option value="bdv-panitia">PANITIA BISDIG VOLUTION 5.0 (ACTIVE)</option>
                    <option value="bdv-peserta">REGISTRASI PESERTA BDV 5.0 (SOON)</option>
                    <option value="digi-panitia">PANITIA DIGITAL FESTIVAL (SOON)</option>
                  </select>
                </div>

                {/* Filter Berdasarkan Status */}
                <div className="flex gap-2 self-end w-full md:w-auto justify-end">
                  {["Semua", "Pending", "Lolos", "Ditolak"].map((status) => (
                    <button
                      key={status}
                      onClick={() => console.log(`Filter status: ${status}`)}
                      className="px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider border border-hairline transition-all bg-canvas hover:bg-surface-soft text-on-dark cursor-pointer focus:bg-m-blue-dark focus:text-white"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── TABLE MANIFEST PENDAFTAR REAL-TIME ─── */}
            <div className="border border-hairline bg-surface-soft shadow-md overflow-hidden">
              <div className="p-4 border-b border-hairline bg-canvas/40 flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-wider text-m-blue-light">👥 Manifes Pendaftar Aktif — Terhubung ke Database</h3>
                <span className="text-[10px] text-muted font-mono bg-canvas border border-hairline px-2 py-0.5 rounded-xs">Live Sync Engine</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-canvas border-b border-hairline text-[10px] font-bold uppercase tracking-wider text-muted font-mono">
                      <th className="p-3 pl-5">Nama / Informasi Mhs</th>
                      <th className="p-3">NIM & Kelas</th>
                      <th className="p-3">Pilihan Divisi</th>
                      <th className="p-3">Dokumen Pendukung</th>
                      <th className="p-3">Status Saat Ini</th>
                      <th className="p-3 text-center">Aksi Mutasi</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs font-light divide-y divide-hairline bg-surface-soft">
                    {applicants && applicants.length > 0 ? (
                      applicants.map((applicant) => (
                        <tr key={applicant.id} className="hover:bg-canvas/30 transition-colors">
                          <td className="p-3 pl-5 font-medium text-on-dark">
                            {applicant.nama}
                            <span className="block text-[9px] font-mono text-muted italic mt-0.5">Timestamp: {new Date(applicant.createdAt).toLocaleString("id-ID")}</span>
                          </td>
                          <td className="p-3 font-mono">
                            {applicant.nim}
                            <span className="block text-[10px] text-muted font-sans font-normal mt-0.5">S1 Bisnis Digital</span>
                          </td>
                          <td className="p-3">
                            <span className="bg-m-blue-dark/10 border border-m-blue-light/30 px-2 py-0.5 text-[10px] font-bold font-mono text-body-strong uppercase">{applicant.divisiPilihan || "N/A"}</span>
                          </td>
                          <td className="p-3">
                            <a href="#" className="text-m-blue-light font-medium underline text-[11px] hover:text-m-blue-dark">
                              File_Dokumen.pdf ↗
                            </a>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 text-[9px] font-bold uppercase font-mono ${
                                applicant.statusSeleksi === "PENDING"
                                  ? "bg-amber-500/10 border border-amber-500/30 text-amber-600"
                                  : applicant.statusSeleksi === "LOLOS"
                                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-600"
                                    : "bg-m-red/10 border border-m-red/30 text-m-red"
                              }`}
                            >
                              {applicant.statusSeleksi}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {applicant.statusSeleksi !== "LOLOS" && applicant.statusSeleksi !== "DITOLAK" && (
                                <>
                                  <button onClick={() => handleUpdateRecruitmentStatus(applicant.id, "LOLOS")} className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[9px] font-bold uppercase cursor-pointer">
                                    Lolos
                                  </button>
                                  <button onClick={() => handleUpdateRecruitmentStatus(applicant.id, "DITOLAK")} className="px-2 py-1 bg-m-red hover:bg-red-700 text-white font-mono text-[9px] font-bold uppercase cursor-pointer">
                                    Tolak
                                  </button>
                                </>
                              )}
                              {(applicant.statusSeleksi === "LOLOS" || applicant.statusSeleksi === "DITOLAK") && (
                                <button
                                  onClick={() => handleUpdateRecruitmentStatus(applicant.id, "PENDING")}
                                  className="px-2 py-1 bg-canvas border border-hairline hover:bg-surface-soft text-muted font-mono text-[9px] font-bold uppercase cursor-pointer"
                                >
                                  Reset
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-4 px-2 text-center text-muted text-sm">
                          Belum ada pendaftar
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
