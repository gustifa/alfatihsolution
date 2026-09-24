import React from "react";

export default function TestimonialsSection({ testimonials = [] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
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

        {/* Selalu rata tengah untuk 1, 2, atau banyak data */}
        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-slate-50 p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between"
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
                  {testi.nama_klien
                    ? testi.nama_klien.charAt(0).toUpperCase()
                    : "K"}
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
          ))}
        </div>
      </div>
    </section>
  );
}
