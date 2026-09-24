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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->nullable()->constrained('services')->nullOnDelete();
            $table->string('nama_produk'); // Contoh: Modul Ajar Informatika Fase E
            $table->string('slug')->unique();
            $table->enum('tipe', ['modul_ajar', 'source_code', 'ebook', 'software']);
            $table->string('tingkat_jenjang')->nullable(); // SD/SMP/SMA/SMK/Umum
            $table->decimal('harga', 12, 2)->default(0); // 0 jika gratis
            $table->boolean('is_free')->default(false);
            $table->string('cover_buku')->nullable();
            $table->string('file_preview')->nullable(); // PDF sample
            $table->string('file_utama')->nullable(); // File unduhan asli (ZIP/PDF)
            $table->text('deskripsi');
            $table->integer('total_download')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
