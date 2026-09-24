<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceResource\Pages;
use App\Models\Service;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ServiceResource extends Resource
{
    protected static ?string $model = Service::class;

    protected static ?string $navigationIcon = 'heroicon-o-wrench-screwdriver';

    protected static ?string $navigationLabel = 'Layanan Jasa';

    protected static ?string $modelLabel = 'Layanan';

    protected static ?string $pluralModelLabel = 'Katalog Layanan';

    protected static ?string $navigationGroup = 'Manajemen Layanan';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Layanan')
                    ->description('Detail jenis jasa atau layanan yang ditawarkan ke klien')
                    ->schema([
                        Forms\Components\TextInput::make('nama_layanan')
                            ->label('Nama Layanan')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state)))
                            ->placeholder('Contoh: Service Komputer & Printer'),

                        Forms\Components\TextInput::make('slug')
                            ->label('Slug URL')
                            ->required()
                            ->maxLength(255)
                            ->readOnly()
                            ->helperText('Otomatis dibuat dari nama layanan'),

                        Forms\Components\Select::make('kategori')
                            ->label('Kategori Layanan')
                            ->required()
                            ->options([
                                'web_app' => 'Web & Aplikasi',
                                'perangkat_hardware' => 'Perbaikan & Servis Perangkat',
                                'jaringan' => 'Jaringan & Server',
                                'edukasi' => 'Modul & Pelatihan IT',
                                'lainnya' => 'Lainnya',
                            ])
                            ->default('perangkat_hardware')
                            ->native(false),

                        Forms\Components\TextInput::make('icon')
                            ->label('Ikon Layanan (Emoji / Simbol)')
                            ->maxLength(50)
                            ->placeholder('Contoh: 🖨️, 💻, 📱, atau 🛠️')
                            ->helperText('Bisa menggunakan emoji untuk ditampilkan pada kartu layanan di landing page'),

                        Forms\Components\TextInput::make('urutan')
                            ->label('Nomor Urutan Tampil')
                            ->numeric()
                            ->default(1)
                            ->required(),

                        Forms\Components\Textarea::make('deskripsi_singkat')
                            ->label('Deskripsi Singkat')
                            ->rows(3)
                            ->required()
                            ->placeholder('Penjelasan ringkas layanan untuk kartu di landing page...')
                            ->columnSpanFull(),

                        Forms\Components\RichEditor::make('deskripsi_lengkap')
                            ->label('Deskripsi Lengkap & Spesifikasi')
                            ->placeholder('Jelaskan detail alur kerja, estimasi waktu, atau garansi...')
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Pengaturan Tampilan')
                    ->schema([
                        Forms\Components\Toggle::make('is_active')
                            ->label('Tampilkan di Landing Page')
                            ->helperText('Jika aktif, layanan ini akan muncul di halaman utama dan pilihan dropdown form konsultasi')
                            ->default(true),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('urutan')
                    ->label('Urutan')
                    ->sortable()
                    ->alignCenter()
                    ->width(70),

                Tables\Columns\TextColumn::make('icon')
                    ->label('Ikon')
                    ->alignCenter()
                    ->width(70),

                Tables\Columns\TextColumn::make('nama_layanan')
                    ->label('Nama Layanan')
                    ->searchable()
                    ->weight('bold')
                    ->wrap(),

                Tables\Columns\TextColumn::make('kategori')
                    ->label('Kategori')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'web_app' => 'primary',
                        'perangkat_hardware' => 'warning',
                        'jaringan' => 'info',
                        'edukasi' => 'success',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'web_app' => 'Web & Aplikasi',
                        'perangkat_hardware' => 'Perangkat & Servis',
                        'jaringan' => 'Jaringan',
                        'edukasi' => 'Edukasi',
                        default => ucfirst($state),
                    }),

                Tables\Columns\TextColumn::make('deskripsi_singkat')
                    ->label('Ringkasan')
                    ->limit(60)
                    ->tooltip(fn ($record) => $record->deskripsi_singkat)
                    ->color('gray'),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean()
                    ->alignCenter(),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Terakhir Diubah')
                    ->dateTime('d M Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('urutan', 'asc')
            ->reorderable('urutan')
            ->filters([
                Tables\Filters\SelectFilter::make('kategori')
                    ->label('Filter Kategori')
                    ->options([
                        'web_app' => 'Web & Aplikasi',
                        'perangkat_hardware' => 'Perbaikan & Servis Perangkat',
                        'jaringan' => 'Jaringan & Server',
                        'edukasi' => 'Modul & Pelatihan IT',
                        'lainnya' => 'Lainnya',
                    ]),

                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Visibilitas')
                    ->placeholder('Semua Status')
                    ->trueLabel('Aktif Saja')
                    ->falseLabel('Nonaktif Saja'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
