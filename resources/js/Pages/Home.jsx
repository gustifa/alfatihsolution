import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion'; // Tambahkan AnimatePresence
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ScrollToTop from '@/Components/ScrollToTop'; // Import komponen tombol
import { fadeInUp, staggerContainer } from '@/Components/Animations'; // Import animasi

export default function Home({ posts, programs }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    
    const { pengaturanWeb } = usePage().props;
    const dataPengaturan = pengaturanWeb || {};

    // Deteksi gambar latar (hero) dari database
    const gambarHero = dataPengaturan?.gambar_hero || dataPengaturan?.foto_hero
        ? `/storage/${dataPengaturan.gambar_hero || dataPengaturan.foto_hero}`
        : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000";

    const namaSekolah = dataPengaturan.nama_sekolah || 'SMK Negeri 1 Bukittinggi';
    const slogan = dataPengaturan.slogan || 'Disiplin, Terampil, Berkarakter';
    const alamat = dataPengaturan.alamat || 'Jl. Pendidikan, Bukittinggi';
    const telepon = dataPengaturan.telepon || '(0752) XXXXX';
    const email = dataPengaturan.email || 'info@smkn1bukittinggi.sch.id';

    // Menyiapkan array gambar. Jika kosong di database, pakai 1 gambar default.
    const heroImages = Array.isArray(dataPengaturan?.gambar_hero) && dataPengaturan.gambar_hero.length > 0
        ? dataPengaturan.gambar_hero 
        : ["https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000"];

    // State untuk indeks gambar yang sedang aktif
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Berganti gambar otomatis setiap 5 detik
    useEffect(() => {
        if (heroImages.length > 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
            }, 5000); 
            return () => clearInterval(interval);
        }
    }, [heroImages.length]);

    

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800 scroll-smooth relative">
            <Head>
                <title>{`Beranda - ${namaSekolah}`}</title>
                {dataPengaturan.favicon && (
                    <link rel="icon" type="image/png" href={`/storage/${dataPengaturan.favicon}`} />
                )}
            </Head>

            {/* NAVBAR SECTION */}
            <Navbar />

            {/* 1. HERO SECTION */}
            <div className="relative h-[500px] flex items-center justify-center text-center overflow-hidden">
                
                {/* Latar Belakang Gambar Dinamis (Slider) */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('${
                                heroImages[currentImageIndex].startsWith('http') 
                                    ? heroImages[currentImageIndex] 
                                    : '/storage/' + heroImages[currentImageIndex]
                            }')`
                        }}
                    />
                </AnimatePresence>
                
                {/* Overlay Biru Transparan agar teks tetap kontras */}
                {/* <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply z-0"></div> */}
                {/* Overlay Biru Gelap dipadukan dengan efek bayangan hitam agar teks sangat menyala */}
                <div className="absolute inset-0 bg-blue-950/90 mix-blend-multiply z-0"></div>
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                <motion.div 
                    initial="hidden" animate="visible" variants={fadeInUp} 
                    className="relative z-10 px-4 w-full max-w-5xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg leading-tight">
                        {dataPengaturan?.hero_title || 'Mencetak Generasi Siap Kerja'}
                    </h2>
                    <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-8 drop-shadow">
                        {dataPengaturan?.hero_deskripsi || 'Pusat keunggulan vokasi yang mengedepankan akhlak mulia, kompetensi industri, dan kemandirian wirausaha.'}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <a href="#berita" className="bg-yellow-500 text-blue-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-400 hover:scale-105 transition shadow-lg">
                            Berita Terbaru
                        </a>
                        <a href="#jurusan" className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-blue-900 hover:scale-105 transition shadow-lg">
                            Jelajahi Jurusan
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* PITA STATISTIK DATA SMK */}
            <div className="bg-blue-600 py-10 relative z-20 shadow-inner">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x md:divide-blue-400">
                        <motion.div variants={fadeInUp} className="mb-6 md:mb-0">
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{dataPengaturan?.jumlah_siswa || 0}</div>
                            <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Siswa Aktif</div>
                        </motion.div>
                        <motion.div variants={fadeInUp} className="mb-6 md:mb-0">
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{dataPengaturan?.jumlah_guru || 0}</div>
                            <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Guru & Staff</div>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{dataPengaturan?.jumlah_rombel || 0}</div>
                            <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Rombongan Belajar</div>
                        </motion.div>
                        <motion.div variants={fadeInUp}>
                            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{dataPengaturan?.jumlah_program || 0}</div>
                            <div className="text-blue-200 text-sm font-semibold uppercase tracking-wider">Program Keahlian</div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* SAMBUTAN KEPALA SEKOLAH */}
            <div id="profil" className="py-20 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/3 flex justify-center">
                            <div className="w-64 h-64 bg-gray-300 rounded-full border-8 border-blue-100 overflow-hidden shadow-xl hover:scale-105 transition-transform duration-500">
                                <img src={dataPengaturan?.foto_kepala_sekolah ? `/storage/${dataPengaturan.foto_kepala_sekolah}` : "https://ui-avatars.com/api/?name=KS&size=256&background=0D8ABC&color=fff"} alt="Kepala Sekolah" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="w-full md:w-2/3">
                            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Sambutan Pimpinan</h3>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Selamat Datang di Website Resmi {namaSekolah}</h2>
                            {dataPengaturan?.sambutan_kepala_sekolah ? (
                                <div className="prose text-gray-600 leading-relaxed text-justify max-w-none" dangerouslySetInnerHTML={{ __html: dataPengaturan.sambutan_kepala_sekolah }} />
                            ) : (
                                <p className="text-gray-500 italic">Sambutan belum ditambahkan di panel admin.</p>
                            )}
                            <div className="mt-6 font-bold text-gray-900">
                                <p>{dataPengaturan?.nama_kepala_sekolah || 'Kepala Sekolah'}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* PROGRAM KEAHLIAN / JURUSAN */}
            <div id="jurusan" className="py-20 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
                        <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Program Unggulan</h3>
                        <h2 className="text-3xl font-bold text-gray-900">Konsentrasi Keahlian</h2>
                    </motion.div>
                    
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {programs && programs.length > 0 ? programs.map((program) => (
                            <motion.div key={program.id} variants={fadeInUp} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-blue-600 text-center">
                                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
                                    {program.icon ? (
                                        <img src={`/storage/${program.icon}`} alt={program.singkatan} className="w-full h-full object-cover p-2" />
                                    ) : (
                                        <span className="text-2xl font-bold text-blue-600">{program.singkatan || 'Prog'}</span>
                                    )}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{program.nama_program}</h4>
                                <p className="text-gray-600 text-sm">{program.deskripsi}</p>
                            </motion.div>
                        )) : (
                            <div className="col-span-full text-center text-gray-500">Belum ada data program keahlian.</div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* BERITA & PENGUMUMAN TERBARU */}
            <div id="berita" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex justify-between items-end mb-12">
                        <div>
                            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Informasi</h3>
                            <h2 className="text-3xl font-bold text-gray-900">Berita Sekolah Terkini</h2>
                        </div>
                        <Link href="/berita" className="text-blue-600 font-semibold hover:text-yellow-500 hover:underline transition">
                            Lihat Semua Berita &rarr;
                        </Link>
                    </motion.div>

                    {posts && posts.length > 0 ? (
                        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <motion.div key={post.id} variants={fadeInUp} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                                    <div className="h-48 bg-gray-200 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-blue-900 opacity-0 group-hover:opacity-20 transition"></div>
                                        <img src={post.featured_image ? `/storage/${post.featured_image}` : `https://ui-avatars.com/api/?name=${post.title}&background=random`} alt="thumbnail" className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500" />
                                    </div>
                                    <div className="p-6">
                                        <p className="text-xs text-gray-500 mb-2 font-semibold uppercase">{new Date(post.created_at).toLocaleDateString('id-ID')}</p>
                                        <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition">
                                            <Link href={`/berita/${post.slug}`}>{post.title}</Link>
                                        </h4>
                                        <p className="text-gray-600 text-sm line-clamp-3">{post.meta_description || 'Baca selengkapnya mengenai berita ini di halaman detail.'}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-500">Belum ada berita yang diterbitkan saat ini.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* FOOTER */}
            {/* Panggil Footer di sini */}
            <Footer />

            {/* KOMPONEN TOMBOL SCROLL TO TOP */}
            {/* Panggil komponen ScrollToTop di sini */}
            <ScrollToTop />
            
        </div>
    );
}