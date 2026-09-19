<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            // Relasi ke pembuat artikel (Guru/Admin/Kepsek)
            $table->foreignId('author_id')->constrained('users')->cascadeOnDelete();
            
            // Konten Utama
            $table->string('title');
            $table->string('slug')->unique(); // Sangat penting: URL yang ramah SEO (misal: /berita/juara-lks-2026)
            $table->longText('content');
            $table->string('featured_image')->nullable(); // Gambar *thumbnail* berita
            
            // Kolom Khusus SEO
            $table->string('meta_title')->nullable(); // Judul khusus untuk mesin pencari (opsional, jika beda dengan title)
            $table->string('meta_description', 160)->nullable(); // Deskripsi singkat untuk Google (maks 160 karakter)
            $table->string('meta_keywords')->nullable(); // Kata kunci (opsional untuk *tagging*)
            
            // Status & Penjadwalan
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->timestamp('published_at')->nullable(); // Mendukung fitur rilis berita terjadwal
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
