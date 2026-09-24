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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            // Relasi ke layanan (Web, Aplikasi, Modul Ajar, atau Servis)
            $table->foreignId('service_id')->nullable()->constrained('services')->nullOnDelete();

            $table->string('nama_klien');
            $table->string('perusahaan_instansi')->nullable();
            $table->string('jabatan')->nullable(); // Contoh: Guru Penggerak / Owner Cafe
            $table->string('foto_avatar')->nullable();
            $table->unsignedTinyInteger('rating')->default(5); // 1 sampai 5
            $table->text('pesan_testimoni');

            $table->boolean('is_featured')->default(false); // Muncul di Hero/Landing page
            $table->boolean('is_published')->default(true);
            $table->integer('urutan')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
