<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiswaResource\Pages;
use App\Filament\Resources\SiswaResource\RelationManagers;
use App\Models\Siswa;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use App\Models\Rombel;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Filament\Notifications\Notification;
use Illuminate\Database\Eloquent\Collection;

class SiswaResource extends Resource
{
    protected static ?string $model = Siswa::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    // 2. Ubah label di sidebar agar tidak ada akhiran "s"
    protected static ?string $navigationLabel = 'Data Siswa';
    protected static ?string $pluralModelLabel = 'Data Siswa';
    // 3. Masukkan ke dalam grup dropdown (Folder)
    protected static ?string $navigationGroup = 'Data Induk';

    // 4. Atur urutan menu (angka lebih kecil = posisi lebih atas)
    protected static ?int $navigationSort = 20;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Identitas Siswa')->schema([
                TextInput::make('nis')
                    ->label('NIS / NISN')
                    ->required()
                    ->unique(ignoreRecord: true),

                TextInput::make('nama')
                    ->label('Nama Lengkap')
                    ->required(),

                // Select::make('kelas')
                //     ->label('Kelas / Rombel')
                //     ->options([
                //         'X TITL 1' => 'X TITL 1',
                //         'X TITL 2' => 'X TITL 2',
                //         'XI TITL' => 'XI TITL',
                //         'XII TITL' => 'XII TITL',
                //     ])
                //     ->searchable()
                //     ->required(),

                Select::make('kelas') // sesuaikan dengan nama kolom kelas di tabel 'siswas' Anda
                    ->label('Kelas / Rombel')
                    ->options(Rombel::pluck('nama_rombel', 'nama_rombel'))
                    ->searchable()
                    ->preload()
                    ->required(),

                TextInput::make('barcode_uid')
                    ->label('UID Barcode / RFID')
                    ->placeholder('Scan kartu/barcode di sini...')
                    ->unique(ignoreRecord: true)
                    ->helperText('Arahkan kursor ke sini dan gunakan alat scanner untuk mengisi kode secara otomatis.'),
            ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nis')->searchable()->sortable(),
                TextColumn::make('nama')->searchable()->sortable(),
                TextColumn::make('kelas')->searchable()->sortable(),
                TextColumn::make('barcode_uid')
                    ->label('UID Scanner')
                    ->searchable()
                    ->copyable() // Memudahkan penyalinan kode
                    ->toggleable(isToggledHiddenByDefault: true), // Sembunyikan default agar tabel tidak penuh
                ])
            ->filters([
                Tables\Filters\SelectFilter::make('kelas')
                ->options([
                    'X TITL 1' => 'X TITL 1',
                    'X TITL 2' => 'X TITL 2',
                    'XI TITL' => 'XI TITL',
                    'XII TITL' => 'XII TITL',
                ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    // Tombol Generate Akun Massal
                Tables\Actions\BulkAction::make('generate_akun')
                    ->label('Generate Akun')
                    ->icon('heroicon-o-users')
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Generate Akun Siswa')
                    ->modalDescription('Sistem akan membuatkan akun login (User) untuk siswa yang dipilih. Password bawaan adalah NIS siswa masing-masing.')
                    ->action(function (Collection $records) {
                        $berhasil = 0;
                        $dilewati = 0;

                        foreach ($records as $siswa) {
                            $emailSiswa = $siswa->nis . '@smkn1bukittinggi.sch.id';

                            // Cek apakah akun dengan email ini sudah pernah dibuat
                            if (! User::where('email', $emailSiswa)->exists()) {
                                $user = User::create([
                                    'name' => $siswa->nama,
                                    'email' => $emailSiswa,
                                    'password' => Hash::make($siswa->nis), // Password pakai NIS
                                ]);

                                // Berikan hak akses sebagai Siswa
                                // Pastikan role 'panel_user' atau 'Siswa' sudah dibuat di Filament Shield
                                $user->assignRole('Siswa');

                                $berhasil++;
                            } else {
                                $dilewati++;
                            }
                        }

                        // Munculkan notifikasi hasil
                        Notification::make()
                            ->title('Generate Akun Selesai')
                            ->body("$berhasil akun baru berhasil dibuat. $dilewati akun dilewati karena sudah ada.")
                            ->success()
                            ->send();
                    })
                    ->deselectRecordsAfterCompletion(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSiswas::route('/'),
            'create' => Pages\CreateSiswa::route('/create'),
            'edit' => Pages\EditSiswa::route('/{record}/edit'),
        ];
    }
}
