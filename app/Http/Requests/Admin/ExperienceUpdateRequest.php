<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ExperienceUpdateRequest extends FormRequest
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
            'is_current' => ['sometimes','boolean'],
            'end_date' => ['nullable','date','after_or_equal:start_date','prohibited_if:is_current,1'],

            'description' => ['nullable','string','max:10000'],
            'sort_order' => ['nullable','integer','min:0','max:1000000'],
        ];
    }
}
