<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SaranaPrasaranaResource\Pages;
use App\Filament\Resources\SaranaPrasaranaResource\RelationManagers;
use App\Models\SaranaPrasarana;
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

class SaranaPrasaranaResource extends Resource
{
    protected static ?string $model = SaranaPrasarana::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('nama_fasilitas')->required()->placeholder('Contoh: Bengkel TITL, Laboratorium Komputer'),
                TextInput::make('jumlah')->numeric()->required(),
                Select::make('kondisi')
                    ->options([
                        'Baik' => 'Baik',
                        'Rusak Ringan' => 'Rusak Ringan',
                        'Rusak Berat' => 'Rusak Berat',
                    ])->required(),
                FileUpload::make('foto')->image()->directory('sarpras'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('foto')
                ->label('Foto')
                ->square(),
                
                TextColumn::make('nama_fasilitas')
                    ->label('Fasilitas')
                    ->searchable()
                    ->sortable(),
                    
                TextColumn::make('jumlah')
                    ->label('Jumlah')
                    ->numeric()
                    ->sortable(),
                    
                TextColumn::make('kondisi')
                    ->label('Kondisi')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'Baik' => 'success',
                        'Rusak Ringan' => 'warning',
                        'Rusak Berat' => 'danger',
                    }),
            ])
            ->filters([
                SelectFilter::make('kondisi')
                ->options([
                    'Baik' => 'Baik',
                    'Rusak Ringan' => 'Rusak Ringan',
                    'Rusak Berat' => 'Rusak Berat',
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
            'index' => Pages\ListSaranaPrasaranas::route('/'),
            'create' => Pages\CreateSaranaPrasarana::route('/create'),
            'edit' => Pages\EditSaranaPrasarana::route('/{record}/edit'),
        ];
    }
}
