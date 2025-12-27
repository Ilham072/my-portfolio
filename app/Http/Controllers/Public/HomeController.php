<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Portfolio;
use App\Models\User;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $owner = User::query()
            ->select(['id','name','headline','bio','location','website_url','social_links','avatar_path'])
            ->where('is_admin', true)
            ->orderBy('id')
            ->first();

        $featuredProjects = Portfolio::query()
            ->select(['id','title','slug','excerpt','cover_image_path','tech_stack'])
            ->where('featured', true)
            ->whereNotNull('published_at')
            ->orderBy('sort_order')
            ->limit(6)
            ->get();

        $latestArticles = Article::query()
            ->select(['id','title','slug','excerpt','published_at','reading_time_minutes'])
            ->whereNotNull('published_at')
            ->orderByDesc('published_at')
            ->limit(4)
            ->get();

        return Inertia::render('public/Home', [
            'owner' => $owner,
            'featuredProjects' => $featuredProjects,
            'latestArticles' => $latestArticles,
        ]);
    }
}
