<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ExperienceStoreRequest;
use App\Http\Requests\Admin\ExperienceUpdateRequest;
use App\Models\Experience;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        $items = Experience::query()
            ->select(['id','company','role','start_date','end_date','is_current','sort_order'])
            ->orderByDesc('is_current')
            ->orderByDesc('start_date')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/Experience/Index', [
            'items' => $items,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/Experience/Create');
    }

    public function store(ExperienceStoreRequest $request)
    {
        Experience::create($request->validated());
        return redirect()->route('admin.experiences.index')->with('success', 'Experience created.');
    }

    public function edit(Experience $experience)
    {
        return Inertia::render('admin/Experience/Edit', [
            'item' => $experience,
        ]);
    }

    public function update(ExperienceUpdateRequest $request, Experience $experience)
    {
        $experience->update($request->validated());
        return redirect()->route('admin.experiences.index')->with('success', 'Experience updated.');
    }

    public function destroy(Experience $experience)
    {
        $experience->delete();
        return redirect()->route('admin.experiences.index')->with('success', 'Experience deleted.');
    }
}
