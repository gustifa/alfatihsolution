import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Tarik data global langsung dari komponen
    const { pengaturanWeb } = usePage().props;
    const dataPengaturan = pengaturanWeb || {};

    const namaSekolah = dataPengaturan.nama_sekolah || 'SMK Negeri 1 Bukittinggi';
    const slogan = dataPengaturan.slogan || 'Disiplin, Terampil, Berkarakter';

    return (
        <nav className="bg-blue-800 text-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center space-x-3">
                        {dataPengaturan.logo ? (
                            <img src={`/storage/${dataPengaturan.logo}`} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain bg-white rounded-full p-1 shadow-md" />
                        ) : (
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-blue-800 font-bold text-lg md:text-xl shadow-md">SMK</div>
                        )}
                        <div>
                            <h1 className="text-sm md:text-xl font-bold tracking-wide uppercase line-clamp-1">{namaSekolah}</h1>
                            <p className="text-[10px] md:text-xs text-blue-200 line-clamp-1">{slogan}</p>
                        </div>
                    </div>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
                        <Link href="/" className="hover:text-yellow-400 transition">Beranda</Link>
                        
                        <div className="relative group py-6">
                            <button className="hover:text-yellow-400 transition flex items-center gap-1 focus:outline-none">
                                Profil Sekolah
                                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div className="absolute top-16 left-0 w-56 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 overflow-hidden">
                                {/* Gunakan URL absolut agar berfungsi dari halaman mana saja */}
                                <a href="/profil#sejarah" className="block px-5 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-semibold border-b border-gray-50">Sejarah Singkat</a>
                                <a href="/profil#visi-misi" className="block px-5 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-semibold border-b border-gray-50">Visi dan Misi</a>
                                <a href="/profil#struktur" className="block px-5 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-semibold">Struktur Organisasi</a>
                            </div>
                        </div>

                        <a href="/#jurusan" className="hover:text-yellow-400 transition">Program</a>
                        <Link href="/kehadiran" className="hover:text-yellow-400 transition">Info Kehadiran</Link>
                        <a href="/admin" className="bg-yellow-500 text-blue-900 px-5 py-2 rounded-full font-bold hover:bg-yellow-400 hover:scale-105 transition-transform shadow-md">
                            Login Portal
                        </a>
                    </div>

                    {/* Tombol Mobile */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white hover:text-yellow-400 focus:outline-none p-2">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Dropdown Menu Mobile */}
            {isMobileMenuOpen && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden bg-blue-900 px-4 pt-2 pb-6 space-y-3 shadow-inner border-t border-blue-800">
                    <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-yellow-400 transition">Beranda</Link>
                    <div className="pl-3 border-l-2 border-blue-700 space-y-1 my-2">
                        <p className="text-xs text-blue-300 uppercase tracking-wider mb-2 font-bold ml-3 mt-2">Profil Sekolah</p>
                        <a href="/profil#sejarah" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 hover:text-yellow-400 transition">› Sejarah Singkat</a>
                        <a href="/profil#visi-misi" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 hover:text-yellow-400 transition">› Visi dan Misi</a>
                        <a href="/profil#struktur" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 hover:text-yellow-400 transition">› Struktur Organisasi</a>
                    </div>
                    <a href="/#jurusan" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-yellow-400 transition">Program Unggulan</a>
                    <Link href="/kehadiran" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-yellow-400 transition">Info Kehadiran</Link>
                    <a href="/admin" className="block mt-4 text-center bg-yellow-500 text-blue-900 px-5 py-3 rounded-full font-bold hover:bg-yellow-400 transition shadow-lg">Login Portal</a>
                </motion.div>
            )}
        </nav>
    );
}