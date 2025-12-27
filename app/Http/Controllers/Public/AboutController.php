<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $owner = User::query()
            ->select(['id','name','headline','bio','location','website_url','social_links','avatar_path'])
            ->where('is_admin', true)
            ->orderBy('id')
            ->first();

        return Inertia::render('public/About', [
            'owner' => $owner,
        ]);
    }
}
