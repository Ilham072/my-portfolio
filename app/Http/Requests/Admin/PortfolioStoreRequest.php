<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PortfolioStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    public function rules(): array
    {
        return [
            'title' => ['required','string','max:160'],
            'slug' => ['nullable','string','max:180', Rule::unique('portfolios','slug')],
            'excerpt' => ['nullable','string','max:280'],
            'body' => ['nullable','string'],

            'cover_image_path' => ['nullable','string','max:255'],
            'project_url' => ['nullable','url','max:255'],
            'repository_url' => ['nullable','url','max:255'],

            'tech_stack' => ['nullable','array'],
            'tech_stack.*' => ['string','max:64'],

            'featured' => ['boolean'],
            'sort_order' => ['nullable','integer','min:0','max:1000000'],
            'published_at' => ['nullable','date'],
        ];
    }
}
