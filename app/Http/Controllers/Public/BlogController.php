<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $items = Article::query()
            ->select(['id','title','slug','excerpt','published_at','reading_time_minutes'])
            ->whereNotNull('published_at')
            ->orderByDesc('published_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('public/Blog/Index', [
            'items' => $items,
        ]);
    }

    public function show(Article $article)
    {
        abort_if($article->published_at === null, 404);

        return Inertia::render('public/Blog/Show', [
            'item' => $article->only([
                'id','title','slug','excerpt','body','cover_image_path','published_at','reading_time_minutes',
            ]),
        ]);
    }
}
