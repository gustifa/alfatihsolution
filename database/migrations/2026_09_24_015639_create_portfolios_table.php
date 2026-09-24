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
        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            // Relasi ke Layanan (Nullable jika proyek gabungan / independen)
            $table->foreignId('service_id')->nullable()->constrained('services')->nullOnDelete();
            $table->string('judul_proyek');
            $table->string('slug')->unique();
            $table->string('nama_klien')->nullable();
            $table->date('tanggal_selesai')->nullable();
            $table->string('gambar_utama');
            $table->json('galeri_gambar')->nullable(); // Screenshots tambahan
            $table->json('teknologi')->nullable(); // Misal: ["Laravel", "Flutter", "TailwindCSS"]
            $table->string('url_demo')->nullable();
            $table->text('deskripsi');
            $table->boolean('is_featured')->default(false); // Ditampilkan di halaman depan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};
