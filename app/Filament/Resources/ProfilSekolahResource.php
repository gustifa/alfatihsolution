<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProfilSekolahResource\Pages;
use App\Filament\Resources\ProfilSekolahResource\RelationManagers;
use App\Models\ProfilSekolah;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput; // Tambahkan ini di atas
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Forms\Components\Textarea;

class ProfilSekolahResource extends Resource
{
    protected static ?string $model = ProfilSekolah::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Identitas & Pengaturan Web')->schema([
                TextInput::make('nama_sekolah')->required(),
                TextInput::make('slogan')->placeholder('Contoh: Disiplin, Terampil, Berkarakter'),
                TextInput::make('telepon'),
                TextInput::make('email')->email(),
                Textarea::make('alamat'),
                FileUpload::make('logo')
                    ->label('Logo Sekolah (Navbar)')
                    ->image()->directory('pengaturan'),
                FileUpload::make('favicon')
                    ->label('Web Icon (Favicon / Tab Browser)')
                    ->image()->directory('pengaturan'),
            ])->columns(2), // Membuat tampilannya menjadi 2 kolom agar rapi
                Section::make('Sambutan Kepala Sekolah')->schema([
                    TextInput::make('nama_kepala_sekolah')
                        ->label('Nama Kepala Sekolah'),
                    FileUpload::make('foto_kepala_sekolah')
                        ->label('Foto Kepala Sekolah')
                        ->image()
                        ->directory('profil')
                        ->avatar(),
                    RichEditor::make('sambutan_kepala_sekolah')
                        ->label('Isi Sambutan')
                        ->columnSpanFull(),
                ]),

                Section::make('Statistik Data SMK')->schema([
                TextInput::make('jumlah_siswa')
                    ->label('Total Siswa')
                    ->numeric()
                    ->default(0),
                TextInput::make('jumlah_guru')
                    ->label('Total Guru & Staff')
                    ->numeric()
                    ->default(0),
                TextInput::make('jumlah_rombel')
                    ->label('Total Rombel / Kelas')
                    ->numeric()
                    ->default(0),
                TextInput::make('jumlah_program')
                    ->label('Program Keahlian')
                    ->numeric()
                    ->default(0),
            ])->columns(4), // Menjadikannya 4 kolom sejajar agar hemat tempat

                Section::make('Pengaturan Teks Beranda (Hero)')->schema([
                    TextInput::make('hero_title')
                        ->label('Judul Utama (Hero)')
                        ->placeholder('Contoh: Mencetak Generasi Siap Kerja'),
                    Textarea::make('hero_deskripsi')
                        ->label('Deskripsi Singkat (Hero)')
                        ->placeholder('Pusat keunggulan vokasi yang mengedepankan akhlak mulia...'),
                ]),

                Section::make('Informasi Dasar')->schema([
                    RichEditor::make('sejarah_singkat')
                        ->label('Sejarah Singkat Sekolah')
                        ->columnSpanFull(),
                    RichEditor::make('visi')
                        ->label('Visi Sekolah')
                        ->columnSpanFull(),
                    RichEditor::make('misi')
                        ->label('Misi Sekolah')
                        ->columnSpanFull(),
                ]),
            Section::make('Struktur Organisasi')->schema([
                FileUpload::make('foto_struktur_organisasi')
                    ->label('Bagan Struktur Organisasi (Gambar)')
                    ->image()
                    ->directory('profil')
                    ->columnSpanFull(),
            ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                ->label('ID')
                ->sortable(),
            
                TextColumn::make('visi')
                    ->label('Visi')
                    ->limit(50)
                    ->searchable(),
                    
                ImageColumn::make('foto_struktur_organisasi')
                    ->label('Struktur Organisasi')
                    ->square(),
                    
                TextColumn::make('updated_at')
                    ->label('Terakhir Diperbarui')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListProfilSekolahs::route('/'),
            'create' => Pages\CreateProfilSekolah::route('/create'),
            'edit' => Pages\EditProfilSekolah::route('/{record}/edit'),
        ];
    }
}
