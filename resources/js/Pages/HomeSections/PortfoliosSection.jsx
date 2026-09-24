import React from "react";

export default function PortfoliosSection({ portfolios = [] }) {
  if (!portfolios || portfolios.length === 0) return null;

  return (
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

        {/* Selalu rata tengah untuk 1, 2, atau banyak data */}
        <div className="flex flex-wrap justify-center gap-8">
          {portfolios.map((porto) => (
            <div
              key={porto.id}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <div className="h-48 bg-slate-100 overflow-hidden relative">
                  {porto.gambar_utama ? (
                    <img
                      src={
                        porto.gambar_utama.startsWith("http") ||
                        porto.gambar_utama.startsWith("/storage/")
                          ? porto.gambar_utama
                          : `/storage/${porto.gambar_utama}`
                      }
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
          ))}
        </div>
      </div>
    </section>
  );
}
