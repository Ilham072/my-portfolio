<?php

use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\BlogController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\ExperienceController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('public.home');
Route::get('/about', [AboutController::class, 'index'])->name('public.about');

Route::get('/portfolio', [PortfolioController::class, 'index'])->name('public.portfolio.index');
Route::get('/portfolio/{portfolio:slug}', [PortfolioController::class, 'show'])->name('public.portfolio.show');

Route::get('/experience', [ExperienceController::class, 'index'])->name('public.experience');

Route::get('/blog', [BlogController::class, 'index'])->name('public.blog.index');
Route::get('/blog/{article:slug}', [BlogController::class, 'show'])->name('public.blog.show');

Route::get('/contact', [ContactController::class, 'index'])->name('public.contact');
Route::post('/contact', [ContactController::class, 'store'])->name('public.contact.store');

Route::get('/dashboard', function () {
    $user = request()->user();

    if ($user && $user->is_admin) {
        return redirect()->route('admin.dashboard');
    }

    return redirect()->route('public.home');
})->middleware('auth')->name('dashboard');


require __DIR__ . '/auth.php';
