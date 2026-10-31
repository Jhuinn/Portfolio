<?php

namespace App\Http\Controllers;

use App\Http\Requests\ToolRequest;
use App\Models\Tool;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ToolController extends Controller
{
    public function index()
    {
        return Inertia::render('Tools/Index', ['tools' => Tool::orderBy('display_order')->orderBy('id')->get()]);
    }

    public function create()
    {
        return Inertia::render('Tools/Create');
    }

    public function store(ToolRequest $request)
    {
        $data = $request->safe()->except(['icon_upload']);
        if ($request->hasFile('icon_upload')) {
            $data['icon'] = '/storage/'.$request->file('icon_upload')->store('tools', 'public');
        }
        Tool::create($data);

        return to_route('tools.index')->with('success', 'Tool added successfully.');
    }

    public function edit(Tool $tool)
    {
        return Inertia::render('Tools/Edit', ['tool' => $tool]);
    }

    public function update(ToolRequest $request, Tool $tool)
    {
        $data = $request->safe()->except(['icon_upload']);
        if ($request->hasFile('icon_upload')) {
            $data['icon'] = '/storage/'.$request->file('icon_upload')->store('tools', 'public');
        }
        $oldImage = $tool->icon;
        $tool->update($data);
        if ($request->hasFile('icon_upload')) {
            $this->removeUpload($oldImage);
        }

        return to_route('tools.index')->with('success', 'Tool updated successfully.');
    }

    public function destroy(Tool $tool)
    {
        $oldImage = $tool->icon;
        $tool->delete();
        $this->removeUpload($oldImage);

        return to_route('tools.index')->with('success', 'Tool deleted successfully.');
    }

    private function removeUpload(?string $url): void
    {
        if ($url && str_starts_with($url, '/storage/tools/')) {
            Storage::disk('public')->delete(substr($url, strlen('/storage/')));
        }
    }
}
