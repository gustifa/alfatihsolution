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
        Schema::create('service_tickets', function (Blueprint $table) {
            $table->id();
            $table->string('no_tiket')->unique(); // Contoh: SRV-2026-0001

            // Relasi ke order/leads & teknisi penanggung jawab (users)
            $table->foreignId('consultation_order_id')->nullable()->constrained('consultation_orders')->nullOnDelete();
            $table->foreignId('teknisi_id')->nullable()->constrained('users')->nullOnDelete();

            // Identitas Klien (jika walk-in langsung ke toko tanpa order online)
            $table->string('nama_pelanggan');
            $table->string('no_whatsapp');

            // Detail Perangkat & Masalah
            $table->string('nama_perangkat'); // Contoh: Laptop Asus Vivobook / PC Rakitan
            $table->string('nomor_seri')->nullable();
            $table->text('keluhan_kerusakan');
            $table->string('kelengkapan')->nullable(); // Unit + Charger + Tas
            $table->text('hasil_diagnosa')->nullable();
            $table->text('tindakan_perbaikan')->nullable();

            // Finansial
            $table->decimal('biaya_sparepart', 12, 2)->default(0);
            $table->decimal('biaya_jasa', 12, 2)->default(0);
            $table->decimal('total_biaya', 12, 2)->default(0);
            $table->enum('status_pembayaran', ['belum_bayar', 'dp', 'lunas'])->default('belum_bayar');

            // Tracking Progress
            $table->enum('status_servis', [
                'diterima',
                'pemeriksaan',
                'menunggu_sparepart',
                'pengerjaan',
                'siap_diambil',
                'selesai',
                'batal_tidak_bisa'
            ])->default('diterima');

            $table->timestamp('tanggal_masuk')->useCurrent();
            $table->timestamp('tanggal_selesai')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_tickets');
    }
};
