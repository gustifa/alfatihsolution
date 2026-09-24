import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Swal from "sweetalert2";

// Import Slices Komponen dari folder HomeSections
import Header from "./HomeSections/Header";
import HeroSection from "./HomeSections/HeroSection";
import ServicesSection from "./HomeSections/ServicesSection";
import PortfoliosSection from "./HomeSections/PortfoliosSection";
import ProductsSection from "./HomeSections/ProductsSection";
import TestimonialsSection from "./HomeSections/TestimonialsSection";
import ContactSection from "./HomeSections/ContactSection";
import TrackingModal from "./HomeSections/TrackingModal";

export default function Home({
  profil = null,
  services = [],
  portfolios = [],
  products = [],
  testimonials = [],
  posts = [],
}) {
  // Normalisasi Data Profil Perusahaan
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
      "Mulai dari perancangan website profesional, aplikasi khusus kasir/sekolah, modul ajar kurikulum siap pakai, hingga perbaikan komputer transparan dengan tracking nota online.",
    whatsapp: profil?.whatsapp_admin || "6281234567890",
  };

  // State UI & Navigasi
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modalTracking, setModalTracking] = useState(false);

  // State Tracking Servis
  const [noTiket, setNoTiket] = useState("");
  const [loadingTrack, setLoadingTrack] = useState(false);
  const [trackResult, setTrackResult] = useState(null);

  // State Formulir Konsultasi & Pesanan
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
        text: "Harap masukkan nomor tiket servis yang tertera di nota perbaikan Anda!",
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
        body: JSON.stringify({ no_tiket: noTiket.trim() }),
      });

      const json = await res.json();
      if (res.ok) {
        setTrackResult(json.data);
        Swal.fire({
          icon: "success",
          title: "Tiket Ditemukan!",
          text: `Perangkat: ${json.data.perangkat} (${json.data.status_servis})`,
          timer: 2500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Tidak Ditemukan",
          text:
            json.message ||
            "Nomor tiket tidak terdaftar dalam sistem data kami.",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gangguan Server",
        text: "Gagal terhubung ke sistem. Silakan coba beberapa saat lagi.",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoadingTrack(false);
    }
  };

  // Handler Submit Pesanan & Hubungkan ke WhatsApp dengan SweetAlert2
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    const waPattern = /^(08|628|\+628)[0-9]{8,13}$/;
    if (!waPattern.test(formOrder.no_whatsapp.trim())) {
      Swal.fire({
        icon: "warning",
        title: "Nomor WhatsApp Tidak Valid",
        text: "Gunakan awalan nomor 08 atau 628 (contoh: 081234567890).",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Kirim Permintaan Konsultasi?",
      text: "Data Anda akan disimpan dan langsung disambungkan ke tim WhatsApp kami.",
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

      {/* 1. Header Navigasi */}
      <Header
        company={company}
        postsCount={posts.length}
        onOpenTracking={() => setModalTracking(true)}
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
      />

      {/* 2. Banner Utama (Hero Section) */}
      <HeroSection
        company={company}
        onOpenTracking={() => setModalTracking(true)}
      />

      {/* 3. Seksi Layanan Jasa */}
      <ServicesSection
        services={services}
        onSelectService={(serviceId) =>
          setFormOrder((prev) => ({ ...prev, service_id: serviceId }))
        }
      />

      {/* 4. Seksi Portofolio Proyek */}
      <PortfoliosSection portfolios={portfolios} />

      {/* 5. Seksi Katalog Modul Ajar & Produk IT */}
      <ProductsSection products={products} />

      {/* 6. Seksi Ulasan & Testimoni Klien */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 7. Formulir Pemesanan & Kontak Konsultasi */}
      <ContactSection
        company={company}
        services={services}
        formOrder={formOrder}
        setFormOrder={setFormOrder}
        onSubmitOrder={handleSubmitOrder}
        loadingOrder={loadingOrder}
      />

      {/* 8. Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} {company.nama}. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-6">
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
              Konsultasi
            </a>
          </div>
        </div>
      </footer>

      {/* 9. Tombol Mengambang WhatsApp (Floating WhatsApp) */}
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

      {/* 10. Modal Interaktif Lacak Servis */}
      <TrackingModal
        isOpen={modalTracking}
        onClose={() => setModalTracking(false)}
        noTiket={noTiket}
        setNoTiket={setNoTiket}
        onCheckTicket={handleCheckTicket}
        loadingTrack={loadingTrack}
        trackResult={trackResult}
      />
    </div>
  );
}
