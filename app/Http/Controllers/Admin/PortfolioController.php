<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PortfolioStoreRequest;
use App\Http\Requests\Admin\PortfolioUpdateRequest;
use App\Models\Portfolio;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        $items = Portfolio::query()
            ->select(['id','title','slug','featured','sort_order','published_at','created_at'])
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/Portfolio/Index', [
            'items' => $items,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/Portfolio/Create');
    }

    public function store(PortfolioStoreRequest $request)
    {
        $data = $request->validated();
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);

        Portfolio::create($data);

        return redirect()->route('admin.portfolios.index')->with('success', 'Project created.');
    }

    public function edit(Portfolio $portfolio)
    {
        return Inertia::render('admin/Portfolio/Edit', [
            'item' => $portfolio,
        ]);
    }

    public function update(PortfolioUpdateRequest $request, Portfolio $portfolio)
    {
        $data = $request->validated();
        $data['slug'] = $data['slug'] ?: Str::slug($data['title']);

        $portfolio->update($data);

        return redirect()->route('admin.portfolios.index')->with('success', 'Project updated.');
    }

    public function destroy(Portfolio $portfolio)
    {
        $portfolio->delete();

        return redirect()->route('admin.portfolios.index')->with('success', 'Project deleted.');
    }
}
