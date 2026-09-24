<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Get;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';

    protected static ?string $navigationLabel = 'Modul & Produk IT';

    protected static ?string $modelLabel = 'Produk Modul';

    protected static ?string $pluralModelLabel = 'Katalog Modul Ajar';

    protected static ?string $navigationGroup = 'Manajemen Modul & Aset';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Informasi Produk / Modul')
                            ->description('Detail utama materi, modul ajar kurikulum, atau e-book IT')
                            ->schema([
                                Forms\Components\TextInput::make('nama_produk')
                                    ->label('Nama Produk / Modul')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state)))
                                    ->placeholder('Contoh: Dasar Program Keahlian TKJ'),

                                Forms\Components\TextInput::make('slug')
                                    ->label('Slug URL')
                                    ->required()
                                    ->maxLength(255)
                                    ->readOnly()
                                    ->helperText('Otomatis terisi dari nama produk'),

                                Forms\Components\Select::make('service_id')
                                    ->label('Terkait Layanan (Opsional)')
                                    ->relationship('service', 'nama_layanan')
                                    ->searchable()
                                    ->preload()
                                    ->placeholder('Pilih layanan terkait...'),

                                Forms\Components\Select::make('tipe')
                                    ->label('Tipe Materi')
                                    ->required()
                                    ->options([
                                        'MODUL_AJAR' => 'Modul Ajar / LKPD',
                                        'E_BOOK'     => 'E-Book / Panduan PDF',
                                        'SOURCE_CODE'=> 'Source Code / Template',
                                        'VIDEO_TUTOR'=> 'Video Tutorial',
                                        'LAINNYA'    => 'Lainnya',
                                    ])
                                    ->default('MODUL_AJAR')
                                    ->native(false),

                                Forms\Components\TextInput::make('tingkat_jenjang')
                                    ->label('Tingkat / Fase Jenjang')
                                    ->maxLength(255)
                                    ->placeholder('Contoh: Fase E / Kelas X SMK, Umum'),

                                Forms\Components\Textarea::make('deskripsi')
                                    ->label('Deskripsi Lengkap')
                                    ->required()
                                    ->rows(4)
                                    ->placeholder('Jelaskan cakupan materi, capaian pembelajaran, atau isi file...')
                                    ->columnSpanFull(),
                            ])->columns(2),

                        Forms\Components\Section::make('Berkas & Lampiran Modul')
                            ->schema([
                                Forms\Components\FileUpload::make('file_preview')
                                    ->label('File Preview Sampel (PDF Ringkas)')
                                    ->directory('products/previews')
                                    ->acceptedFileTypes(['application/pdf'])
                                    ->helperText('File contoh untuk dilihat calon pemesan secara gratis (opsional)'),

                                Forms\Components\FileUpload::make('file_utama')
                                    ->label('File Utama Modul (Full Version)')
                                    ->directory('products/files')
                                    ->helperText('Berkas utuh yang dapat diunduh jika modul diatur gratis'),
                            ])->columns(2),
                    ])->columnSpan(['lg' => 2]),

                Forms\Components\Group::make()
                    ->schema([
                        Forms\Components\Section::make('Sampul / Cover Buku')
                            ->schema([
                                Forms\Components\FileUpload::make('cover_buku')
                                    ->label('Cover Buku / Gambar Modul')
                                    ->image()
                                    ->directory('products/covers')
                                    ->imageResizeMode('cover')
                                    ->imageCropAspectRatio('3:4')
                                    ->helperText('Format foto rasio buku 3:4 portrait untuk tampilan kartu web'),
                            ]),

                        Forms\Components\Section::make('Skema Penetapan Harga')
                            ->schema([
                                Forms\Components\Toggle::make('is_free')
                                    ->label('Modul Gratis (Free Download)')
                                    ->live()
                                    ->default(false)
                                    ->afterStateUpdated(function (Set $set, bool $state) {
                                        if ($state) {
                                            $set('harga', 0);
                                        }
                                    }),

                                Forms\Components\TextInput::make('harga')
                                    ->label('Nominal Harga (Rp)')
                                    ->numeric()
                                    ->prefix('Rp')
                                    ->default(0)
                                    ->required()
                                    ->disabled(fn (Get $get) => $get('is_free'))
                                    ->dehydrated(),
                            ]),

                        Forms\Components\Section::make('Pengaturan Status')
                            ->schema([
                                Forms\Components\Toggle::make('is_active')
                                    ->label('Tampilkan di Katalog Beranda')
                                    ->default(true),

                                Forms\Components\TextInput::make('total_download')
                                    ->label('Total Unduhan')
                                    ->numeric()
                                    ->default(0)
                                    ->disabled()
                                    ->dehydrated(false),
                            ]),
                    ])->columnSpan(['lg' => 1]),
            ])->columns(3);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('cover_buku')
                    ->label('Sampul')
                    ->square()
                    ->defaultImageUrl(url('/images/placeholder-book.png')),

                Tables\Columns\TextColumn::make('nama_produk')
                    ->label('Nama Modul / Produk')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->wrap(),

                Tables\Columns\TextColumn::make('tipe')
                    ->label('Tipe')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'MODUL_AJAR' => 'success',
                        'E_BOOK'     => 'info',
                        'SOURCE_CODE'=> 'warning',
                        default      => 'gray',
                    }),

                Tables\Columns\TextColumn::make('tingkat_jenjang')
                    ->label('Jenjang')
                    ->color('gray')
                    ->placeholder('-'),

                Tables\Columns\TextColumn::make('harga')
                    ->label('Harga')
                    ->formatStateUsing(fn ($record) => $record->is_free ? 'GRATIS' : 'Rp ' . number_format($record->harga, 0, ',', '.'))
                    ->sortable()
                    ->weight('semibold')
                    ->color(fn ($record) => $record->is_free ? 'success' : 'primary'),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean()
                    ->alignCenter(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('tipe')
                    ->label('Filter Tipe')
                    ->options([
                        'MODUL_AJAR' => 'Modul Ajar / LKPD',
                        'E_BOOK'     => 'E-Book / Dokumen',
                        'SOURCE_CODE'=> 'Source Code',
                        'LAINNYA'    => 'Lainnya',
                    ]),

                Tables\Filters\TernaryFilter::make('is_free')
                    ->label('Jenis Lisensi')
                    ->placeholder('Semua Tipe')
                    ->trueLabel('Gratis Saja')
                    ->falseLabel('Berbayar Saja'),

                Tables\Filters\TernaryFilter::make('is_active')
                    ->label('Visibilitas')
                    ->placeholder('Semua')
                    ->trueLabel('Aktif')
                    ->falseLabel('Nonaktif'),
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
