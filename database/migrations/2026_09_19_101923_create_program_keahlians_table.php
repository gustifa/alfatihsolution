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
        Schema::create('program_keahlians', function (Blueprint $table) {
            $table->id();
            $table->string('nama_program');
            $table->string('singkatan')->nullable();
            $table->text('deskripsi')->nullable();
            $table->string('icon')->nullable(); // Untuk menyimpan ikon/gambar jurusan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_keahlians');
    }
};
