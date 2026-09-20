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
        Schema::table('profil_sekolahs', function (Blueprint $table) {
            $table->dropColumn('gambar_hero');
        });
        Schema::table('profil_sekolahs', function (Blueprint $table) {
            $table->json('gambar_hero')->nullable()->after('hero_deskripsi');
        });
    }

    public function down(): void
    {
        Schema::table('profil_sekolahs', function (Blueprint $table) {
            $table->dropColumn('gambar_hero');
        });
        Schema::table('profil_sekolahs', function (Blueprint $table) {
            $table->string('gambar_hero')->nullable();
        });
    }
};
