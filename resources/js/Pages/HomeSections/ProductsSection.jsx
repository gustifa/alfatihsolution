import React from "react";

export default function ProductsSection({ products = [], company = null }) {
  if (!products || products.length === 0) return null;

  // Ambil nomor WhatsApp admin
  const rawPhone =
    company?.whatsapp ||
    company?.whatsapp_admin ||
    company?.no_wa ||
    company?.telepon ||
    "6281234567890";
  const adminPhone = String(rawPhone)
    .replace(/[^0-9]/g, "")
    .replace(/^0/, "62");

  // Format pesan order WhatsApp
  const getOrderWhatsAppUrl = (item) => {
    const textMessage =
      `Halo Admin ${company?.nama || "Al-Fatih Solution"}, saya ingin memesan modul ajar berikut:\n\n` +
      `*Nama Modul:* ${item.nama_produk}\n` +
      `*Tipe:* ${item.tipe}\n` +
      `*Harga:* ${item.is_free ? "GRATIS" : `Rp ${Number(item.harga).toLocaleString("id-ID")}`}\n\n` +
      `Mohon informasi pembayaran dan pengirimannya. Terima kasih.`;

    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(textMessage)}`;
  };

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

        {/* Kontainer Kartu Modul */}
        <div className="flex flex-wrap justify-center gap-8">
          {products.map((prod) => {
            const imageCover = prod.cover_buku;

            return (
              <div
                key={prod.id}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* COVER BUKU */}
                  <div className="relative h-60 w-full bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 flex items-center justify-center overflow-hidden p-6">
                    {imageCover ? (
                      <img
                        src={
                          imageCover.startsWith("http") ||
                          imageCover.startsWith("/storage/")
                            ? imageCover
                            : `/storage/${imageCover}`
                        }
                        alt={prod.nama_produk}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      /* Mockup Buku jika belum diupload */
                      <div className="relative w-36 h-48 bg-white rounded-r-xl rounded-l-sm shadow-2xl p-4 flex flex-col justify-between border-l-4 border-emerald-800 transform group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-300">
                        <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-slate-200"></div>
                        <div>
                          <span className="text-[8px] font-black uppercase tracking-wider text-emerald-600 block mb-1">
                            {prod.tipe || "E-BOOK"}
                          </span>
                          <h4 className="text-[11px] font-extrabold text-slate-800 line-clamp-3 leading-tight">
                            {prod.nama_produk}
                          </h4>
                        </div>
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[8px] font-bold text-slate-400">
                            Kurikulum IT
                          </span>
                          <span className="text-sm">📖</span>
                        </div>
                      </div>
                    )}

                    {/* Badge Tipe */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] font-bold px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-emerald-800 shadow-sm uppercase tracking-wider">
                        {prod.tipe || "Modul Ajar"}
                      </span>
                    </div>

                    {/* Badge Harga */}
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className={`text-xs font-black px-3 py-1 rounded-lg backdrop-blur shadow-sm ${
                          prod.is_free
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-900/80 text-amber-300 border border-white/10"
                        }`}
                      >
                        {prod.is_free
                          ? "GRATIS"
                          : `Rp ${Number(prod.harga).toLocaleString("id-ID")}`}
                      </span>
                    </div>
                  </div>

                  {/* Keterangan */}
                  <div className="p-6">
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {prod.nama_produk}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {prod.deskripsi}
                    </p>
                  </div>
                </div>

                {/* Tombol Aksi */}
                <div className="px-6 pb-6 pt-2">
                  {prod.is_free && prod.file_utama ? (
                    <a
                      href={`/storage/${prod.file_utama}`}
                      download
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
                    >
                      <span>📥</span> Unduh Modul Gratis
                    </a>
                  ) : (
                    <a
                      href={getOrderWhatsAppUrl(prod)}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
                    >
                      <span>💬</span> Pesan Modul Ini
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
