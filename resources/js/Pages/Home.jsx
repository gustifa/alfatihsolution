import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function Home({
  profil = null,
  services = [],
  portfolios = [],
  products = [],
  testimonials = [],
  posts = [],
}) {
  // Data Profil Perusahaan
  const company = {
    nama: profil?.nama || "Al-Fatih Solution",
    slogan: profil?.slogan || "Software House & IT Solution",
    alamat: profil?.alamat || "Bukittinggi, Sumatera Barat",
    telepon: profil?.telepon || "081234567890",
    email: profil?.email || "admin@alfatihsolution.com",
    heroTagline:
      profil?.hero_tagline ||
      "Solusi Pembuatan Web, Aplikasi, Modul Ajar & Servis IT",
    heroTitle:
      profil?.hero_title ||
      "Tingkatkan Produktivitas Digital & Kebutuhan Teknologi Anda",
    heroSubtitle:
      profil?.hero_subtitle ||
      "Mulai dari perancangan website profesional, aplikasi khusus kasir/sekolah, modul kurikulum merdeka siap pakai, hingga perbaikan komputer transparan dengan tracking nota online.",
    whatsapp: profil?.whatsapp_admin || "6281234567890",
  };

  // State Navigasi & Modal
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modalTracking, setModalTracking] = useState(false);

  // State Tracking Servis
  const [noTiket, setNoTiket] = useState("");
  const [loadingTrack, setLoadingTrack] = useState(false);
  const [trackResult, setTrackResult] = useState(null);

  // State Form Pemesanan
  const [formOrder, setFormOrder] = useState({
    nama_klien: "",
    no_whatsapp: "",
    service_id: "",
    catatan_kebutuhan: "",
  });
  const [loadingOrder, setLoadingOrder] = useState(false);

  // Handler Cek Tiket Servis dengan SweetAlert2
  const handleCheckTicket = async (e) => {
    e.preventDefault();

    if (!noTiket.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Nomor Tiket Kosong",
        text: "Harap masukkan nomor tiket servis yang tertera di nota Anda!",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    setLoadingTrack(true);
    setTrackResult(null);

    try {
      const token =
        document
          .querySelector('meta[name="csrf-token"]')
          ?.getAttribute("content") || "";
      const res = await fetch("/track-service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify({ no_tiket: noTiket }),
      });

      const json = await res.json();
      if (res.ok) {
        setTrackResult(json.data);
        Swal.fire({
          icon: "success",
          title: "Tiket Ditemukan!",
          text: `Perangkat: ${json.data.perangkat} - Status: ${json.data.status_servis}`,
          timer: 2500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Tidak Ditemukan",
          text: json.message || "Nomor tiket tidak terdaftar dalam sistem.",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gangguan Jaringan",
        text: "Gagal menghubungkan ke server. Silakan coba kembali nanti.",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoadingTrack(false);
    }
  };

  // Handler Kirim Form Konsultasi dengan Validasi SweetAlert2
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    // Validasi format nomor WhatsApp
    const waPattern = /^(08|628|\+628)[0-9]{8,13}$/;
    if (!waPattern.test(formOrder.no_whatsapp.trim())) {
      Swal.fire({
        icon: "warning",
        title: "Nomor WhatsApp Tidak Valid",
        text: "Gunakan awalan 08 atau 628 (contoh: 081234567890).",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    // Konfirmasi sebelum pengalihan
    const confirmResult = await Swal.fire({
      title: "Kirim Permintaan Konsultasi?",
      text: "Data Anda akan disimpan dan diteruskan otomatis ke tim WhatsApp kami.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Sambungkan ke WA!",
      cancelButtonText: "Batal",
    });

    if (!confirmResult.isConfirmed) return;

    setLoadingOrder(true);

    try {
      const token =
        document
          .querySelector('meta[name="csrf-token"]')
          ?.getAttribute("content") || "";
      const res = await fetch("/order-konsultasi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        body: JSON.stringify(formOrder),
      });

      const data = await res.json();
      if (data.redirect_wa) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Membuka WhatsApp Admin Al-Fatih Solution...",
          timer: 1500,
          showConfirmButton: false,
        });

        // Reset form
        setFormOrder({
          nama_klien: "",
          no_whatsapp: "",
          service_id: "",
          catatan_kebutuhan: "",
        });

        setTimeout(() => {
          window.open(data.redirect_wa, "_blank");
        }, 1000);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Pengiriman Gagal",
        text: "Terjadi kendala saat menyimpan data pesanan Anda.",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoadingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-blue-600 selection:text-white relative">
      <Head title={`${company.nama} | ${company.slogan}`} />

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
              {company.nama.charAt(0)}
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight block leading-none">
                {company.nama}
              </span>
              <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">
                {company.slogan}
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#layanan" className="hover:text-blue-600 transition">
              Layanan
            </a>
            <a href="#portofolio" className="hover:text-blue-600 transition">
              Portofolio
            </a>
            <a href="#modul" className="hover:text-blue-600 transition">
              Modul Ajar
            </a>
            {posts.length > 0 && (
              <a href="#informasi" className="hover:text-blue-600 transition">
                Informasi
              </a>
            )}
            <a href="#testimoni" className="hover:text-blue-600 transition">
              Testimoni
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setModalTracking(true)}
              className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-2 border border-slate-200"
            >
              <span>🔍</span> Lacak Servis
            </button>
            <a
              href="#kontak"
              className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition"
            >
              Konsultasi Gratis
            </a>
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-white border-b border-slate-200 px-6 pt-3 pb-6 space-y-3">
            <a
              onClick={() => setMobileMenu(false)}
              href="#layanan"
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              Layanan Jasa
            </a>
            <a
              onClick={() => setMobileMenu(false)}
              href="#portofolio"
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              Portofolio
            </a>
            <a
              onClick={() => setMobileMenu(false)}
              href="#modul"
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              Modul Ajar
            </a>
            {posts.length > 0 && (
              <a
                onClick={() => setMobileMenu(false)}
                href="#informasi"
                className="block py-2 text-sm font-semibold text-slate-700"
              >
                Pusat Informasi
              </a>
            )}
            <a
              onClick={() => setMobileMenu(false)}
              href="#testimoni"
              className="block py-2 text-sm font-semibold text-slate-700"
            >
              Testimoni
            </a>
            <button
              onClick={() => {
                setModalTracking(true);
                setMobileMenu(false);
              }}
              className="w-full text-left py-2.5 text-sm font-bold text-blue-600 flex items-center gap-2"
            >
              🔍 Cek Status Servis
            </button>
            <a
              onClick={() => setMobileMenu(false)}
              href="#kontak"
              className="block w-full text-center py-3 bg-blue-600 text-white font-bold text-sm rounded-xl"
            >
              Mulai Konsultasi
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            {company.heroTagline}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            {company.heroTitle}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {company.heroSubtitle}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#kontak"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
            >
              Pesan Layanan / Konsultasi &rarr;
            </a>
            <button
              onClick={() => setModalTracking(true)}
              className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-sm rounded-2xl shadow-sm transition flex items-center justify-center gap-2"
            >
              <span>🛠️</span> Cek Status Nota Servis
            </button>
          </div>

          {/* 4 Kartu Mini */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-10 border-t border-slate-200">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 text-left shadow-sm hover:-translate-y-1 hover:shadow-md transition transform">
              <span className="text-2xl mb-1 block">💻</span>
              <h4 className="font-bold text-slate-900 text-sm">
                Website Modern
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Sekolah, UMKM, Portal
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 text-left shadow-sm hover:-translate-y-1 hover:shadow-md transition transform">
              <span className="text-2xl mb-1 block">📱</span>
              <h4 className="font-bold text-slate-900 text-sm">
                Aplikasi Khusus
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Sistem Kasir & Presensi
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 text-left shadow-sm hover:-translate-y-1 hover:shadow-md transition transform">
              <span className="text-2xl mb-1 block">📚</span>
              <h4 className="font-bold text-slate-900 text-sm">
                Modul Ajar IT
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Materi & LKPD Lengkap
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 text-left shadow-sm hover:-translate-y-1 hover:shadow-md transition transform">
              <span className="text-2xl mb-1 block">🛠️</span>
              <h4 className="font-bold text-slate-900 text-sm">
                Servis & Jaringan
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pantau Nota Online
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: LAYANAN */}
      <section
        id="layanan"
        className="py-20 bg-white border-y border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Layanan Kami
            </h2>
            <p className="text-3xl font-extrabold text-slate-900">
              Solusi Handal Sesuai Kebutuhan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.length > 0 ? (
              services.map((item) => (
                <div
                  key={item.id}
                  className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition flex flex-col justify-between"
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl mb-6">
                      {item.icon ? <span>{item.icon}</span> : "⚙️"}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {item.nama_layanan}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {item.deskripsi_singkat}
                    </p>
                  </div>
                  <a
                    href="#kontak"
                    onClick={() =>
                      setFormOrder((prev) => ({ ...prev, service_id: item.id }))
                    }
                    className="text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    Pesan Layanan &rarr;
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-8 text-xs text-slate-400">
                Belum ada data layanan di database.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION: PORTOFOLIO */}
      <section id="portofolio" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                Showcase Pekerjaan
              </h2>
              <p className="text-3xl font-extrabold text-slate-900">
                Portofolio Proyek Terselesaikan
              </p>
            </div>
            <p className="text-xs text-slate-500 max-w-sm mt-2 md:mt-0">
              Bukti hasil pengerjaan proyek dari berbagai klien dan mitra yang
              telah kami layani.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolios.length > 0 ? (
              portfolios.map((porto) => (
                <div
                  key={porto.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 bg-slate-100 overflow-hidden relative">
                      {porto.gambar_utama ? (
                        <img
                          src={`/storage/${porto.gambar_utama}`}
                          alt={porto.judul_proyek}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-sm bg-slate-100">
                          Project Demo
                        </div>
                      )}
                      <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 bg-white/90 backdrop-blur rounded-lg shadow-sm text-slate-800">
                        {porto.service?.nama_layanan || "Project"}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-base font-bold text-slate-900 mb-2">
                        {porto.judul_proyek}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {porto.deskripsi}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    {porto.url_demo && (
                      <a
                        href={porto.url_demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                      >
                        Kunjungi Demo Proyek &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-xs text-slate-400">
                Belum ada portofolio yang ditampilkan.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION: MODUL AJAR */}
      <section id="modul" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2">
              Bahan Pembelajaran
            </h2>
            <p className="text-3xl font-extrabold text-slate-900">
              Katalog Modul Ajar & Materi IT
            </p>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Daftar modul yang dapat langsung diunduh atau dipesan sesuai fase
              dan capaian belajar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg uppercase tracking-wider">
                        {prod.tipe}
                      </span>
                      <span
                        className={`text-xs font-bold ${prod.is_free ? "text-emerald-600" : "text-slate-900"}`}
                      >
                        {prod.is_free
                          ? "GRATIS"
                          : `Rp ${Number(prod.harga).toLocaleString("id-ID")}`}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">
                      {prod.nama_produk}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 mb-6">
                      {prod.deskripsi}
                    </p>
                  </div>
                  <a
                    href={
                      prod.file_utama
                        ? `/storage/${prod.file_utama}`
                        : "#kontak"
                    }
                    download={!!prod.file_utama}
                    className="w-full text-center py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition"
                  >
                    {prod.is_free ? "Unduh Modul" : "Pesan Modul Ini"}
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-xs text-slate-400">
                Belum ada modul produk yang diunggah.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION: INFORMASI (POSTS) */}
      {posts.length > 0 && (
        <section
          id="informasi"
          className="py-20 bg-slate-50 border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                Edukasi & Berita
              </h2>
              <p className="text-3xl font-extrabold text-slate-900">
                Pusat Informasi & Tips Teknologi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {post.image ? (
                      <img
                        src={`/storage/${post.image}`}
                        alt={post.title}
                        className="w-full h-44 object-cover"
                      />
                    ) : (
                      <div className="w-full h-44 bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">
                        {company.nama}
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-base font-bold text-slate-900 mt-1 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {post.content
                          ? post.content.replace(/<[^>]*>?/gm, "")
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION: TESTIMONI */}
      <section id="testimoni" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Ulasan Klien
            </h2>
            <p className="text-3xl font-extrabold text-slate-900">
              Kepuasan Klien Prioritas Kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((testi) => (
                <div
                  key={testi.id}
                  className="bg-slate-50 p-7 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex text-amber-400 text-sm mb-3">
                      {"★".repeat(testi.rating || 5)}
                    </div>
                    <p className="text-xs text-slate-600 italic leading-relaxed mb-6">
                      "{testi.pesan_testimoni}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                      {testi.nama_klien ? testi.nama_klien.charAt(0) : "K"}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {testi.nama_klien}
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        {testi.jabatan}{" "}
                        {testi.perusahaan_instansi
                          ? `• ${testi.perusahaan_instansi}`
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-xs text-slate-400">
                Belum ada testimoni dari klien.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION: FORM KONTAK & PESANAN */}
      <section id="kontak" className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 block">
                Konsultasi Terpadu
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Konsultasikan Kebutuhan Anda dengan Tim Ahli Kami
              </h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-lg">
                Silakan pilih layanan yang Anda butuhkan melalui formulir
                berikut. Data pemesanan akan otomatis tersimpan dan langsung
                terhubung ke admin via WhatsApp untuk penanganan cepat.
              </p>

              <div className="mt-8 space-y-4 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-blue-400 font-bold">
                    📍
                  </span>
                  <span>{company.alamat}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-blue-400 font-bold">
                    💬
                  </span>
                  <span>Jam Layanan: 08.00 - 21.00 WIB (Senin - Sabtu)</span>
                </div>
              </div>
            </div>

            {/* Form Konsultasi Dinamis */}
            <div className="bg-white text-slate-800 p-8 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                Formulir Pesanan & Konsultasi
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Isi formulir ringkas ini untuk terhubung langsung ke WhatsApp
                tim teknis kami.
              </p>

              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nama Lengkap / Instansi
                  </label>
                  <input
                    type="text"
                    required
                    value={formOrder.nama_klien}
                    onChange={(e) =>
                      setFormOrder({ ...formOrder, nama_klien: e.target.value })
                    }
                    placeholder="Contoh: Pak Budi / SMK 1"
                    className="w-full text-xs px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nomor WhatsApp Aktif
                  </label>
                  <input
                    type="tel"
                    required
                    value={formOrder.no_whatsapp}
                    onChange={(e) =>
                      setFormOrder({
                        ...formOrder,
                        no_whatsapp: e.target.value,
                      })
                    }
                    placeholder="08xxxxxxxxxx"
                    className="w-full text-xs px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Pilihan Layanan
                  </label>
                  <select
                    required
                    value={formOrder.service_id}
                    onChange={(e) =>
                      setFormOrder({ ...formOrder, service_id: e.target.value })
                    }
                    className="w-full text-xs px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="">
                      -- Pilih Layanan yang Dibutuhkan --
                    </option>
                    {services.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama_layanan}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Deskripsi Kebutuhan Singkat
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formOrder.catatan_kebutuhan}
                    onChange={(e) =>
                      setFormOrder({
                        ...formOrder,
                        catatan_kebutuhan: e.target.value,
                      })
                    }
                    placeholder="Sebutkan detail kebutuhan atau kendala perangkat Anda..."
                    className="w-full text-xs px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingOrder}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  {loadingOrder
                    ? "Menghubungkan..."
                    : "Kirim & Sambungkan ke WhatsApp →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} {company.nama}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/admin/login"
              className="text-slate-400 hover:text-white transition"
            >
              Masuk Panel Admin
            </a>
            <a
              href="#layanan"
              className="text-slate-400 hover:text-white transition"
            >
              Layanan
            </a>
            <a
              href="#kontak"
              className="text-slate-400 hover:text-white transition"
            >
              Bantuan
            </a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/${company.whatsapp}?text=Halo%20Admin%20${encodeURIComponent(company.nama)},%20saya%20ingin%20konsultasi%20layanan`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-110 transition-transform"
        title="Hubungi Admin via WhatsApp"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.101.005.232-.038.362.275.145.346.491 1.198.534 1.285.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.125.556 4.122 1.523 5.864l-1.623 5.964 6.136-1.609c1.678.916 3.597 1.436 5.632 1.436 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>

      {/* MODAL LACAK SERVIS */}
      {modalTracking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>🔍</span> Lacak Status Servis Perangkat
              </h3>
              <button
                onClick={() => setModalTracking(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Ketikkan nomor tiket servis Anda yang tertera di nota perbaikan.
            </p>

            <form onSubmit={handleCheckTicket} className="flex gap-2 mb-4">
              <input
                type="text"
                required
                value={noTiket}
                onChange={(e) => setNoTiket(e.target.value.toUpperCase())}
                placeholder="Contoh: SRV-2026-001"
                className="flex-1 text-xs px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none uppercase font-semibold"
              />
              <button
                type="submit"
                disabled={loadingTrack}
                className="px-5 py-3 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition"
              >
                {loadingTrack ? "..." : "Lacak"}
              </button>
            </form>

            {/* Hasil Lacak */}
            {trackResult && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2.5">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Nomor Tiket:</span>
                  <span className="font-bold text-slate-900">
                    {trackResult.no_tiket}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Perangkat:</span>
                  <span className="font-bold text-slate-900">
                    {trackResult.perangkat}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Status Servis:</span>
                  <span className="px-2.5 py-0.5 rounded-md font-bold uppercase text-[10px] bg-blue-100 text-blue-700">
                    {trackResult.status_servis}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Total Biaya:</span>
                  <span className="font-bold text-slate-900">
                    {trackResult.biaya} ({trackResult.status_bayar})
                  </span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500 block mb-1">
                    Catatan Pengerjaan:
                  </span>
                  <p className="font-medium text-slate-700 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                    {trackResult.tindakan}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
