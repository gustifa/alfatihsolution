import React from "react";

export default function ContactSection({
  company,
  services = [],
  formOrder,
  setFormOrder,
  onSubmitOrder,
  loadingOrder,
}) {
  return (
    <section id="kontak" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 block">
              Konsultasi Terpadu
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Konsultasikan Kebutuhan Anda dengan Tim Ahli Kami
            </h2>
            <p className="mt-4 text-sm text-slate-300 leading-relaxed max-w-lg">
              Silakan pilih layanan yang Anda butuhkan melalui formulir berikut.
              Data pemesanan akan otomatis tersimpan dan langsung terhubung ke
              admin via WhatsApp untuk penanganan cepat.
            </p>

            <div className="mt-8 space-y-4 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-blue-400 font-bold">
                  📍
                </span>
                <span>{company.alamat}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-blue-400 font-bold">
                  💬
                </span>
                <span>Jam Layanan: 08.00 - 21.00 WIB (Senin - Sabtu)</span>
              </div>
            </div>
          </div>

          <div className="bg-white text-slate-800 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Formulir Pesanan & Konsultasi
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Isi formulir ringkas ini untuk terhubung langsung ke WhatsApp tim
              teknis kami.
            </p>

            <form onSubmit={onSubmitOrder} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Nama Lengkap / Instansi
                </label>
                <input
                  type="text"
                  required
                  value={formOrder.nama_klien}
                  onChange={(e) =>
                    setFormOrder({ ...formOrder, nama_klien: e.target.value })
                  }
                  placeholder="Contoh: Pak Budi / SMK 1"
                  className="w-full text-xs px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Nomor WhatsApp Aktif
                </label>
                <input
                  type="tel"
                  required
                  value={formOrder.no_whatsapp}
                  onChange={(e) =>
                    setFormOrder({ ...formOrder, no_whatsapp: e.target.value })
                  }
                  placeholder="08xxxxxxxxxx"
                  className="w-full text-xs px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Pilihan Layanan
                </label>
                <select
                  required
                  value={formOrder.service_id}
                  onChange={(e) =>
                    setFormOrder({ ...formOrder, service_id: e.target.value })
                  }
                  className="w-full text-xs px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="">-- Pilih Layanan yang Dibutuhkan --</option>
                  {services.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama_layanan}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Deskripsi Kebutuhan Singkat
                </label>
                <textarea
                  required
                  rows="3"
                  value={formOrder.catatan_kebutuhan}
                  onChange={(e) =>
                    setFormOrder({
                      ...formOrder,
                      catatan_kebutuhan: e.target.value,
                    })
                  }
                  placeholder="Sebutkan detail kebutuhan atau kendala perangkat Anda..."
                  className="w-full text-xs px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loadingOrder}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                {loadingOrder
                  ? "Menghubungkan..."
                  : "Kirim & Sambungkan ke WhatsApp →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
