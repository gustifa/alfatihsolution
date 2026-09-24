<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'harga' => 'decimal:2',
        'is_free' => 'boolean',
        'is_active' => 'boolean',
        'total_download' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->nama_produk);
            }
        });
    }

    /**
     * Relasi ke kategori Layanan (Service)
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Relasi ke pesanan/leads konsultasi
     */
    public function consultationOrders(): HasMany
    {
        return $this->hasMany(ConsultationOrder::class);
    }
}
