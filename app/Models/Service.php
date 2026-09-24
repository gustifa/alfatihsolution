<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Service extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'fitur' => 'array',
        'is_active' => 'boolean',
        'harga_mulai' => 'decimal:2',
        'urutan' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($service) {
            if (empty($service->slug)) {
                $service->slug = Str::slug($service->nama_layanan);
            }
        });
    }

    /**
     * Portofolio terkait layanan ini (misal: portofolio web/aplikasi)
     */
    public function portfolios(): HasMany
    {
        return $this->hasMany(Portfolio::class);
    }

    /**
     * Produk/Modul ajar terkait layanan ini
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Order atau leads konsultasi yang masuk untuk layanan ini
     */
    public function consultationOrders(): HasMany
    {
        return $this->hasMany(ConsultationOrder::class);
    }

    /**
     * Testimoni klien terkait layanan ini
     */
    public function testimonials(): HasMany
    {
        return $this->hasMany(Testimonial::class);
    }
}
