import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Home({ posts, seo }) {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Komponen Head ini krusial untuk SEO Google */}
            <Head>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
            </Head>

            <header className="mb-12 border-b pb-6">
                <h1 className="text-4xl font-bold text-blue-900">SMK Negeri 1 Bukittinggi</h1>
                <p className="text-gray-600 mt-2">Disiplin, Terampil, dan Mandiri</p>
            </header>

            <section>
                <h2 className="text-2xl font-semibold mb-6">Publikasi & Berita Terbaru</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="border rounded-lg shadow-sm overflow-hidden">
                                {post.featured_image && (
                                    <img 
                                        src={`/storage/${post.featured_image}`} 
                                        alt={post.title} 
                                        className="w-full h-48 object-cover"
                                    />
                                )}
                                <div className="p-4">
                                    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Ditulis oleh {post.author.name}
                                    </p>
                                    <Link 
                                        href={`/berita/${post.slug}`} 
                                        className="text-blue-600 hover:underline"
                                    >
                                        Baca selengkapnya &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Belum ada publikasi saat ini.</p>
                    )}
                </div>
            </section>
        </div>
    );
}