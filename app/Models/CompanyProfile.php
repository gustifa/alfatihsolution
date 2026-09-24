<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CompanyProfile extends Model
{
    use HasFactory;

    protected $table = 'company_profiles';

    protected $fillable = [
        'nama_perusahaan',
        'slogan',
        'alamat',
        'telepon',
        'email',
        'hero_tagline',
        'hero_title',
        'hero_subtitle',
        'whatsapp_admin',
    ];
}
