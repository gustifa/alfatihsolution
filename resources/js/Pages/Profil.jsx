import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import ScrollToTop from '@/Components/ScrollToTop'; // Import komponen tombol
import { fadeInUp, staggerContainer } from '@/Components/Animations'; // Import animasi

export default function Profil({ profil }) {
    
    const { pengaturanWeb } = usePage().props;
    const dataPengaturan = pengaturanWeb || {};

    const namaSekolah = dataPengaturan.nama_sekolah || 'SMK Negeri 1 Bukittinggi';


    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800 scroll-smooth relative">
            <Head>
                <title>{`Profil - ${namaSekolah}`}</title>
                {dataPengaturan.favicon && (
                    <link rel="icon" type="image/png" href={`/storage/${dataPengaturan.favicon}`} />
                )}
            </Head>

            {/* NAVBAR SECTION */}
            <Navbar />

            {/* HEADER PROFIL HALAMAN */}
            <motion.div 
                initial="hidden" animate="visible" variants={fadeInUp}
                className="bg-blue-900 py-16 text-center text-white border-b-4 border-yellow-500 shadow-inner"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">Profil Sekolah</h1>
                <p className="text-blue-200 max-w-2xl mx-auto text-lg px-4 drop-shadow">Mengenal lebih dekat sejarah, visi misi, dan struktur organisasi {namaSekolah}.</p>
            </motion.div>

            {/* KONTEN UTAMA PROFIL */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {profil ? (
                    <motion.div 
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
                        className="space-y-16"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            
                            {/* Bagian Kiri: Sejarah Singkat */}
                            <motion.div variants={fadeInUp} id="sejarah" className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-600 hover:shadow-xl transition-shadow">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-3">🏛️</span>
                                    Sejarah Singkat
                                </h3>
                                <div 
                                    className="prose text-gray-600 text-justify max-w-none [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:ml-6 [&_ul]:ml-6 [&_li]:mb-1" 
                                    dangerouslySetInnerHTML={{ __html: profil.sejarah_singkat }}
                                />
                            </motion.div>
                            
                            {/* Bagian Kanan: Visi & Misi */}
                            <motion.div variants={fadeInUp} id="visi-misi" className="space-y-8">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Visi</h3>
                                    <div 
                                        className="text-gray-600 leading-relaxed [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:ml-6 [&_ul]:ml-6 [&_li]:mb-1" 
                                        dangerouslySetInnerHTML={{ __html: profil.visi }} 
                                    />
                                </div>
                                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-cyan-500 hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 Misi</h3>
                                    <div 
                                        className="text-gray-600 leading-relaxed [&_ol]:list-decimal [&_ul]:list-disc [&_ol]:ml-6 [&_ul]:ml-6 [&_li]:mb-1" 
                                        dangerouslySetInnerHTML={{ __html: profil.misi }} 
                                    />
                                </div>
                            </motion.div>
                            
                        </div>

                        {/* Bagian Bawah: Struktur Organisasi */}
                        <motion.div variants={fadeInUp} id="struktur" className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-900 text-center hover:shadow-xl transition-shadow">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">Struktur Organisasi</h3>
                            {profil.foto_struktur_organisasi ? (
                                <img 
                                    src={`/storage/${profil.foto_struktur_organisasi}`} 
                                    alt="Struktur Organisasi" 
                                    className="w-full max-w-4xl mx-auto rounded-lg shadow-md border border-gray-100 transform hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <p className="text-gray-500 italic">Bagan struktur organisasi belum diunggah.</p>
                            )}
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="text-center py-24 bg-white rounded-xl shadow border border-gray-100">
                        <p className="text-gray-500 text-lg">Data profil belum diisi di panel admin.</p>
                    </motion.div>
                )}
            </div>

            {/* FOOTER SECTION */}
            <Footer />

            {/* KOMPONEN TOMBOL SCROLL TO TOP */}
            {/* Panggil komponen ScrollToTop di sini */}
            <ScrollToTop />
        </div>
    );
}