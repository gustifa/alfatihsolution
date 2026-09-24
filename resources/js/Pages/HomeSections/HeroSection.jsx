import React from "react";

export default function HeroSection({ company, onOpenTracking }) {
  return (
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
            onClick={onOpenTracking}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-sm rounded-2xl shadow-sm transition flex items-center justify-center gap-2"
          >
            <span>🛠️</span> Cek Status Nota Servis
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 pt-10 border-t border-slate-200">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 text-left shadow-sm hover:-translate-y-1 hover:shadow-md transition transform">
            <span className="text-2xl mb-1 block">💻</span>
            <h4 className="font-bold text-slate-900 text-sm">Website Modern</h4>
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
            <h4 className="font-bold text-slate-900 text-sm">Modul Ajar IT</h4>
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
  );
}
