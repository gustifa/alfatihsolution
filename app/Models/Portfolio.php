<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Portfolio extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'galeri_gambar' => 'array',
        'teknologi' => 'array',
        'is_featured' => 'boolean',
        'tanggal_selesai' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($portfolio) {
            if (empty($portfolio->slug)) {
                $portfolio->slug = Str::slug($portfolio->judul_proyek);
            }
        });
    }

    /**
     * Relasi ke Layanan (Service)
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
