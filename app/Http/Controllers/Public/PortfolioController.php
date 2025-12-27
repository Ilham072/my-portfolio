<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $items = Portfolio::query()
            ->select(['id','title','slug','excerpt','cover_image_path','tech_stack','published_at'])
            ->whereNotNull('published_at')
            ->orderByDesc('published_at')
            ->paginate(9)
            ->withQueryString();

        return Inertia::render('public/Portfolio/Index', [
            'items' => $items,
        ]);
    }

    public function show(Portfolio $portfolio)
    {
        abort_if($portfolio->published_at === null, 404);

        return Inertia::render('public/Portfolio/Show', [
            'item' => $portfolio->only([
                'id','title','slug','excerpt','body','cover_image_path','project_url','repository_url',
                'tech_stack','published_at',
            ]),
        ]);
    }
}
