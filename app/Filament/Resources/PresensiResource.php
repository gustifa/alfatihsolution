<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PresensiResource\Pages;
use App\Filament\Resources\PresensiResource\RelationManagers;
use App\Models\Presensi;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TimePicker;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;

class PresensiResource extends Resource
{
    protected static ?string $model = Presensi::class;

    protected static ?string $navigationIcon = 'heroicon-o-finger-print';
    // 3. Masukkan ke dalam grup dropdown (Folder)
    protected static ?string $navigationGroup = 'Operasional & Presensi';

    // 4. Atur urutan menu (angka lebih kecil = posisi lebih atas)
    protected static ?int $navigationSort = 30;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
            Select::make('siswa_id')
                ->relationship('siswa', 'nama')
                ->searchable()
                ->preload()
                ->required()
                ->label('Nama Siswa'),

            DatePicker::make('tanggal')
                ->default(now())
                ->required(),

            TimePicker::make('waktu_scan')
                ->default(now())
                ->required(),

            Select::make('status')
                ->options([
                    'hadir' => 'Hadir',
                    'terlambat' => 'Terlambat',
                    'izin' => 'Izin',
                    'sakit' => 'Sakit',
                    'alpa' => 'Alpa',
                ])
                ->default('hadir')
                ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
                ->defaultSort('tanggal', 'desc') // Mengurutkan dari absensi terbaru
        ->columns([
            TextColumn::make('tanggal')
                ->date('d M Y')
                ->sortable(),

            TextColumn::make('waktu_scan')
                ->time('H:i')
                ->sortable(),

            TextColumn::make('siswa.nama')
                ->label('Nama Siswa')
                ->searchable()
                ->sortable(),

            TextColumn::make('siswa.kelas')
                ->label('Kelas')
                ->searchable()
                ->sortable(),

            TextColumn::make('status')
                ->badge()
                ->color(fn (string $state): string => match ($state) {
                    'hadir' => 'success',
                    'terlambat' => 'warning',
                    'izin' => 'info',
                    'sakit' => 'gray',
                    'alpa' => 'danger',
                }),
            ])
            ->filters([
                // Filter berdasarkan Status
            SelectFilter::make('status')
                ->options([
                    'hadir' => 'Hadir',
                    'terlambat' => 'Terlambat',
                    'izin' => 'Izin',
                    'sakit' => 'Sakit',
                    'alpa' => 'Alpa',
                ]),
            
            // Filter rentang waktu secara kustom
            Filter::make('tanggal')
                ->form([
                    DatePicker::make('dari_tanggal'),
                    DatePicker::make('sampai_tanggal'),
                ])
                ->query(function (Builder $query, array $data): Builder {
                    return $query
                        ->when(
                            $data['dari_tanggal'],
                            fn (Builder $query, $date): Builder => $query->whereDate('tanggal', '>=', $date),
                        )
                        ->when(
                            $data['sampai_tanggal'],
                            fn (Builder $query, $date): Builder => $query->whereDate('tanggal', '<=', $date),
                        );
                })
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
            'index' => Pages\ListPresensis::route('/'),
            'create' => Pages\CreatePresensi::route('/create'),
            'edit' => Pages\EditPresensi::route('/{record}/edit'),
        ];
    }
}
