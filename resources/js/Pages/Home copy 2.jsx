import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Home({ posts, programs }) {
    // 1. Tambahkan state untuk menu mobile di sini
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Memanggil data global, dan berikan nilai objek kosong {} jika null
    const { pengaturanWeb } = usePage().props;
    
    // Gunakan optional chaining (?.) untuk mencegah error "Cannot read property"
    const dataPengaturan = pengaturanWeb || {};

    const namaSekolah = dataPengaturan.nama_sekolah || 'SMK Negeri 1 Bukittinggi';
    const slogan = dataPengaturan.slogan || 'Disiplin, Terampil, Berkarakter';
    const alamat = dataPengaturan.alamat || 'Jl. Pendidikan, Bukittinggi';
    const telepon = dataPengaturan.telepon || '(0752) XXXXX';
    const email = dataPengaturan.email || 'info@smkn1bukittinggi.sch.id';

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
            <Head>
                <title>{`Beranda - ${namaSekolah}`}</title>
                {dataPengaturan.favicon && (
                    <link rel="icon" type="image/png" href={`/storage/${dataPengaturan.favicon}`} />
                )}
            </Head>

            {/* NAVBAR SECTION */}
            <nav className="bg-blue-800 text-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        
                        {/* Kiri: Logo & Nama Sekolah */}
                        <div className="flex items-center space-x-3">
                            {dataPengaturan.logo ? (
                                <img src={`/storage/${dataPengaturan.logo}`} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain bg-white rounded-full p-1" />
                            ) : (
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-blue-800 font-bold text-lg md:text-xl">SMK</div>
                            )}
                            <div>
                                <h1 className="text-sm md:text-xl font-bold tracking-wide uppercase line-clamp-1">{namaSekolah}</h1>
                                <p className="text-[10px] md:text-xs text-blue-200 line-clamp-1">{slogan}</p>
                            </div>
                        </div>

                        {/* Kanan: Menu Desktop (Disembunyikan di Mobile) */}
                        <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
                            <a href="#" className="hover:text-yellow-400 transition">Beranda</a>
                            <a href="#profil" className="hover:text-yellow-400 transition">Profil</a>
                            <a href="#jurusan" className="hover:text-yellow-400 transition">Program</a>
                            <Link href="/kehadiran" className="hover:text-yellow-400 transition">Info Kehadiran</Link>
                            <Link href="/admin" className="bg-yellow-500 text-blue-900 px-5 py-2 rounded-full font-bold hover:bg-yellow-400 transition">
                                Login Portal
                            </Link>
                        </div>

                        {/* Kanan: Tombol Titik Tiga / Menu Mobile (Hanya Tampil di Mobile) */}
                        <div className="md:hidden flex items-center">
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                                className="text-white hover:text-yellow-400 focus:outline-none p-2"
                            >
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    {/* Ikon Titik Tiga Vertikal */}
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dropdown Menu Mobile */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-blue-900 px-4 pt-2 pb-6 space-y-3 shadow-inner border-t border-blue-800">
                        <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-yellow-400 transition">Beranda</a>
                        <a href="#profil" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-yellow-400 transition">Profil</a>
                        <a href="#jurusan" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-yellow-400 transition">Program Unggulan</a>
                        <Link href="/kehadiran" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 hover:text-yellow-400 transition">Info Kehadiran</Link>
                        <Link href="/admin" className="block mt-4 text-center bg-yellow-500 text-blue-900 px-5 py-3 rounded-full font-bold hover:bg-yellow-400 transition shadow-lg">
                            Login Portal
                        </Link>
                    </div>
                )}
            </nav>

            {/* 2. HERO SECTION */}
            <div className="relative bg-blue-900 h-[500px] flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000')] bg-cover bg-center"></div>
                <div className="relative z-10 px-4">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                        {dataPengaturan?.hero_title || 'Mencetak Generasi Siap Kerja'}
                    </h2>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 drop-shadow">
                        {dataPengaturan?.hero_deskripsi || 'Pusat keunggulan vokasi yang mengedepankan akhlak mulia, kompetensi industri, dan kemandirian wirausaha.'}
                    </p>
                    <div className="space-x-4">
                        <a href="#berita" className="bg-yellow-500 text-blue-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-400 transition shadow-lg">
                            Berita Terbaru
                        </a>
                        <a href="#jurusan" className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-blue-900 transition shadow-lg">
                            Jelajahi Jurusan
                        </a>
                    </div>
                </div>
            </div>

            {/* ... penutup div Hero Section ... */}

            {/* PITA STATISTIK DATA SMK */}
            <div className="bg-blue-600 py-10 relative z-20 shadow-inner">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x md:divide-blue-400">
                        <div className="mb-6 md:mb-0">
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                                {dataPengaturan?.jumlah_siswa || 0}
                            </div>
                            <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Siswa Aktif</div>
                        </div>
                        <div className="mb-6 md:mb-0">
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                                {dataPengaturan?.jumlah_guru || 0}
                            </div>
                            <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Guru & Staff</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                                {dataPengaturan?.jumlah_rombel || 0}
                            </div>
                            <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Rombongan Belajar</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                                {dataPengaturan?.jumlah_program || 0}
                            </div>
                            <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Program Keahlian</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. SAMBUTAN KEPALA SEKOLAH */}
            {/* ... */}

            {/* 3. SAMBUTAN KEPALA SEKOLAH */}
