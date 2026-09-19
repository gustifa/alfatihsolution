<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JurnalPiket extends Model
{
    use HasFactory;
    // Izinkan semua kolom diisi
    protected $guarded = [];

    // Relasi ke tabel pengguna (Guru Piket)
    public function petugas(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
