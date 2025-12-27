<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProfileUpdateRequest;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function edit()
    {
        $user = request()->user();

        return Inertia::render('admin/Profile/Edit', [
            'profile' => $user->only([
                'id','name','email','headline','bio','location','website_url','social_links','avatar_path',
            ]),
        ]);
    }

    public function update(ProfileUpdateRequest $request)
    {
        $user = $request->user();
        $user->update($request->validated());

        return redirect()->route('admin.profile.edit')->with('success', 'Profile updated.');
    }
}
