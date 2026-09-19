<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProgramKeahlianResource\Pages;
use App\Filament\Resources\ProgramKeahlianResource\RelationManagers;
use App\Models\ProgramKeahlian;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;

class ProgramKeahlianResource extends Resource
{
    protected static ?string $model = ProgramKeahlian::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    // 2. Ubah label di sidebar agar tidak ada akhiran "s"
    protected static ?string $navigationLabel = 'Program Keahlian';
    protected static ?string $pluralModelLabel = 'Program Keahlian';

    // 3. Masukkan ke dalam grup dropdown (Folder)
    protected static ?string $navigationGroup = 'Manajemen Web';

    // 4. Atur urutan menu (angka lebih kecil = posisi lebih atas)
    protected static ?int $navigationSort = 10;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('nama_program')->required()->placeholder('Contoh: Teknik Instalasi Tenaga Listrik'),
                TextInput::make('singkatan')->placeholder('Contoh: TITL'),
                Textarea::make('deskripsi')->required(),
                FileUpload::make('icon')->label('Ikon / Logo Program')->image()->directory('program'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('icon')->square(),
                TextColumn::make('nama_program')->searchable(),
                TextColumn::make('singkatan'),
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
            'index' => Pages\ListProgramKeahlians::route('/'),
            'create' => Pages\CreateProgramKeahlian::route('/create'),
            'edit' => Pages\EditProgramKeahlian::route('/{record}/edit'),
        ];
    }
}
