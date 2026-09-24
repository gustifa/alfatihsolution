<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceTicketResource\Pages;
use App\Filament\Resources\ServiceTicketResource\RelationManagers;
use App\Models\ServiceTicket;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ServiceTicketResource extends Resource
{
    protected static ?string $model = ServiceTicket::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'Layanan Servis';
    protected static ?string $navigationLabel = 'Tiket Servis';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Informasi Tiket & Pelanggan')
                ->schema([
                    Forms\Components\TextInput::make('no_tiket')
                        ->default('SRV-' . date('Ymd') . '-' . rand(100, 999))
                        ->required()
                        ->unique(ignoreRecord: true),
                    Forms\Components\Select::make('teknisi_id')
                        ->relationship('teknisi', 'name')
                        ->searchable()
                        ->preload()
                        ->label('Teknisi Penanggung Jawab'),
                    Forms\Components\TextInput::make('nama_pelanggan')->required(),
                    Forms\Components\TextInput::make('no_whatsapp')->tel()->required(),
                ])->columns(2),

            Forms\Components\Section::make('Kondisi & Keluhan Perangkat')
                ->schema([
                    Forms\Components\TextInput::make('nama_perangkat')->placeholder('Laptop Acer Nitro 5')->required(),
                    Forms\Components\TextInput::make('nomor_seri')->placeholder('Opsional'),
                    Forms\Components\TextInput::make('kelengkapan')->placeholder('Unit, Charger, Mouse'),
                    Forms\Components\Textarea::make('keluhan_kerusakan')->required()->columnSpanFull(),
                    Forms\Components\Textarea::make('hasil_diagnosa')->columnSpanFull(),
                    Forms\Components\Textarea::make('tindakan_perbaikan')->columnSpanFull(),
                ])->columns(3),

            Forms\Components\Section::make('Status & Biaya')
                ->schema([
                    Forms\Components\Select::make('status_servis')
                        ->options([
                            'diterima' => 'Diterima',
                            'pemeriksaan' => 'Pemeriksaan',
                            'menunggu_sparepart' => 'Menunggu Sparepart',
                            'pengerjaan' => 'Pengerjaan',
                            'siap_diambil' => 'Siap Diambil',
                            'selesai' => 'Selesai',
                            'batal_tidak_bisa' => 'Tidak Bisa Diperbaiki / Batal',
                        ])->default('diterima')->required(),
                    Forms\Components\Select::make('status_pembayaran')
                        ->options([
                            'belum_bayar' => 'Belum Bayar',
                            'dp' => 'DP / Uang Muka',
                            'lunas' => 'Lunas',
                        ])->default('belum_bayar')->required(),
                    Forms\Components\TextInput::make('biaya_sparepart')->numeric()->default(0)->reactive(),
                    Forms\Components\TextInput::make('biaya_jasa')->numeric()->default(0)->reactive(),
                    Forms\Components\TextInput::make('total_biaya')
                        ->numeric()
                        ->default(0)
                        ->helperText('Otomatis/manual hitung dari sparepart + jasa'),
                ])->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('no_tiket')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('nama_pelanggan')->searchable(),
                Tables\Columns\TextColumn::make('nama_perangkat')->limit(20),
                Tables\Columns\BadgeColumn::make('status_servis')
                    ->colors([
                        'warning' => 'diterima',
                        'primary' => 'pemeriksaan',
                        'danger' => 'batal_tidak_bisa',
                        'success' => 'selesai',
                    ]),
                Tables\Columns\TextColumn::make('total_biaya')->money('IDR'),
                Tables\Columns\TextColumn::make('tanggal_masuk')->dateTime('d M Y H:i')->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status_servis')
                    ->options([
                        'diterima' => 'Diterima',
                        'pengerjaan' => 'Pengerjaan',
                        'siap_diambil' => 'Siap Diambil',
                        'selesai' => 'Selesai',
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
            'index' => Pages\ListServiceTickets::route('/'),
            'create' => Pages\CreateServiceTicket::route('/create'),
            'edit' => Pages\EditServiceTicket::route('/{record}/edit'),
        ];
    }
}
