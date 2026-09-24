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

    protected static ?string $modelLabel = 'Modul & Produk';

    protected static ?string $pluralModelLabel = 'Katalog Modul & Produk';

    protected static ?string $navigationGroup = 'Manajemen Produk';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Produk / Modul')
                    ->description('Detail nama produk, tipe file, dan deskripsi materi')
                    ->schema([
                        Forms\Components\TextInput::make('nama_produk')
                            ->label('Nama Produk / Modul')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state)))
                            ->placeholder('Contoh: Modul Ajar Informatika SMK Fase E'),

                        Forms\Components\TextInput::make('slug')
                            ->label('Slug URL')
                            ->required()
                            ->maxLength(255)
                            ->readOnly()
                            ->helperText('Otomatis dibuat dari nama produk'),

                        Forms\Components\Select::make('tipe')
                            ->label('Tipe / Kategori Modul')
                            ->required()
                            ->options([
                                'modul_ajar' => 'Modul Ajar',
                                'praktikum' => 'Lembar Praktikum / Jobsheet',
                                'source_code' => 'Source Code Aplikasi',
                                'ebook' => 'E-Book / Panduan',
                                'lainnya' => 'Lainnya',
                            ])
                            ->default('modul_ajar')
                            ->native(false)
                            ->columnSpanFull(),

                        Forms\Components\Textarea::make('deskripsi')
                            ->label('Deskripsi Materi / Kelengkapan')
                            ->required() // Wajib diisi agar tidak memicu error NOT NULL constraint di PostgreSQL
                            ->rows(4)
                            ->placeholder('Jelaskan isi capaian belajar, materi, atau fitur yang didapat...')
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Harga & Akses Unduh')
                    ->description('Atur skema pembayaran dan unggah berkas utama produk')
                    ->schema([
                        Forms\Components\Toggle::make('is_free')
                            ->label('Produk Gratis (Free Download)')
                            ->helperText('Jika aktif, pengunjung dapat langsung mengunduh tanpa biaya')
                            ->live()
                            ->default(false),

                        Forms\Components\TextInput::make('harga')
                            ->label('Harga Jual (Rp)')
                            ->numeric()
                            ->prefix('Rp')
                            ->default(0)
                            ->visible(fn (Get $get): bool => ! $get('is_free'))
                            ->required(fn (Get $get): bool => ! $get('is_free'))
                            ->placeholder('Contoh: 50000'),

                        Forms\Components\FileUpload::make('file_utama')
                            ->label('Berkas Modul / ZIP')
                            ->disk('public')
                            ->directory('products/files')
                            ->acceptedFileTypes([
                                'application/pdf',
                                'application/zip',
                                'application/x-zip-compressed',
                                'application/msword',
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            ])
                            ->maxSize(51200) // Maks 50 MB
                            ->helperText('Format file yang didukung: PDF, DOCX, ZIP (Maks. 50MB)')
                            ->downloadable()
                            ->columnSpanFull(),

                        Forms\Components\Toggle::make('is_active')
                            ->label('Tampilkan di Landing Page')
                            ->default(true),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nama_produk')
                    ->label('Nama Produk')
                    ->searchable()
                    ->weight('bold')
                    ->wrap(),

                Tables\Columns\TextColumn::make('tipe')
                    ->label('Tipe')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'modul_ajar' => 'primary',
                        'praktikum' => 'success',
                        'source_code' => 'warning',
                        'ebook' => 'info',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'modul_ajar' => 'Modul Ajar',
                        'praktikum' => 'Praktikum',
                        'source_code' => 'Source Code',
                        'ebook' => 'E-Book',
                        default => ucfirst($state),
                    }),

                Tables\Columns\TextColumn::make('harga')
                    ->label('Biaya')
                    ->formatStateUsing(fn ($record) => $record->is_free ? 'GRATIS' : 'Rp ' . number_format($record->harga, 0, ',', '.'))
                    ->color(fn ($record) => $record->is_free ? 'success' : 'gray')
                    ->weight('bold'),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Status Aktif')
                    ->boolean(),

                Tables\Columns\TextColumn::make('total_download')
                    ->label('Unduhan')
                    ->default(0)
                    ->sortable()
                    ->alignCenter(),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Terakhir Diubah')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_free')
                    ->label('Tipe Pembayaran')
                    ->placeholder('Semua Tipe')
                    ->trueLabel('Hanya Gratis')
                    ->falseLabel('Hanya Berbayar'),

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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
