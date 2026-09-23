<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    @php
        // Ambil data post dan pengaturan langsung dari props Inertia di server
        $pageProps = $page['props'] ?? [];
        $post = $pageProps['post'] ?? null;
        $pengaturan = $pageProps['pengaturanWeb'] ?? null;

        // Data Sekolah
        $namaSekolah = is_array($pengaturan) ? ($pengaturan['nama_sekolah'] ?? 'Sekolah') : ($pengaturan->nama_sekolah ?? 'Sekolah');

        if ($post) {
            // Jika halaman Berita Detail
            $ogTitle = is_array($post) ? $post['title'] : $post->title;
            $ogDesc = is_array($post)
                ? ($post['meta_description'] ?? 'Baca berita selengkapnya di situs resmi sekolah kami.')
                : ($post->meta_description ?? 'Baca berita selengkapnya di situs resmi sekolah kami.');

            $imgRaw = is_array($post) ? ($post['featured_image'] ?? null) : ($post->featured_image ?? null);
            if ($imgRaw) {
                $ogImage = str_starts_with($imgRaw, 'http') ? $imgRaw : asset('storage/' . $imgRaw);
            } else {
                $ogImage = asset('images/default-berita.jpg');
            }
            $ogType = 'article';
        } else {
            // Halaman Beranda / Lainnya
            $ogTitle = $namaSekolah;
            $ogDesc = is_array($pengaturan) ? ($pengaturan['slogan'] ?? 'Website Resmi') : ($pengaturan->slogan ?? 'Website Resmi');
            $logoRaw = is_array($pengaturan) ? ($pengaturan['logo'] ?? null) : ($pengaturan->logo ?? null);
            $ogImage = $logoRaw ? asset('storage/' . $logoRaw) : asset('images/logo.png');
            $ogType = 'website';
        }
    @endphp

    <!-- Meta Tags Wajib untuk WhatsApp Link Preview -->
    <title>{{ $ogTitle }}</title>
    <meta name="description" content="{{ $ogDesc }}">

    <meta property="og:site_name" content="{{ $namaSekolah }}">
    <meta property="og:type" content="{{ $ogType }}">
    <meta property="og:title" content="{{ $ogTitle }}">
    <meta property="og:description" content="{{ $ogDesc }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ $ogImage }}">
    <meta property="og:image:secure_url" content="{{ $ogImage }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $ogTitle }}">
    <meta name="twitter:description" content="{{ $ogDesc }}">
    <meta name="twitter:image" content="{{ $ogImage }}">
    @inertiaHead

    @viteReactRefresh
@vite(['resources/css/app.css', 'resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
</head>
<body class="bg-gray-50 text-gray-900 font-sans antialiased">
    @inertia
</body>
</html>
