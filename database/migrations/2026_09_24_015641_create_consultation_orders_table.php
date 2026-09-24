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
        Schema::create('consultation_orders', function (Blueprint $table) {
            $table->id();
            $table->string('kode_pesanan')->unique(); // Contoh: ORD-202609-001
            $table->foreignId('service_id')->nullable()->constrained('services')->nullOnDelete();
            $table->foreignId('product_id')->nullable()->constrained('products')->nullOnDelete();

            // Identitas Klien
            $table->string('nama_klien');
            $table->string('no_whatsapp');
            $table->string('email')->nullable();
            $table->string('instansi_perusahaan')->nullable();

            // Detail Kebutuhan
            $table->text('catatan_kebutuhan');
            $table->decimal('budget_estimasi', 12, 2)->nullable();
            $table->string('file_lampiran')->nullable(); // Dokumen brief / foto kerusakan perangkat

            // Tracking Status
            $table->enum('status', [
                'menunggu_respon',
                'diskusi_analisis',
                'penawaran_harga',
                'pengerjaan',
                'selesai',
                'dibatalkan'
            ])->default('menunggu_respon');

            $table->text('catatan_internal')->nullable(); // Catatan admin/teknisi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultation_orders');
    }
};
