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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('nama_layanan');
            $table->string('slug')->unique();
            $table->enum('kategori', ['web', 'aplikasi', 'modul_ajar', 'service_perangkat', 'lainnya']);
            $table->string('icon')->nullable(); // Class icon (FontAwesome/Heroicons) atau path gambar
            $table->string('gambar_thumbnail')->nullable();
            $table->text('deskripsi_singkat');
            $table->longText('deskripsi_lengkap')->nullable();
            $table->decimal('harga_mulai', 12, 2)->default(0);
            $table->json('fitur')->nullable(); // Array checklist fitur layanan
            $table->boolean('is_active')->default(true);
            $table->integer('urutan')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
