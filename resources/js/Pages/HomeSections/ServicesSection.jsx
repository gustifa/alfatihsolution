import React, { useState } from "react";

export default function ServicesSection({ services = [], onSelectService }) {
  const [selectedDetail, setSelectedDetail] = useState(null);

  if (!services || services.length === 0) return null;

  return (
    <section id="layanan" className="py-20 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            Layanan Kami
          </h2>
          <p className="text-3xl font-extrabold text-slate-900">
            Solusi Handal Sesuai Kebutuhan Anda
          </p>
        </div>

        {/* Gunakan flex flex-wrap justify-center agar 1, 2, atau 3 kartu selalu rata tengah */}
        <div className="flex flex-wrap justify-center gap-8">
          {services.map((item) => (
            <div
              key={item.id}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-sm p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:shadow-xl transition flex flex-col justify-between"
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

              <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 mt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDetail(item)}
                  className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition"
                >
                  <span>🔍</span> Lihat Detail
                </button>
                <a
                  href="#kontak"
                  onClick={() => onSelectService(item.id)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Pesan &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Pop-up Detail Layanan */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                  {selectedDetail.icon || "⚙️"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {selectedDetail.nama_layanan}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 uppercase">
                    {selectedDetail.kategori || "Layanan"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedDetail(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <h4 className="font-bold text-slate-800 mb-1">
                  Deskripsi Singkat:
                </h4>
                <p className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                  {selectedDetail.deskripsi_singkat}
                </p>
              </div>

              {selectedDetail.deskripsi_lengkap && (
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">
                    Rincian & Garansi Layanan:
                  </h4>
                  <div
                    className="prose prose-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: selectedDetail.deskripsi_lengkap,
                    }}
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedDetail(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Tutup
              </button>
              <a
                href="#kontak"
                onClick={() => {
                  onSelectService(selectedDetail.id);
                  setSelectedDetail(null);
                }}
                className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/20 transition"
              >
                Pesan Layanan Ini
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
