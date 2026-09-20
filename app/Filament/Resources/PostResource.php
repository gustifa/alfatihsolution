<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Filament\Resources\PostResource\RelationManagers;
use App\Models\Post;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Illuminate\Support\Str; // <-- Tambahkan baris ini di sini
use Filament\Forms\Components\Hidden;


class PostResource extends Resource
{
    protected static ?string $model = Post::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';

    // 3. Masukkan ke dalam grup dropdown (Folder)
    protected static ?string $navigationGroup = 'Manajemen Web';

    // 4. Atur urutan menu (angka lebih kecil = posisi lebih atas)
    protected static ?int $navigationSort = 10;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                // Tambahkan baris ini untuk otomatis mengisi author_id
        Hidden::make('author_id')
            ->default(fn () => auth()->id()),
                        Grid::make(3)->schema([
                    // Kolom Kiri: Konten Utama (Lebar 2/3)
                    Section::make('Konten Berita')
                        ->schema([
                            TextInput::make('title')
                                ->label('Judul Berita')
                                ->required()
                                ->live(onBlur: true)
                                ->afterStateUpdated(fn (string $operation, $state, Forms\Set $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null),
                            
                            TextInput::make('slug')
                                ->required()
                                ->unique(ignoreRecord: true),
                                
                            RichEditor::make('content')
                                ->label('Isi Berita')
                                ->required()
                                ->fileAttachmentsDirectory('posts/images')
                                ->columnSpanFull(),
                        ])->columnSpan(2),

                    // Kolom Kanan: Pengaturan & SEO (Lebar 1/3)
                    Grid::make(1)->schema([
                        Section::make('Publikasi')
                            ->schema([
                                Select::make('status')
                                    ->options([
                                        'draft' => 'Draft',
                                        'published' => 'Dipublikasikan',
                                        'archived' => 'Diarsipkan',
                                    ])
                                    ->default('draft')
                                    ->required(),
                                DateTimePicker::make('published_at')
                                    ->label('Tanggal Publikasi'),
                                FileUpload::make('featured_image')
                                    ->label('Gambar Utama (Thumbnail)')
                                    ->image()
                                    ->directory('posts/thumbnails'),
                            ]),
                            
                        Section::make('Pengaturan SEO')
                            ->schema([
                                TextInput::make('meta_title')
                                    ->label('Meta Title (Opsional)'),
                                Forms\Components\Textarea::make('meta_description')
                                    ->label('Meta Description')
                                    ->maxLength(160),
                                TextInput::make('meta_keywords')
                                    ->label('Meta Keywords'),
                            ]),
                    ])->columnSpan(1),
                ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('featured_image')->label('Gambar'),
            Tables\Columns\TextColumn::make('title')->searchable()->label('Judul'),
            Tables\Columns\BadgeColumn::make('status')
                ->colors([
                    'danger' => 'draft',
                    'success' => 'published',
                    'warning' => 'archived',
                ]),
            Tables\Columns\TextColumn::make('author.name')->label('Penulis'),
            Tables\Columns\TextColumn::make('published_at')->dateTime()->sortable(),
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
            'index' => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit' => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
