<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GuruStaffResource\Pages;
use App\Filament\Resources\GuruStaffResource\RelationManagers;
use App\Models\GuruStaff;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Filters\SelectFilter;

class GuruStaffResource extends Resource
{
    protected static ?string $model = GuruStaff::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('nama')->required(),
                TextInput::make('nip')->label('NIP / NIY'),
                TextInput::make('jabatan')->required()->placeholder('Contoh: Kepala Program Keahlian TITL'),
                Select::make('kategori')
                    ->options([
                        'Guru' => 'Guru',
                        'Tenaga Kependidikan' => 'Tenaga Kependidikan (TU/Staff)',
                    ])->required(),
                FileUpload::make('foto')->image()->directory('gtk')->avatar(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('foto')
                ->label('Foto')
                ->circular(),
                
                TextColumn::make('nama')
                    ->label('Nama Lengkap')
                    ->searchable()
                    ->sortable(),
                    
                TextColumn::make('nip')
                    ->label('NIP / NIY')
                    ->searchable(),
                    
                TextColumn::make('jabatan')
                    ->label('Jabatan')
                    ->searchable(),
                    
                TextColumn::make('kategori')
                    ->label('Kategori')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Guru' => 'success',
                        'Tenaga Kependidikan' => 'warning',
                    }),
            ])
            ->filters([
                SelectFilter::make('kategori')
                ->options([
                    'Guru' => 'Guru',
                    'Tenaga Kependidikan' => 'Tenaga Kependidikan',
                ]),
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
            'index' => Pages\ListGuruStaff::route('/'),
            'create' => Pages\CreateGuruStaff::route('/create'),
            'edit' => Pages\EditGuruStaff::route('/{record}/edit'),
        ];
    }
}