<div id="profil" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-64 h-64 bg-gray-300 rounded-full border-8 border-blue-100 overflow-hidden shadow-xl">
                    <img 
                        src={dataPengaturan?.foto_kepala_sekolah ? `/storage/${dataPengaturan.foto_kepala_sekolah}` : "https://ui-avatars.com/api/?name=KS&size=256&background=0D8ABC&color=fff"} 
                        alt="Kepala Sekolah" 
                        className="w-full h-full object-cover" 
                    />
                </div>
            </div>
            <div className="w-full md:w-2/3">
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Sambutan Pimpinan</h3>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Selamat Datang di Website Resmi {namaSekolah}</h2>
                
                {dataPengaturan?.sambutan_kepala_sekolah ? (
                    <div 
                        className="prose text-gray-600 leading-relaxed text-justify max-w-none" 
                        dangerouslySetInnerHTML={{ __html: dataPengaturan.sambutan_kepala_sekolah }} 
                    />
                ) : (
                    <p className="text-gray-500 italic">Sambutan belum ditambahkan di panel admin.</p>
                )}
                
                <div className="mt-6 font-bold text-gray-900">
                    <p>{dataPengaturan?.nama_kepala_sekolah || 'Kepala Sekolah'}</p>
                </div>
            </div>
        </div>
    </div>
</div>


            {/* 4. PROGRAM KEAHLIAN / JURUSAN */}
            <div id="jurusan" className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Program Unggulan</h3>
                        <h2 className="text-3xl font-bold text-gray-900">Konsentrasi Keahlian</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {programs && programs.length > 0 ? programs.map((program) => (
                            <div key={program.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition border-t-4 border-blue-600 text-center">
                                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
                                    {program.icon ? (
                                        <img src={`/storage/${program.icon}`} alt={program.singkatan} className="w-full h-full object-cover p-2" />
                                    ) : (
                                        <span className="text-2xl font-bold text-blue-600">{program.singkatan || 'Prog'}</span>
                                    )}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{program.nama_program}</h4>
                                <p className="text-gray-600 text-sm">{program.deskripsi}</p>
                            </div>
                        )) : (
                            <div className="col-span-full text-center text-gray-500">
                                Belum ada data program keahlian.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 5. BERITA & PENGUMUMAN TERBARU */}
            <div id="berita" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Informasi</h3>
                            <h2 className="text-3xl font-bold text-gray-900">Berita Sekolah Terkini</h2>
                        </div>
                        <a href="#" className="hidden md:block text-blue-600 font-bold hover:underline">Lihat Semua Berita &rarr;</a>
                    </div>

                    {posts && posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
                                    <div className="h-48 bg-gray-200 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-blue-900 opacity-0 group-hover:opacity-20 transition"></div>
                                        <img src={`https://ui-avatars.com/api/?name=${post.title}&background=random`} alt="thumbnail" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-xs text-gray-500 mb-2 font-semibold uppercase">{new Date(post.created_at).toLocaleDateString('id-ID')}</p>
                                        <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition">
                                            <Link href={`/berita/${post.slug}`}>{post.title}</Link>
                                        </h4>
                                        <p className="text-gray-600 text-sm line-clamp-3">{post.meta_description || 'Baca selengkapnya mengenai berita ini di halaman detail.'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500">Belum ada berita yang diterbitkan saat ini.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 6. FOOTER */}
            <footer className="bg-blue-900 text-blue-200 py-12 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Kolom 1: Profil Singkat Dinamis */}
                    <div>
                        <h4 className="text-white text-lg font-bold mb-4">{namaSekolah}</h4>
                        <p className="text-sm leading-relaxed">
                            {/* Kita manfaatkan hero_deskripsi sebagai profil singkat di footer */}
                            {dataPengaturan?.hero_deskripsi || 'Website Sistem Informasi Branding dan Manajemen Presensi Digital Sekolah terintegrasi IoT.'}
                        </p>
                    </div>
                    
                    {/* Kolom 2: Tautan Penting */}
                    <div>
                        <h4 className="text-white text-lg font-bold mb-4">Tautan Penting</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition">Kementerian Pendidikan</a></li>
                            <li><a href="#" className="hover:text-white transition">Dinas Pendidikan</a></li>
                            <li><Link href="/kiosk" className="hover:text-white transition">Kiosk Presensi (Mesin)</Link></li>
                        </ul>
                    </div>
                    
                    {/* Kolom 3: Kontak Dinamis */}
                    <div>
                        <h4 className="text-white text-lg font-bold mb-4">Kontak</h4>
                        <ul className="space-y-2 text-sm">
                            <li>📍 {alamat}</li>
                            <li>📞 {telepon}</li>
                            <li>✉️ {email}</li>
                        </ul>
                    </div>
                    
                </div>
                
                {/* Copyright Dinamis */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-blue-800 text-sm text-center">
                    &copy; {new Date().getFullYear()} {namaSekolah}. All rights reserved.
                </div>
            </footer>
        </div>
    );
}