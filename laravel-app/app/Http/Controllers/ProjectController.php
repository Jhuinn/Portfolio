<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Projects/Index', ['projects' => Project::orderBy('display_order')->orderBy('id')->get()]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(ProjectRequest $request)
    {
        $data = $request->safe()->except(['image_upload']);
        if ($request->hasFile('image_upload')) {
            $data['image'] = '/storage/'.$request->file('image_upload')->store('projects', 'public');
        }
        Project::create($data);

        return to_route('projects.index')->with('success', 'Project added successfully.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', ['project' => $project]);
    }

    public function update(ProjectRequest $request, Project $project)
    {
        $data = $request->safe()->except(['image_upload']);
        if ($request->hasFile('image_upload')) {
            $data['image'] = '/storage/'.$request->file('image_upload')->store('projects', 'public');
        }
        $oldImage = $project->image;
        $project->update($data);
        if ($request->hasFile('image_upload')) {
            $this->removeUpload($oldImage);
        }

        return to_route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $oldImage = $project->image;
        $project->delete();
        $this->removeUpload($oldImage);

        return to_route('projects.index')->with('success', 'Project deleted successfully.');
    }

    private function removeUpload(?string $url): void
    {
        if ($url && str_starts_with($url, '/storage/projects/')) {
            Storage::disk('public')->delete(substr($url, strlen('/storage/')));
        }
    }
}
