import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Post({ post }) {
    // Format tanggal ke dalam bahasa Indonesia
    const formattedDate = new Date(post.published_at || post.created_at).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Meta tags SEO dinamis yang diambil dari database */}
            <Head>
                <title>{post.meta_title || post.title}</title>
                <meta name="description" content={post.meta_description || ''} />
                <meta name="keywords" content={post.meta_keywords || ''} />
            </Head>

            <nav className="mb-8">
                <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2">
                    &larr; Kembali ke Beranda
                </Link>
            </nav>

            <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {post.featured_image && (
                    <div className="w-full h-[400px] bg-gray-100 overflow-hidden">
                        <img 
                            src={`/storage/${post.featured_image}`} 
                            alt={post.title} 
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}
                
                <div className="p-8">
                    <header className="mb-8 border-b pb-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
                        <div className="flex items-center text-gray-500 text-sm">
                            <span>Ditulis oleh <strong className="text-gray-700">{post.author.name}</strong></span>
                            <span className="mx-2">•</span>
                            <span>{formattedDate}</span>
                        </div>
                    </header>

                    {/* Menggunakan dangerouslySetInnerHTML karena teks dari Filament berupa tag HTML (Rich Text Editor) */}
                    <div 
                        className="text-gray-800 text-lg leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>
        </div>
    );
}