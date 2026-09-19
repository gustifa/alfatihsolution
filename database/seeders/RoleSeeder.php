<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role; // <-- Tambahkan baris ini[cite: 6]

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['Admin', 'Kepsek', 'Guru', 'Piket', 'Siswa']; //[cite: 6]

        foreach ($roles as $role) { //[cite: 6]
            Role::create(['name' => $role]); //[cite: 6]
        } //[cite: 6]
    }
}
