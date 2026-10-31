<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class ProjectRequest extends FormRequest {
 public function authorize(): bool { return true; }
 public function rules(): array { return [
 'image_upload' => ['nullable','image','mimes:jpg,jpeg,png,webp,gif','max:2048'],
            'title'=>['required','string','max:120',Rule::unique('projects','title')->ignore($this->route('project'))],
 'slug'=>['required','string','max:140','regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',Rule::unique('projects','slug')->ignore($this->route('project'))],
 'description'=>['required','string','min:20','max:5000'],
 'tech_stack'=>['required','string','max:500'],
 'category'=>['required','string','max:80'], 'role'=>['required','string','max:80'],
 'completed_year'=>['required','integer','between:1900,'.now()->year],
 'display_order'=>['required','integer','between:0,9999'],
 'project_url'=>['nullable','url:http,https','max:2048'],
 'repository_url'=>['nullable','url:http,https','max:2048'],
 'image'=>['nullable','string','max:2048',function($attribute,$value,$fail){
 if(!preg_match('~^(https://[^\s]+|/images/[a-zA-Z0-9/_ .-]+)$~',$value)) $fail('Use an HTTPS image URL or a path inside /images/.');
 }],
 ]; }
 public function messages(): array { return [
 'title.required'=>'Give your project a title.', 'title.unique'=>'A project with this title already exists.',
 'slug.regex'=>'Use lowercase letters, numbers and single hyphens for the URL anchor.',
 'description.min'=>'Describe the project in at least 20 characters.',
 'completed_year.between'=>'Choose a year from 1900 through the current year.',
 ]; }
}
