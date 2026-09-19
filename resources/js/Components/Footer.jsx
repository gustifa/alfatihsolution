import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { pengaturanWeb } = usePage().props;
    const dataPengaturan = pengaturanWeb || {};

    const namaSekolah = dataPengaturan.nama_sekolah || 'SMK Negeri 1 Bukittinggi';
    const alamat = dataPengaturan.alamat || 'Jl. Pendidikan, Bukittinggi';
    const telepon = dataPengaturan.telepon || '(0752) XXXXX';
    const email = dataPengaturan.email || 'info@smkn1bukittinggi.sch.id';

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
                        <li><a href="#" className="hover:text-yellow-400 transition">Kementerian Pendidikan</a></li>
                        <li><a href="#" className="hover:text-yellow-400 transition">Dinas Pendidikan</a></li>
                        <li><Link href="/kiosk" className="hover:text-yellow-400 transition">Kiosk Presensi (Mesin)</Link></li>
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