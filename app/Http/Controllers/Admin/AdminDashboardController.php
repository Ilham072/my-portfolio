<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Experience;
use App\Models\Portfolio;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'portfolios' => Portfolio::count(),
                'experiences' => Experience::count(),
                'articles' => Article::count(),
            ],
        ]);
    }
}
