<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimonialResource\Pages;
use App\Filament\Resources\TestimonialResource\RelationManagers;
use App\Models\Testimonial;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-bottom-center-text';
    protected static ?string $navigationGroup = 'Promosi & Konten';
    protected static ?string $navigationLabel = 'Testimoni Klien';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Select::make('service_id')
                ->relationship('service', 'nama_layanan')
                ->label('Terkait Layanan')
                ->searchable()
                ->preload(),
            Forms\Components\TextInput::make('nama_klien')->required(),
            Forms\Components\TextInput::make('perusahaan_instansi')->label('Instansi / Sekolah / Usaha'),
            Forms\Components\TextInput::make('jabatan')->placeholder('Kepala Lab / Guru / Direktur'),
            Forms\Components\Select::make('rating')
                ->options([
                    1 => '⭐ (1)',
                    2 => '⭐⭐ (2)',
                    3 => '⭐⭐⭐ (3)',
                    4 => '⭐⭐⭐⭐ (4)',
                    5 => '⭐⭐⭐⭐⭐ (5)',
                ])->default(5)->required(),
            Forms\Components\FileUpload::make('foto_avatar')
                ->image()
                ->directory('testimonials')
                ->avatar(),
            Forms\Components\Textarea::make('pesan_testimoni')->required()->columnSpanFull(),
            Forms\Components\Toggle::make('is_featured')->label('Tampilkan di Beranda Utama')->default(false),
            Forms\Components\Toggle::make('is_published')->label('Publikasikan')->default(true),
        ])->columns(2);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('foto_avatar')->circular(),
                Tables\Columns\TextColumn::make('nama_klien')->searchable(),
                Tables\Columns\TextColumn::make('service.nama_layanan')->label('Layanan')->badge(),
                Tables\Columns\TextColumn::make('rating')->formatStateUsing(fn ($state) => str_repeat('⭐', $state)),
                Tables\Columns\IconColumn::make('is_featured')->boolean()->label('Featured'),
                Tables\Columns\IconColumn::make('is_published')->boolean()->label('Aktif'),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_published')
                ->label('Status Publikasi'),
                Tables\Filters\TernaryFilter::make('is_featured')
                ->label('Featured di Beranda'),
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
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTestimonials::route('/'),
            'create' => Pages\CreateTestimonial::route('/create'),
            'edit' => Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }
}
