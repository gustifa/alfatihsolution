import React, { useRef } from "react";

export default function TestimonialsSection({ testimonials = [] }) {
  const scrollContainerRef = useRef(null);

  if (!testimonials || testimonials.length === 0) return null;

  const isCarousel = testimonials.length > 3;

  // Fungsi navigasi geser manual (otomatis menyesuaikan lebar kartu layar HP maupun desktop)
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const card =
        scrollContainerRef.current.querySelector(".testimonial-card");
      const scrollAmount = card ? card.offsetWidth + 24 : 320;
      scrollContainerRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="testimoni" className="py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Judul & Navigasi: Rata tengah di Mobile, Fleksibel di Desktop */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 text-center md:text-left">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              Ulasan Klien
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Kepuasan Klien Prioritas Kami
            </p>
          </div>

          {/* Tombol Navigasi Prev & Next (Simetris di tengah pada HP) */}
          {isCarousel && (
            <div className="flex items-center justify-center gap-3 mt-6 md:mt-0">
              <button
                type="button"
                onClick={() => handleScroll("prev")}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 hover:text-blue-600 flex items-center justify-center transition shadow-sm hover:scale-105 active:scale-95"
                title="Sebelumnya"
                aria-label="Previous"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleScroll("next")}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 hover:text-blue-600 flex items-center justify-center transition shadow-sm hover:scale-105 active:scale-95"
                title="Berikutnya"
                aria-label="Next"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {isCarousel ? (
          /* CAROUSEL MODE: Snap Center, Lebar Pas di HP, Tidak Terpotong Rata Kiri */
          <div
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory select-none no-scrollbar px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testi) => (
              <div
                key={testi.id}
                className="testimonial-card w-[86vw] sm:w-80 md:w-96 max-w-sm flex-shrink-0 snap-center bg-slate-50 p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Rating Bintang */}
                  <div className="flex text-amber-400 text-sm mb-3">
                    {"★".repeat(testi.rating || 5)}
                  </div>
                  {/* Pesan Testimoni */}
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-6">
                    "{testi.pesan_testimoni}"
                  </p>
                </div>

                {/* Identitas Klien */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {testi.nama_klien
                      ? testi.nama_klien.charAt(0).toUpperCase()
                      : "K"}
                  </div>
                  <div className="text-left overflow-hidden">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {testi.nama_klien}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 truncate">
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
        ) : (
          /* GRID RATA TENGAH (Jika data <= 3) */
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {testimonials.map((testi) => (
              <div
                key={testi.id}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md bg-slate-50 p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-400 text-sm mb-3">
                    {"★".repeat(testi.rating || 5)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-6">
                    "{testi.pesan_testimoni}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/60">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {testi.nama_klien
                      ? testi.nama_klien.charAt(0).toUpperCase()
                      : "K"}
                  </div>
                  <div className="text-left overflow-hidden">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {testi.nama_klien}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 truncate">
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
        )}
      </div>
    </section>
  );
}
