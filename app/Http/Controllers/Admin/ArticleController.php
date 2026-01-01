<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ArticleStoreRequest;
use App\Http\Requests\Admin\ArticleUpdateRequest;
use App\Models\Article;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function index()
    {
        $items = Article::query()
            ->select(['id','title','slug','featured','published_at','created_at'])
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/Blog/Index', [
            'items' => $items,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/Blog/Create');
    }

    public function store(ArticleStoreRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = $request->user()->id;
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        $data['featured'] = (bool) ($data['featured'] ?? false);

        // safety: if frontend ever sends empty string
        if (empty($data['published_at'])) {
            $data['published_at'] = null;
        }

        Article::create($data);

        return redirect()->route('admin.articles.index')->with('success', 'Article created.');
    }

    public function edit(Article $article)
    {
        return Inertia::render('admin/Blog/Edit', [
            'item' => $article,
        ]);
    }

    public function update(ArticleUpdateRequest $request, Article $article)
    {
        $data = $request->validated();

        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);
        $data['featured'] = (bool) ($data['featured'] ?? false);

        if (empty($data['published_at'])) {
            $data['published_at'] = null;
        }

        $article->update($data);

        return redirect()->route('admin.articles.index')->with('success', 'Article updated.');
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return redirect()->route('admin.articles.index')->with('success', 'Article deleted.');
    }
}
