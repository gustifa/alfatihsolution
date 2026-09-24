<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    @php
        // Mengambil data halaman Inertia langsung dari server
        $pageProps = $page['props'] ?? [];
        $post = $pageProps['post'] ?? null;
        $pengaturan = $pageProps['pengaturanWeb'] ?? null;

        $namaSekolah = is_array($pengaturan)
            ? ($pengaturan['nama_sekolah'] ?? 'SDN 59 Payakumbuh')
            : ($pengaturan->nama_sekolah ?? 'SDN 59 Payakumbuh');

        if ($post) {
            // Halaman Berita Detail
            $ogTitle = is_array($post) ? $post['title'] : $post->title;
            $ogDesc = is_array($post)
                ? ($post['meta_description'] ?? 'Baca artikel selengkapnya di situs resmi sekolah kami.')
                : ($post->meta_description ?? 'Baca artikel selengkapnya di situs resmi sekolah kami.');

            $imgRaw = is_array($post) ? ($post['featured_image'] ?? null) : ($post->featured_image ?? null);
            if ($imgRaw) {
                $ogImage = str_starts_with($imgRaw, 'http') ? $imgRaw : asset('storage/' . $imgRaw);
            } else {
                $ogImage = asset('images/default-berita.jpg');
            }
            $ogType = 'article';
        } else {
            // Halaman Beranda & Umum
            $ogTitle = $namaSekolah;
            $ogDesc = is_array($pengaturan)
                ? ($pengaturan['slogan'] ?? 'Website Resmi Sekolah')
                : ($pengaturan->slogan ?? 'Website Resmi Sekolah');

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
    <meta property="og:image" content="{{ $ogImage }}">
    <meta property="og:image:secure_url" content="{{ $ogImage }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:url" content="{{ url()->current() }}">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $ogTitle }}">
    <meta name="twitter:description" content="{{ $ogDesc }}">
    <meta name="twitter:image" content="{{ $ogImage }}">

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="bg-gray-50 text-gray-900 font-sans antialiased">
    @inertia
</body>
</html>
