<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function index()
    {
        $items = Experience::query()
            ->select(['id','company','role','location','start_date','end_date','is_current','description'])
            ->orderByDesc('is_current')
            ->orderByDesc('start_date')
            ->get();

        return Inertia::render('public/Experience', [
            'items' => $items,
        ]);
    }
}
