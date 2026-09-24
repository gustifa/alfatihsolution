import React from "react";

export default function ProductsSection({ products = [] }) {
  if (!products || products.length === 0) return null;

  return (
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

        {/* Selalu rata tengah untuk 1, 2, atau banyak data */}
        <div className="flex flex-wrap justify-center gap-8">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition flex flex-col justify-between"
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
                  prod.file_utama ? `/storage/${prod.file_utama}` : "#kontak"
                }
                download={!!prod.file_utama}
                className="w-full text-center py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition"
              >
                {prod.is_free ? "Unduh Modul" : "Pesan Modul Ini"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
