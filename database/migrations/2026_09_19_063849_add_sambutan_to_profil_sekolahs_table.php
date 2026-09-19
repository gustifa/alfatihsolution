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
            $table->string('nama_kepala_sekolah')->nullable()->after('id');
            $table->string('foto_kepala_sekolah')->nullable()->after('nama_kepala_sekolah');
            $table->text('sambutan_kepala_sekolah')->nullable()->after('foto_kepala_sekolah');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profil_sekolahs', function (Blueprint $table) {
            $table->dropColumn(['nama_kepala_sekolah', 'foto_kepala_sekolah', 'sambutan_kepala_sekolah']);
        });
    }
};
