<?php

namespace App\Filament\Resources;

use App\Filament\Resources\JurnalPiketResource\Pages;
use App\Filament\Resources\JurnalPiketResource\RelationManagers;
use App\Models\JurnalPiket;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Section;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Actions\Action;


class JurnalPiketResource extends Resource
{
    protected static ?string $model = JurnalPiket::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-check';
    // 3. Masukkan ke dalam grup dropdown (Folder)
    protected static ?string $navigationGroup = 'Operasional & Presensi';

    // 4. Atur urutan menu (angka lebih kecil = posisi lebih atas)
    protected static ?int $navigationSort = 30;


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Otomatis mengambil ID pengguna yang sedang login
        Hidden::make('user_id')
            ->default(fn () => auth()->id()),

        Section::make('Data Laporan Harian')->schema([
            DatePicker::make('tanggal')
                ->label('Tanggal Piket')
                ->default(now())
                ->required(),
            
            Select::make('cuaca')
                ->label('Kondisi Cuaca')
                ->options([
                    'Cerah' => 'Cerah',
                    'Berawan' => 'Berawan',
                    'Hujan Ringan' => 'Hujan Ringan',
                    'Hujan Deras' => 'Hujan Deras',
                ])
                ->required(),

            Textarea::make('kondisi_kbm')
                ->label('Kondisi KBM')
                ->placeholder('Ceritakan kelancaran Proses Belajar Mengajar hari ini...')
                ->columnSpanFull(),

            Textarea::make('kejadian_penting')
                ->label('Kejadian Penting / Pelanggaran')
                ->placeholder('Tuliskan jika ada siswa sakit, tamu dinas, atau insiden tertentu...')
                ->columnSpanFull(),
        ])->columns(2),

        Section::make('Lampiran & Status')->schema([
            FileUpload::make('foto_lampiran')
                ->label('Foto Bukti / Lampiran')
                ->image()
                ->directory('jurnal-piket'),
            
            Select::make('status')
                ->options(function () {
                    // Jika Kepsek atau Admin, tampilkan semua opsi
                    if (auth()->user()->hasRole(['super_admin', 'Kepsek'])) {
                        return [
                            'draft' => 'Draft',
                            'diserahkan' => 'Diserahkan',
                            'disetujui' => 'Disetujui',
                        ];
                    }
                    
                    // Jika Guru Piket, hanya bisa menyimpan sebagai Draft atau langsung Diserahkan
                    return [
                        'draft' => 'Draft',
                        'diserahkan' => 'Diserahkan',
                    ];
                })
                ->default('draft')
                ->required(),
        ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('tanggal')
                ->date('d M Y')
                ->sortable()
                ->searchable(),
            
            TextColumn::make('petugas.name')
                ->label('Guru Piket')
                ->sortable()
                ->searchable(),

            TextColumn::make('cuaca')
                ->searchable(),

            ImageColumn::make('foto_lampiran')
                ->label('Lampiran')
                ->circular(),

            TextColumn::make('status')
                ->badge()
                ->color(fn (string $state): string => match ($state) {
                    'draft' => 'gray',
                    'diserahkan' => 'warning',
                    'disetujui' => 'success',
                }),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                // Tombol Approval Khusus Kepsek/Admin
                Action::make('setujui')
                    ->label('Setujui')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Setujui Jurnal Piket')
                    ->modalDescription('Apakah Anda yakin ingin menyetujui laporan harian ini?')
                    ->action(fn ($record) => $record->update(['status' => 'disetujui']))
                    // Tombol ini hanya muncul jika role-nya Kepsek/Admin DAN statusnya masih 'diserahkan'
                    ->visible(fn ($record) => auth()->user()->hasRole(['super_admin', 'Kepsek']) && $record->status === 'diserahkan'),
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
            'index' => Pages\ListJurnalPikets::route('/'),
            'create' => Pages\CreateJurnalPiket::route('/create'),
            'edit' => Pages\EditJurnalPiket::route('/{record}/edit'),
        ];
    }
    public static function getEloquentQuery(): Builder
    {
        $query = parent::getEloquentQuery();

        // Jika user yang login memiliki role 'Piket' (dan bukan super_admin/Kepsek), 
        // batasi data hanya pada user_id miliknya sendiri.
        if (auth()->user()->hasRole('Piket') && !auth()->user()->hasRole(['super_admin', 'Kepsek'])) {
            $query->where('user_id', auth()->id());
        }

        return $query;
    }
}
