import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ScrollToTop from '@/Components/ScrollToTop';
import { fadeInUp } from '@/Components/Animations';

export default function BeritaDetail({ post }) {
    // State untuk mengambil URL halaman saat ini agar bisa dibagikan
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const { pengaturanWeb } = usePage().props;
    const dataPengaturan = pengaturanWeb || {};
    const namaSekolah = dataPengaturan.nama_sekolah || 'SMK Negeri 1 Bukittinggi';

    const tanggalFormat = new Date(post.created_at).toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800 scroll-smooth relative overflow-hidden">
            <Head>
                <title>{`${post.title} - ${namaSekolah}`}</title>
                {dataPengaturan.favicon && (
                    <link rel="icon" type="image/png" href={`/storage/${dataPengaturan.favicon}`} />
                )}
            </Head>

            <Navbar />

            <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 pb-20">
                <motion.div 
                    initial="hidden" animate="visible" variants={fadeInUp}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                >
                    {/* Header Thumbnail Berita */}
                    <div className="h-64 sm:h-96 w-full bg-blue-900 relative group">
                        {/* Menampilkan gambar dari backend Filament jika ada, jika tidak pakai gambar default */}
                        <img
                            src={post.featured_image ? `/storage/${post.featured_image}` : `https://ui-avatars.com/api/?name=${post.title}&size=800&background=0D8ABC&color=fff`}
                            alt={post.title}
                            className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                        
                        <div className="absolute top-6 left-6 z-10">
                            <Link href="/#berita" className="bg-white/20 hover:bg-white/40 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center shadow-lg border border-white/30 hover:-translate-x-1">
                                &larr; Kembali
                            </Link>
                        </div>

                        <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
                            <span className="bg-yellow-500 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                Informasi
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-5 leading-tight drop-shadow-lg">
                                {post.title}
                            </h1>
                        </div>
                    </div>

                    {/* Info Penulis & Waktu */}
                    <div className="px-6 sm:px-10 py-6 border-b border-gray-100 bg-gray-50 flex flex-wrap gap-4 md:gap-8 items-center text-sm text-gray-500 font-medium">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            {tanggalFormat}
                        </div>
                        {/* Penulis Dinamis */}
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>
                                Oleh {post.author?.name || post.user?.name || 'Admin / Humas'}
                            </span>
                        </div>
                    </div>

                    {/* Isi Artikel */}
                    <div className="p-6 sm:p-10">
                        <div 
                            className="prose prose-lg max-w-none text-gray-700 text-justify prose-headings:text-blue-900 prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-2xl prose-img:shadow-lg [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:ml-6 [&_ul]:ml-6 [&_li]:mb-1"
                            dangerouslySetInnerHTML={{ __html: post.content }} 
                        />

                        {/* FITUR BAGIKAN ARTIKEL */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between">
                            <h4 className="text-lg font-bold text-gray-900 mb-4 sm:mb-0">Bagikan Artikel Ini:</h4>
                            <div className="flex space-x-4">
                                {/* WhatsApp */}
                                <a 
                                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' - Baca selengkapnya di: ' + currentUrl)}`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 hover:-translate-y-1 transition-all shadow-md"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                </a>
                                {/* Facebook */}
                                <a 
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 hover:-translate-y-1 transition-all shadow-md"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                </a>
                                {/* X / Twitter */}
                                <a 
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(post.title)}`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 hover:-translate-y-1 transition-all shadow-md"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.965h-1.969z"/></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
            <ScrollToTop />
        </div>
    );
}