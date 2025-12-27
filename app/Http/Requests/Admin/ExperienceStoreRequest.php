<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ExperienceStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    public function rules(): array
    {
        return [
            'company' => ['required','string','max:160'],
            'role' => ['required','string','max:160'],
            'location' => ['nullable','string','max:120'],

            'start_date' => ['required','date'],
            'end_date' => ['nullable','date'],
            'is_current' => ['boolean'],

            'description' => ['nullable','string','max:10000'],
            'sort_order' => ['nullable','integer','min:0','max:1000000'],
        ];
    }
}
