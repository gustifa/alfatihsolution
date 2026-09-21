import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import ScrollToTop from "@/Components/ScrollToTop"; // Import komponen tombol

export default function DirektoriGuru({ dataGuru }) {
  // State untuk menyimpan data guru yang sedang diklik (jika null, modal tertutup)
  const [selectedGuru, setSelectedGuru] = useState(null);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <Head title="Direktori Guru & Staff" />

      <div>
        {/* Memanggil komponen Navbar dinamis */}
        <Navbar />

        {/* Header Banner ala Home.jsx */}
        <div className="relative bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 text-center text-white overflow-hidden shadow-inner">
          <div className="absolute inset-0 opacity-40 bg-gradient-to-r from-blue-900 to-indigo-900"></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
              Direktori Guru & Staff
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Tenaga pendidik dan kependidikan profesional yang berdedikasi di
              SMK Negeri 1 Bukittinggi.
            </p>
          </div>
        </div>

        {/* Konten Daftar Guru */}
        {/* Konten Daftar Guru */}
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6">
            {dataGuru.map((guru) => {
              const fotoUrl = guru.foto
                ? `/storage/${guru.foto}`
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(guru.nama)}&background=1e293b&color=fff&size=300`;

              return (
                <div
                  key={guru.id}
                  onClick={() => setSelectedGuru(guru)} // Event saat kartu diklik
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="w-full h-64 bg-gray-100 overflow-hidden relative">
                    <img
                      src={fotoUrl}
                      alt={guru.nama}
                      className="object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-bold text-gray-900 truncate">
                      {guru.nama}
                    </h3>
                    <p className="text-sm font-semibold text-blue-600 mt-1 truncate">
                      {guru.jabatan || guru.mata_pelajaran || "Guru / Staff"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {dataGuru.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 mt-6">
              <p className="text-gray-500 text-lg">
                Belum ada data guru atau staff yang tersedia.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* --- MODAL DETAIL GURU --- */}
      {selectedGuru && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden relative border border-gray-100">
            {/* Tombol Close (X) */}
            <button
              onClick={() => setSelectedGuru(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-700 w-10 h-10 rounded-full flex items-center justify-center font-bold transition z-10"
            >
              ✕
            </button>

            {/* Foto Besar di Modal */}
            <div className="w-full h-72 bg-gray-100 relative">
              <img
                src={
                  selectedGuru.foto
                    ? `/storage/${selectedGuru.foto}`
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedGuru.nama)}&background=1e293b&color=fff&size=400`
                }
                alt={selectedGuru.nama}
                className="object-cover object-top w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-3 py-1 bg-blue-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                  {selectedGuru.jabatan || "Guru / Staff"}
                </span>
                <h2 className="text-2xl font-bold mt-2">{selectedGuru.nama}</h2>
              </div>
            </div>

            {/* Detail Informasi */}
            <div className="p-6 space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <span className="text-xs text-gray-400 uppercase font-semibold">
                  NIP / Identitas
                </span>
                <p className="text-gray-800 font-medium">
                  {selectedGuru.nip || selectedGuru.nomor_induk || "-"}
                </p>
              </div>

              <div className="border-b border-gray-100 pb-3">
                <span className="text-xs text-gray-400 uppercase font-semibold">
                  Mata Pelajaran / Bidang Keahlian
                </span>
                <p className="text-gray-800 font-medium">
                  {selectedGuru.mata_pelajaran || selectedGuru.bidang || "-"}
                </p>
              </div>

              <div>
                <span className="text-xs text-gray-400 uppercase font-semibold">
                  Keterangan / Status
                </span>
                <p className="text-gray-800 font-medium">
                  {selectedGuru.status || "Aktif"}
                </p>
              </div>

              <button
                onClick={() => setSelectedGuru(null)}
                className="w-full mt-4 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition shadow-md"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      {/* Panggil Footer di sini */}
      <Footer />

      {/* KOMPONEN TOMBOL SCROLL TO TOP */}
      {/* Panggil komponen ScrollToTop di sini */}
      <ScrollToTop />
    </div>
  );
}
