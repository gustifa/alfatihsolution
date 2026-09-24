import React, { useState } from "react";
import Swal from "sweetalert2";

export default function ProductsSection({ products = [], company = null }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  // Link WhatsApp Pemesanan
  const getOrderWhatsAppUrl = (item) => {
    const textMessage =
      `Halo Admin ${company?.nama || "Al-Fatih Solution"}, saya ingin memesan modul pembelajaran berikut:\n\n` +
      `*Nama Modul:* ${item.nama_produk}\n` +
      `*Tipe:* ${item.tipe || "Modul Ajar"}\n` +
      `*Jenjang:* ${item.tingkat_jenjang || "-"}\n` +
      `*Harga:* ${item.is_free ? "GRATIS" : `Rp ${Number(item.harga).toLocaleString("id-ID")}`}\n\n` +
      `Mohon info ketersediaan dan cara pembayarannya. Terima kasih.`;

    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(textMessage)}`;
  };

  // Fitur Bagikan / Share Modul Beserta File Gambar Sampul
  const handleShare = async (item) => {
    const shareUrl = window.location.origin + "#modul";
    const shareText = `📚 *${item.nama_produk}*\n${item.deskripsi ? item.deskripsi.substring(0, 100) + "..." : ""}\n\nCek selengkapnya di: ${shareUrl}`;

    const rawImage = item.cover_buku || item.gambar || item.thumbnail;
    const imageUrl = rawImage
      ? rawImage.startsWith("http") || rawImage.startsWith("/storage/")
        ? rawImage
        : `/storage/${rawImage}`
      : null;

    try {
      let shareFiles = [];

      if (imageUrl) {
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const fileType = blob.type || "image/jpeg";
          const fileExt = fileType.split("/")[1] || "jpg";
          const file = new File(
            [blob],
            `cover-${item.slug || "modul"}.${fileExt}`,
            {
              type: fileType,
            },
          );
          shareFiles = [file];
        } catch (err) {
          console.warn(
            "Gagal memuat gambar untuk share, melanjutkan share teks saja.",
            err,
          );
        }
      }

      const shareData = {
        title: item.nama_produk,
        text: shareText,
        url: shareUrl,
      };

      if (
        shareFiles.length > 0 &&
        navigator.canShare &&
        navigator.canShare({ files: shareFiles })
      ) {
        shareData.files = shareFiles;
      }

      if (
        navigator.share &&
        (!shareData.files ||
          (navigator.canShare && navigator.canShare(shareData)))
      ) {
        await navigator.share(shareData);
        return;
      }

      throw new Error("Web Share API tidak didukung");
    } catch (err) {
      if (err.name !== "AbortError") {
        navigator.clipboard.writeText(shareText);
        Swal.fire({
          icon: "success",
          title: "Tautan & Ringkasan Disalin!",
          text: "Detail modul telah disalin ke clipboard. Siap dibagikan ke media sosial atau WhatsApp.",
          timer: 2500,
          showConfirmButton: false,
        });
      }
    }
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

        {/* Grid Kartu Modul */}
        <div className="flex flex-wrap justify-center gap-8">
          {products.map((prod) => {
            const imageCover = prod.cover_buku;

            return (
              <div
                key={prod.id}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Cover / Mockup Buku */}
                  <div className="relative h-64 w-full bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 flex items-center justify-center overflow-hidden p-6">
                    {imageCover ? (
                      <img
                        src={
                          imageCover.startsWith("http") ||
                          imageCover.startsWith("/storage/")
                            ? imageCover
                            : `/storage/${imageCover}`
                        }
                        alt={prod.nama_produk}
                        className="h-48 w-36 object-cover rounded-r-lg rounded-l-sm shadow-2xl border-l-4 border-emerald-950 group-hover:scale-105 group-hover:-rotate-1 transition-transform duration-300"
                      />
                    ) : (
                      <div className="relative w-36 h-48 bg-white rounded-r-xl rounded-l-sm shadow-2xl p-4 flex flex-col justify-between border-l-4 border-emerald-800 transform group-hover:-translate-y-1 group-hover:rotate-1 transition-all duration-300">
                        <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-slate-200"></div>
                        <div>
                          <span className="text-[8px] font-black uppercase tracking-wider text-emerald-600 block mb-1">
                            {prod.tipe || "MODUL_AJAR"}
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
                        {prod.tipe || "MODUL_AJAR"}
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

                  {/* Info Teks Modul */}
                  <div className="p-6">
                    <h3 className="text-base font-bold text-slate-900 mb-1.5 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                      {prod.nama_produk}
                    </h3>
                    {prod.tingkat_jenjang && (
                      <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mb-2">
                        {prod.tingkat_jenjang}
                      </span>
                    )}
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {prod.deskripsi}
                    </p>

                    {/* Tombol Detail & Share */}
                    <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(prod)}
                        className="text-xs font-bold text-slate-600 hover:text-emerald-600 flex items-center gap-1.5 transition"
                      >
                        <span>🔍</span> Lihat Detail
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShare(prod)}
                        className="text-xs font-semibold text-slate-500 hover:text-emerald-600 flex items-center gap-1.5 transition py-1 px-2.5 rounded-lg hover:bg-slate-100"
                        title="Bagikan Modul Ini"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                          />
                        </svg>
                        Bagikan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tombol Aksi Pesan / Download */}
                <div className="px-6 pb-6">
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

      {/* Modal Pop-up Detail */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl font-bold">
                  📖
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">
                    {selectedProduct.nama_produk}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                      {selectedProduct.tipe || "Modul Ajar"}
                    </span>
                    {selectedProduct.tingkat_jenjang && (
                      <span className="text-[10px] text-slate-500 font-medium">
                        {selectedProduct.tingkat_jenjang}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <h4 className="font-bold text-slate-800 mb-1">
                  Harga Lisensi:
                </h4>
                <p className="text-base font-extrabold text-emerald-600">
                  {selectedProduct.is_free
                    ? "GRATIS"
                    : `Rp ${Number(selectedProduct.harga).toLocaleString("id-ID")}`}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-1">
                  Cakupan Materi & Deskripsi:
                </h4>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 whitespace-pre-line leading-relaxed text-slate-700">
                  {selectedProduct.deskripsi}
                </div>
              </div>

              {selectedProduct.file_preview && (
                <div className="pt-2">
                  <a
                    href={`/storage/${selectedProduct.file_preview}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition border border-blue-200"
                  >
                    <span>📄</span> Buka Preview Sampel (PDF)
                  </a>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleShare(selectedProduct)}
                className="text-xs font-bold text-slate-600 hover:text-emerald-600 flex items-center gap-1.5 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                  />
                </svg>
                Bagikan
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition"
                >
                  Tutup
                </button>
                {selectedProduct.is_free && selectedProduct.file_utama ? (
                  <a
                    href={`/storage/${selectedProduct.file_utama}`}
                    download
                    className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition"
                  >
                    Unduh File
                  </a>
                ) : (
                  <a
                    href={getOrderWhatsAppUrl(selectedProduct)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-600/20 transition"
                  >
                    Pesan Sekarang
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
