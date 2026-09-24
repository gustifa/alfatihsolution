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
        Schema::create('company_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('nama_perusahaan')->default('Al-Fatih Solution');
            $table->string('slogan')->nullable()->default('Software House & IT Solution');
            $table->text('alamat')->nullable();
            $table->string('telepon', 30)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('hero_tagline')->nullable()->default('Solusi Pembuatan Web, Aplikasi, Modul Ajar & Servis IT');
            $table->string('hero_title')->nullable()->default('Tingkatkan Produktivitas Digital & Kebutuhan Teknologi Anda');
            $table->text('hero_subtitle')->nullable();
            $table->string('whatsapp_admin', 25)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_profiles');
    }
};
