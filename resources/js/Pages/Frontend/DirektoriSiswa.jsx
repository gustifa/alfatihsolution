import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function DirektoriSiswa({ dataSiswa }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head title="Direktori Siswa" />

      {/* Navigasi Sederhana */}
      <nav className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-bold text-xl text-gray-800">
            SMKN 1 Bukittinggi
          </div>
          <div className="space-x-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-blue-600 text-sm font-medium"
            >
              Beranda
            </Link>
            <Link
              href="/guru-staf"
              className="text-gray-600 hover:text-blue-600 text-sm font-medium"
            >
              Guru & Staf
            </Link>
            <Link href="/siswa" className="text-blue-600 font-semibold text-sm">
              Siswa
            </Link>
          </div>
        </div>
      </nav>

      {/* Konten Utama */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Direktori Siswa
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Daftar peserta didik aktif SMK Negeri 1 Bukittinggi.
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NISN / NIS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama Lengkap
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kelas / Jurusan
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataSiswa.map((siswa, index) => (
                  <tr key={siswa.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {siswa.nisn || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                      {siswa.nama}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {siswa.kelas || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {dataSiswa.length === 0 && (
          <div className="text-center py-10 text-gray-500 bg-white mt-4 rounded-lg shadow">
            Belum ada data siswa yang ditambahkan.
          </div>
        )}
      </main>
    </div>
  );
}
