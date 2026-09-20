import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { pengaturanWeb } = usePage().props;
    const dataPengaturan = pengaturanWeb || {};

    const namaSekolah = dataPengaturan.nama_sekolah || 'SMK Negeri 1 Bukittinggi';
    const alamat = dataPengaturan.alamat || 'Jl. Pendidikan, Bukittinggi';
    const telepon = dataPengaturan.telepon || '(0752) XXXXX';
    const email = dataPengaturan.email || 'info@smkn1bukittinggi.sch.id';

    // Siapkan data cadangan (fallback) jika database masih kosong
    const tautanDefault = [
        { nama_tautan: 'Kementerian Pendidikan', url: 'https://kemdikbud.go.id' },
        { nama_tautan: 'Dinas Pendidikan', url: '#' },
        { nama_tautan: 'Kiosk Presensi (Mesin)', url: '/kiosk' },
    ];

    // Gunakan data dari database, atau fallback jika belum ada
    const daftarTautan = pengaturanWeb?.tautan_penting || tautanDefault;

    return (
        <footer className="bg-blue-900 text-blue-200 py-12 border-t-4 border-yellow-500 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h4 className="text-white text-lg font-bold mb-4">{namaSekolah}</h4>
                    <p className="text-sm leading-relaxed">{dataPengaturan?.hero_deskripsi || 'Website Sistem Informasi Branding dan Manajemen Presensi Digital Sekolah terintegrasi IoT.'}</p>
                </div>
                <div>
                    <h4 className="text-white text-lg font-bold mb-4">Tautan Penting</h4>
                    <ul className="space-y-2 text-sm">
                        {daftarTautan.map((tautan, index) => (
                    <li key={index}>
                        {/* Jika URL eksternal (http), gunakan tag <a> biasa. Jika internal, gunakan <Link> Inertia */}
                        {tautan.url.startsWith('http') ? (
                            <a href={tautan.url} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                                {tautan.nama_tautan}
                            </a>
                        ) : (
                            <Link href={tautan.url} className="text-gray-300 hover:text-yellow-400 transition-colors">
                                {tautan.nama_tautan}
                            </Link>
                        )}
                    </li>
                ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-white text-lg font-bold mb-4">Kontak</h4>
                    <ul className="space-y-2 text-sm">
                        <li>📍 {alamat}</li>
                        <li>📞 {telepon}</li>
                        <li>✉️ {email}</li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-blue-800 text-sm text-center">
                &copy; {new Date().getFullYear()} {namaSekolah}. All rights reserved.
            </div>
        </footer>
    );
}