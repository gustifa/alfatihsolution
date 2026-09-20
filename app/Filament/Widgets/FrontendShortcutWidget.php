<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;

class FrontendShortcutWidget extends Widget
{
    protected static string $view = 'filament.widgets.frontend-shortcut-widget';
    
    // Ubah angka sort menjadi -2 agar posisinya persis di sebelah AccountWidget (Welcome)
    protected static ?int $sort = -2; 
    
    // Ubah ukuran kolom menjadi 1 (setengah layar) agar bisa sejajar
    protected int | string | array $columnSpan = 1;

    
}