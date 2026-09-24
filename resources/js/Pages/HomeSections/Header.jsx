import React from "react";

export default function Header({
  company,
  postsCount = 0,
  onOpenTracking,
  mobileMenu,
  setMobileMenu,
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo & Identitas */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            {company?.nama ? company.nama.charAt(0).toUpperCase() : "A"}
          </div>
          <div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight block leading-none">
              {company?.nama || "Al-Fatih Solution"}
            </span>
            <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase">
              {company?.slogan || "Software House & IT Solution"}
            </span>
          </div>
        </a>

        {/* Navigasi Desktop */}
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
          {postsCount > 0 && (
            <a href="#informasi" className="hover:text-blue-600 transition">
              Informasi
            </a>
          )}
          <a href="#testimoni" className="hover:text-blue-600 transition">
            Testimoni
          </a>
        </nav>

        {/* Tombol Aksi Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenTracking}
            className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-2 border border-slate-200 shadow-sm"
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

        {/* Hamburger Button (Mobile) */}
        <button
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenu ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Dropdown (Mobile) */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            onClick={() => setMobileMenu(false)}
            href="#layanan"
            className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition"
          >
            Layanan Jasa
          </a>
          <a
            onClick={() => setMobileMenu(false)}
            href="#portofolio"
            className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition"
          >
            Portofolio Proyek
          </a>
          <a
            onClick={() => setMobileMenu(false)}
            href="#modul"
            className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition"
          >
            Katalog Modul Ajar
          </a>
          {postsCount > 0 && (
            <a
              onClick={() => setMobileMenu(false)}
              href="#informasi"
              className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition"
            >
              Pusat Informasi
            </a>
          )}
          <a
            onClick={() => setMobileMenu(false)}
            href="#testimoni"
            className="block py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition"
          >
            Ulasan & Testimoni
          </a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                onOpenTracking();
                setMobileMenu(false);
              }}
              className="w-full text-left py-2.5 px-3 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl flex items-center gap-2"
            >
              <span>🔍</span> Cek Status Servis
            </button>
            <a
              onClick={() => setMobileMenu(false)}
              href="#kontak"
              className="block w-full text-center py-3 bg-blue-600 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-600/20"
            >
              Mulai Konsultasi
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
