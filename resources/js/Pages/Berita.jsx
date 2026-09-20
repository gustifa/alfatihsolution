import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

export default function Berita({ posts }) {
    // Membaca data array, mendukung format paginasi Laravel (posts.data) atau array biasa
    const dataBerita = posts?.data || posts || [];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Meta title untuk browser */}
            <Head title="Semua Berita" />
            
            {/* Memanggil komponen Navbar dinamis */}
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10 md:mb-14 text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
                        Berita & Informasi Terbaru
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                        Ikuti terus perkembangan, prestasi, dan pengumuman terbaru seputar kegiatan di lingkungan sekolah kami.
                    </p>
                </div>

                {dataBerita.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dataBerita.map((post) => (
                            <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-100">
                                {/* Thumbnail Berita */}
                                <div className="relative h-56 overflow-hidden bg-gray-200">
                                    <img 
                                        src={post.featured_image ? `/storage/${post.featured_image}` : 'https://placehold.co/600x400/1e3a8a/ffffff?text=Berita+Sekolah'} 
                                        alt={post.title} 
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                        onError={(e) => { e.target.src = 'https://placehold.co/600x400/1e3a8a/ffffff?text=Berita+Sekolah'; }}
                                    />
                                </div>
                                
                                {/* Konten Berita */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="text-xs text-yellow-600 font-bold mb-3 uppercase tracking-wider">
                                        {new Date(post.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                                        {post.excerpt || 'Baca selengkapnya mengenai berita atau informasi ini di halaman detail.'}
                                    </p>
                                    
                                    {/* Tombol Baca Selengkapnya di bawah */}
                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <Link 
                                            href={`/berita/${post.slug || post.id}`} 
                                            className="text-blue-800 font-bold hover:text-yellow-500 transition-colors inline-flex items-center text-sm"
                                        >
                                            Baca Selengkapnya
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Tampilan jika belum ada berita di database
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l1 1h4a2 2 0 012 2v12a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-bold text-gray-900">Belum ada berita</h3>
                        <p className="text-gray-500 mt-1">Berita terbaru akan segera ditambahkan oleh administrator.</p>
                    </div>
                )}
            </main>
        </div>
    );
}