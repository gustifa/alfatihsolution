<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RombelResource\Pages;
use App\Filament\Resources\RombelResource\RelationManagers;
use App\Models\Rombel;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;

class RombelResource extends Resource
{
    protected static ?string $model = Rombel::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    // 2. Ubah label di sidebar agar tidak ada akhiran "s"
    protected static ?string $navigationLabel = 'Rombel';
    protected static ?string $pluralModelLabel = 'Rombel';
    // 3. Masukkan ke dalam grup dropdown (Folder)
    protected static ?string $navigationGroup = 'Data Induk';

    // 4. Atur urutan menu (angka lebih kecil = posisi lebih atas)
    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('nama_rombel')
                ->label('Nama Rombel / Kelas')
                ->placeholder('Contoh: Kelas 1, Kelas 2A')
                ->required()
                ->unique(ignoreRecord: true)
                ->maxLength(255),
                TextInput::make('tingkat')
                    ->label('Tingkat')
                    ->placeholder('Contoh: 1, 2, dst.')
                    ->nullable(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nama_rombel')->label('Nama Rombel')->searchable()->sortable(),
                TextColumn::make('tingkat')->label('Tingkat')->sortable(),
                TextColumn::make('created_at')->dateTime()->label('Dibuat')->toggleable(isToggledHiddenByDefault: true),
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
            'index' => Pages\ListRombels::route('/'),
            'create' => Pages\CreateRombel::route('/create'),
            'edit' => Pages\EditRombel::route('/{record}/edit'),
        ];
    }
}
