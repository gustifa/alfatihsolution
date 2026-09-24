<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
use Illuminate\Support\Facades\Blade;
use BezhanSalleh\FilamentShield\FilamentShieldPlugin;
use App\Filament\Widgets\DashboardStatsOverview;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->navigationGroups([
                'Data Induk',
                'Manajemen Web',
                'Operasional & Presensi',
                'Filament Shield',
                'Sistem',
            ])
            ->login()
            ->brandName(fn () => \App\Models\CompanyProfile::first()?->nama_perusahaan ?? 'Al-Fatih Solution')
            ->favicon(function () {
                $logo = \App\Models\CompanyProfile::first()?->favicon ?? null;

                return $logo ? asset('storage/' . $logo) : asset('favicon.ico');
            })
            ->colors([
                'primary' => Color::Amber,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->widgets([
                Widgets\AccountWidget::class,
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ])
            ->plugins([
                FilamentShieldPlugin::make()
            ])
            ->renderHook(
                'panels::body.end',
                fn (): string => Blade::render('
                    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
                    <script>
                        document.addEventListener("DOMContentLoaded", () => {
                            window.addEventListener("swal", (event) => {
                                const data = event.detail[0] || event.detail;
                                Swal.fire({
                                    icon: data.icon || "info",
                                    title: data.title || "Pemberitahuan",
                                    text: data.text || "",
                                    timer: data.timer || null,
                                    showConfirmButton: data.showConfirmButton ?? true,
                                    confirmButtonColor: "#2563eb",
                                });
                            });
                        });
                    </script>
                ')
            );
    }
}
