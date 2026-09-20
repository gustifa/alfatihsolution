<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home()
    {
        $posts = Post::with('author')
            ->where('status', 'published')
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render('Home', [
            'posts' => $posts,
            'seo' => [
                'title' => 'Portal Resmi SMK Negeri 1 Bukittinggi',
                'description' => 'Informasi terbaru, prestasi siswa, dan kegiatan bengkel Teknik Instalasi Tenaga Listrik (TITL).'
            ]
        ]);
    }

    public function show($slug)
    {
        // Cari post berdasarkan slug yang statusnya published
        $post = Post::with('author')
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail(); // Akan otomatis menampilkan 404 jika slug tidak ditemukan

        return Inertia::render('Post', [
            'post' => $post,
        ]);
    }

    public function berita()
{
    // Mengambil berita terbaru dengan paginasi (9 berita per halaman)
    $posts = \App\Models\Post::latest()->paginate(9);
    
    return inertia('Berita', [
        'posts' => $posts
    ]);
}
}