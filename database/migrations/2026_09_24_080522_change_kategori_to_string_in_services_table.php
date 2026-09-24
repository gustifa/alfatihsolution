<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Mbatalake aturan check constraint lawas ing PostgreSQL
        DB::statement('ALTER TABLE services DROP CONSTRAINT IF EXISTS services_kategori_check');

        Schema::table('services', function (Blueprint $table) {
            $table->string('kategori', 100)->change();
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('kategori')->change();
        });
    }
};
