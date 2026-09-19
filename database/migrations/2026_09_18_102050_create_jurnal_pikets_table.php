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
        Schema::create('jurnal_pikets', function (Blueprint $table) {
            $table->id();
            // Relasi ke tabel users (untuk mendata siapa guru piket yang melapor)
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            
            // Data laporan harian
            $table->date('tanggal');
            $table->string('cuaca')->nullable();
            $table->text('kondisi_kbm')->nullable(); // Catatan kelancaran PBM
            $table->text('kejadian_penting')->nullable(); // Siswa sakit, tamu dinas, insiden, dll
            
            // Bukti fisik
            $table->string('foto_lampiran')->nullable();
            
            // Status persetujuan (Bisa dikembangkan nanti untuk ACC Kepala Sekolah)
            $table->enum('status', ['draft', 'diserahkan', 'disetujui'])->default('draft');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jurnal_pikets');
    }
};
