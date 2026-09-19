<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class TrackOnlineUser
{
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            // Set status online selama 5 menit setiap kali pengguna melakukan aktivitas
            $expiresAt = now()->addMinutes(5);
            Cache::put('user-is-online-' . Auth::id(), true, $expiresAt);
        }

        return $next($request);
    }
}