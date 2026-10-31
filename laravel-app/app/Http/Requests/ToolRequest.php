<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ToolRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:80', Rule::unique('tools', 'name')->ignore($this->route('tool'))],
            'category' => ['required', 'string', 'max:60'],
            'proficiency' => ['required', 'integer', 'between:1,100'],
            'icon' => ['nullable', 'string', 'max:2048', function ($attribute, $value, $fail) {
                if (! preg_match('~^(https://[^\s]+|/images/[a-zA-Z0-9/_ .-]+)$~', $value)) {
                    $fail('Use an HTTPS image URL or a path inside /images/.');
                }
            }],
            'icon_upload' => ['nullable','image','mimes:jpg,jpeg,png,webp,gif','max:2048'],
            'display_order' => ['required', 'integer', 'between:0,9999'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Give this tool a name so visitors can identify it.',
            'name.unique' => 'This tool is already in your tech stack.',
            'proficiency.between' => 'Proficiency must be between 1 and 100.',
        ];
    }
}
