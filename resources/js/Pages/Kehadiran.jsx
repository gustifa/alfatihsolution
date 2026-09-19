import React, { useEffect } from 'react';
import { Head, router, Link } from '@inertiajs/react';

export default function Kehadiran({ presensi, tanggal }) {
    
    // Fitur Auto-Refresh: Meminta data terbaru ke server setiap 5 detik
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['presensi'], preserveScroll: true, preserveState: true });
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <Head title="Monitor Kehadiran" />

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Monitor Kehadiran Siswa</h1>
                        <p className="text-gray-600 mt-1">{tanggal}</p>
                    </div>
                    <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                        &larr; Kembali ke Beranda
                    </Link>
                </div>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-blue-600 text-white text-sm uppercase tracking-wider">
                                    <th className="p-4 font-semibold">Nama Siswa</th>
                                    <th className="p-4 font-semibold">Kelas</th>
                                    <th className="p-4 font-semibold">Waktu Masuk</th>
                                    <th className="p-4 font-semibold">Waktu Pulang</th>
                                    <th className="p-4 font-semibold text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {presensi.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-400 italic">
                                            Belum ada data kehadiran hari ini.
                                        </td>
                                    </tr>
                                ) : (
                                    presensi.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4 font-medium text-gray-900">{item.siswa.nama}</td>
                                            <td className="p-4 text-gray-600">{item.siswa.kelas}</td>
                                            <td className="p-4 text-gray-600">{item.waktu_scan}</td>
                                            <td className="p-4 text-gray-600">{item.waktu_pulang || '-'}</td>
                                            <td className="p-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                                    item.status === 'hadir' ? 'bg-green-100 text-green-700' :
                                                    item.status === 'terlambat' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Data diperbarui secara real-time dari Kiosk Scan</span>
                </div>
            </div>
        </div>
    );
}