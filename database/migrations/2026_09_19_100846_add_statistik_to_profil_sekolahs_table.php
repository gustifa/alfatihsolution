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
            $table->integer('jumlah_siswa')->default(0)->after('favicon');
            $table->integer('jumlah_guru')->default(0)->after('jumlah_siswa');
            $table->integer('jumlah_rombel')->default(0)->after('jumlah_guru');
            $table->integer('jumlah_program')->default(0)->after('jumlah_rombel');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profil_sekolahs', function (Blueprint $table) {
            $table->dropColumn(['jumlah_siswa', 'jumlah_guru', 'jumlah_rombel', 'jumlah_program']);
        });
    }
};
