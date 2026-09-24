import React from "react";

export default function ProductsSection({ products = [], company = null }) {
  if (!products || products.length === 0) return null;

  // Nomor WhatsApp Admin (default jika tidak ada di profil)
  const adminPhone = company?.whatsapp || "6281234567890";

  // Format pesan WhatsApp pemesanan modul
  const getOrderWhatsAppUrl = (item) => {
    const textMessage =
      `Halo Admin ${company?.nama || "Al-Fatih Solution"}, saya ingin memesan modul ajar berikut:\n\n` +
      `*Nama Modul:* ${item.nama_produk}\n` +
      `*Tipe:* ${item.tipe}\n` +
      `*Harga:* ${item.is_free ? "GRATIS" : `Rp ${Number(item.harga).toLocaleString("id-ID")}`}\n\n` +
      `Mohon informasi cara pemesanan dan pengirimannya. Terima kasih.`;

    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(textMessage)}`;
  };

  return (
    <section id="modul" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bagian */}
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

        {/* Kontainer Kartu: Otomatis Rata Tengah (1, 2, atau Banyak Data) */}
        <div className="flex flex-wrap justify-center gap-8">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-slate-50 rounded-3xl p-7 border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg uppercase tracking-wider">
                    {prod.tipe || "Modul Ajar"}
                  </span>
                  <span
                    className={`text-sm font-extrabold ${prod.is_free ? "text-emerald-600" : "text-slate-900"}`}
                  >
                    {prod.is_free
                      ? "GRATIS"
                      : `Rp ${Number(prod.harga).toLocaleString("id-ID")}`}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {prod.nama_produk}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-6">
                  {prod.deskripsi}
                </p>
              </div>

              {/* Tombol Aksi: Download (jika gratis) atau Order WA (jika berbayar) */}
              <div>
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
          ))}
        </div>
      </div>
    </section>
  );
}
