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
        Schema::table('siswas', function (Blueprint $table) {
            // Menyimpan koordinat matriks wajah dari AI
            $table->text('face_descriptor')->nullable()->after('barcode_uid');
            // Menyimpan pas foto referensi
            $table->string('foto_wajah')->nullable()->after('face_descriptor');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('siswas', function (Blueprint $table) {
            $table->dropColumn(['face_descriptor', 'foto_wajah']);
        });
    }
};
