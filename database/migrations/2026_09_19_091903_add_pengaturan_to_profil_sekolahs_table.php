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
            $table->string('nama_sekolah')->default('SMK Negeri 1 Bukittinggi')->after('id');
            $table->string('slogan')->nullable()->after('nama_sekolah');
            $table->string('telepon')->nullable()->after('slogan');
            $table->string('email')->nullable()->after('telepon');
            $table->text('alamat')->nullable()->after('email');
            $table->string('logo')->nullable()->after('alamat');
            $table->string('favicon')->nullable()->after('logo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profil_sekolahs', function (Blueprint $table) {
            $table->dropColumn(['nama_sekolah', 'slogan', 'telepon', 'email', 'alamat', 'logo', 'favicon']);
        });
    }
};
