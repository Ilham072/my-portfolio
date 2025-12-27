<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ArticleStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    public function rules(): array
    {
        return [
            'title' => ['required','string','max:180'],
            'slug' => ['nullable','string','max:200', Rule::unique('articles','slug')],
            'excerpt' => ['nullable','string','max:280'],
            'body' => ['required','string','max:200000'],

            'cover_image_path' => ['nullable','string','max:255'],
            'reading_time_minutes' => ['nullable','integer','min:1','max:120'],
            'featured' => ['boolean'],
            'published_at' => ['nullable','date'],
        ];
    }
}
