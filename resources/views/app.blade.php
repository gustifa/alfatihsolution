<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Meta tag dinamis dari Inertia Head akan dirender di sini untuk SEO -->
    @inertiaHead 

    @viteReactRefresh
@vite(['resources/css/app.css', 'resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
</head>
<body class="bg-gray-50 text-gray-900 font-sans antialiased">
    @inertia
</body>
</html>