<?php

use App\Http\Controllers\ToolController;
use App\Models\Tool;
use App\Models\Project;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Portfolio', ['tools' => Tool::orderBy('display_order')->orderBy('id')->get(), 'projects'=>Project::orderBy('display_order')->orderBy('id')->limit(3)->get()]))->name('home');
Route::get('/about', fn () => Inertia::render('About', ['tools' => Tool::orderBy('display_order')->orderBy('id')->get()]))->name('about');
Route::get('/work', fn () => Inertia::render('Work',['projects'=>Project::orderBy('display_order')->orderBy('id')->get()]))->name('work');
Route::get('/contact', fn () => Inertia::render('Contact'))->name('contact');
// Local classroom management area. Add authentication before public deployment.
Route::resource('crudtools', ToolController::class)->parameters(['crudtools'=>'tool'])->names('tools')->except('show');

Route::resource('crudprojects', ProjectController::class)->parameters(['crudprojects'=>'project'])->names('projects')->except('show');
