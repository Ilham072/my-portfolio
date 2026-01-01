<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    public function rules(): array
    {
        return [
            'name' => ['required','string','max:120'],
            'headline' => ['nullable','string','max:160'],
            'bio' => ['nullable','string','max:10000'],
            'location' => ['nullable','string','max:120'],
            'website_url' => ['nullable','url','max:255'],
            'avatar_path' => ['nullable','string','max:255'],

            'social_links' => ['sometimes','nullable','array'],
            'social_links.github' => ['nullable','url','max:255'],
            'social_links.linkedin' => ['nullable','url','max:255'],
            'social_links.twitter' => ['nullable','url','max:255'],
        ];
    }

}
