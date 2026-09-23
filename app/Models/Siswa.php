<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Siswa extends Model
{
    use HasFactory;

    protected $guarded = [];
    // protected $fillable = [
    //     'nis',
    //     'nama',
    //     'jenis_kelamin',
    //     'rombel_id',
    //     'status',
    // ];

    public function presensi(): HasMany
    {
        return $this->hasMany(Presensi::class);
    }
}
