import React from "react";

export default function TrackingModal({
  isOpen,
  onClose,
  noTiket,
  setNoTiket,
  onCheckTicket,
  loadingTrack,
  trackResult,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-7 sm:p-8 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header Modal */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="text-lg">🔍</span> Lacak Status Servis Perangkat
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition text-lg font-bold"
            aria-label="Tutup"
          >
            &times;
          </button>
        </div>

        <p className="text-xs text-slate-500 mb-6">
          Ketikkan nomor tiket servis Anda yang tertera di nota perbaikan.
        </p>

        {/* Form Input Pencarian */}
        <form onSubmit={onCheckTicket} className="flex gap-2">
          <input
            type="text"
            required
            value={noTiket}
            onChange={(e) => setNoTiket(e.target.value.toUpperCase())}
            placeholder="CONTOH: SRV-2026-001"
            className="flex-1 text-xs px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-600 focus:bg-white focus:outline-none uppercase font-semibold text-slate-800 placeholder:text-slate-400"
          />
          <button
            type="submit"
            disabled={loadingTrack}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-bold rounded-2xl transition shadow-md shadow-blue-600/20"
          >
            {loadingTrack ? "..." : "Lacak"}
          </button>
        </form>

        {/* Hasil Tracking Jika Ditemukan */}
        {trackResult && (
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex justify-between border-b border-slate-200/70 pb-2">
              <span className="text-slate-500">Nomor Tiket:</span>
              <span className="font-bold text-slate-900">
                {trackResult.no_tiket}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200/70 pb-2">
              <span className="text-slate-500">Perangkat:</span>
              <span className="font-bold text-slate-900">
                {trackResult.perangkat}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200/70 pb-2 items-center">
              <span className="text-slate-500">Status Servis:</span>
              <span className="px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] bg-blue-100 text-blue-700">
                {trackResult.status_servis}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200/70 pb-2">
              <span className="text-slate-500">Estimasi Biaya:</span>
              <span className="font-bold text-slate-900">
                {trackResult.biaya} ({trackResult.status_bayar})
              </span>
            </div>
            <div className="pt-1">
              <span className="text-slate-500 block mb-1">
                Catatan Pengerjaan:
              </span>
              <p className="font-medium text-slate-700 bg-white p-3 rounded-xl border border-slate-200/80 leading-relaxed">
                {trackResult.tindakan}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
