<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PortfolioResource\Pages;
use App\Models\Portfolio;
use App\Models\Service;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Set;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class PortfolioResource extends Resource
{
    protected static ?string $model = Portfolio::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?string $navigationLabel = 'Portofolio Proyek';

    protected static ?string $modelLabel = 'Portofolio';

    protected static ?string $pluralModelLabel = 'Katalog Portofolio';

    protected static ?string $navigationGroup = 'Manajemen Portofolio';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Proyek')
                    ->description('Detail judul, relasi layanan, dan deskripsi hasil pengerjaan')
                    ->schema([
                        Forms\Components\TextInput::make('judul_proyek')
                            ->label('Judul Proyek')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state)))
                            ->placeholder('Contoh: Sistem Informasi Profil Sekolah Terpadu'),

                        Forms\Components\TextInput::make('slug')
                            ->label('Slug URL')
                            ->required()
                            ->maxLength(255)
                            ->readOnly()
                            ->helperText('Otomatis dibuat dari judul proyek'),

                        Forms\Components\Select::make('service_id')
                            ->label('Kategori Layanan Terkait')
                            ->relationship('service', 'nama_layanan')
                            ->searchable()
                            ->preload()
                            ->nullable()
                            ->placeholder('-- Pilih Kategori Layanan --'),

                        Forms\Components\TextInput::make('klien')
                            ->label('Nama Klien / Instansi')
                            ->maxLength(255)
                            ->placeholder('Contoh: SMK Negeri 1 Bukittinggi / Usaha Mandiri'),

                        Forms\Components\DatePicker::make('tanggal_selesai')
                            ->label('Tanggal Selesai Proyek')
                            ->native(false)
                            ->displayFormat('d M Y'),

                        Forms\Components\TextInput::make('url_demo')
                            ->label('Tautan Demo / Hasil Live Proyek')
                            ->url()
                            ->maxLength(255)
                            ->placeholder('https://contoh-website.com'),

                        Forms\Components\Textarea::make('deskripsi')
                            ->label('Deskripsi Pekerjaan / Fitur yang Dibangun')
                            ->rows(4)
                            ->required()
                            ->placeholder('Jelaskan cakupan pengerjaan, stack teknologi yang digunakan, serta solusi yang diberikan...')
                            ->columnSpanFull(),
                    ])->columns(2),

                Forms\Components\Section::make('Media & Visibilitas')
                    ->description('Unggah gambar tangkapan layar proyek dan pengaturan tampil di landing page')
                    ->schema([
                        Forms\Components\FileUpload::make('gambar_utama')
                            ->label('Gambar Utama / Mockup Proyek')
                            ->image()
                            ->disk('public')
                            ->directory('portfolios')
                            ->imageEditor()
                            ->required()
                            ->helperText('Format yang disarankan: JPG, PNG, atau WebP (Rasio 16:9)')
                            ->columnSpanFull(),

                        Forms\Components\Toggle::make('is_featured')
                            ->label('Tampilkan di Halaman Utama (Featured)')
                            ->helperText('Jika aktif, portofolio akan muncul pada slider / showcase landing page')
                            ->default(true),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('gambar_utama')
                    ->label('Thumbnail')
                    ->disk('public')
                    ->rounded()
                    ->width(70)
                    ->height(45),

                Tables\Columns\TextColumn::make('judul_proyek')
                    ->label('Judul Proyek')
                    ->searchable()
                    ->weight('bold')
                    ->wrap(),

                Tables\Columns\TextColumn::make('service.nama_layanan')
                    ->label('Layanan')
                    ->badge()
                    ->color('primary')
                    ->placeholder('Umum'),

                Tables\Columns\TextColumn::make('klien')
                    ->label('Klien')
                    ->searchable()
                    ->placeholder('-'),

                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean()
                    ->alignCenter(),

                Tables\Columns\TextColumn::make('tanggal_selesai')
                    ->label('Selesai')
                    ->date('d M Y')
                    ->sortable()
                    ->toggleable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('service_id')
                    ->label('Filter Layanan')
                    ->relationship('service', 'nama_layanan'),

                Tables\Filters\TernaryFilter::make('is_featured')
                    ->label('Status Featured')
                    ->placeholder('Semua')
                    ->trueLabel('Hanya Featured')
                    ->falseLabel('Bukan Featured'),
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
            'index' => Pages\ListPortfolios::route('/'),
            'create' => Pages\CreatePortfolio::route('/create'),
            'edit' => Pages\EditPortfolio::route('/{record}/edit'),
        ];
    }
}
