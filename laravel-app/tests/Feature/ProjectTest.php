<?php
namespace Tests\Feature;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProjectTest extends TestCase
{
    use RefreshDatabase;

    private function valid(array $overrides = []): array
    {
        return array_replace([
            'title'=>'New portfolio project', 'slug'=>'new-portfolio-project',
            'description'=>'A complete project description for the public portfolio.',
            'tech_stack'=>'Laravel, React', 'image'=>'/images/projects/campus-found.webp',
            'category'=>'School project', 'role'=>'Developer', 'completed_year'=>2026,
            'project_url'=>'https://example.com', 'repository_url'=>null, 'display_order'=>0,
        ], $overrides);
    }

    public function test_full_crud_updates_both_public_sections(): void
    {
        $this->post('/crudprojects',$this->valid())->assertRedirect('/crudprojects')->assertSessionHas('success');
        $project=Project::firstOrFail();
        foreach (['/'=>'Portfolio','/work'=>'Work','/crudprojects'=>'Projects/Index'] as $url=>$component) {
            $this->get($url)->assertInertia(fn(Assert $p)=>$p->component($component)->has('projects',1)->where('projects.0.title',$project->title));
        }
        $this->get('/crudprojects/create')->assertOk();
        $this->get('/crudprojects/'.$project->id.'/edit')->assertOk();
        $this->put('/crudprojects/'.$project->id,$this->valid(['description'=>'An updated description with enough detail for the portfolio.']))->assertSessionHasNoErrors()->assertSessionHas('success');
        $this->delete('/crudprojects/'.$project->id)->assertRedirect('/crudprojects')->assertSessionHas('success');
        $this->assertDatabaseCount('projects',0);
        foreach (['/','/work'] as $url) $this->get($url)->assertInertia(fn(Assert $p)=>$p->has('projects',0));
    }

    public function test_empty_and_invalid_fields_do_not_write_records(): void
    {
        $this->post('/crudprojects',[])->assertSessionHasErrors(['title','slug','description','tech_stack','category','role','completed_year','display_order']);
        $cases=[['title'=>str_repeat('x',121)],['slug'=>'Bad Slug!'],['description'=>'short'],['completed_year'=>'letters'],['completed_year'=>now()->year+1],['project_url'=>'javascript:alert(1)'],['repository_url'=>'not-url'],['image'=>'javascript:alert(1)'],['display_order'=>-1]];
        foreach($cases as $case) $this->post('/crudprojects',$this->valid($case))->assertSessionHasErrors(array_keys($case));
        $this->assertDatabaseCount('projects',0);
    }

    public function test_unique_fields_ignore_current_project_on_update(): void
    {
        $project=Project::create($this->valid());
        $this->post('/crudprojects',$this->valid())->assertSessionHasErrors(['title','slug']);
        $this->put('/crudprojects/'.$project->id,$this->valid())->assertSessionHasNoErrors();
        $other=Project::create($this->valid(['title'=>'Another project','slug'=>'another-project']));
        $this->put('/crudprojects/'.$project->id,$this->valid(['title'=>$other->title,'slug'=>$other->slug]))->assertSessionHasErrors(['title','slug']);
    }

    public function test_validation_preserves_input_and_missing_record_is_404(): void
    {
        $this->from('/crudprojects/create')->post('/crudprojects',$this->valid(['description'=>'short']))->assertRedirect('/crudprojects/create')->assertSessionHasInput('title','New portfolio project');
        $this->get('/crudprojects/999/edit')->assertNotFound();
    }

    public function test_homepage_preview_respects_order_and_limit(): void
    {
        for($i=1;$i<=4;$i++) Project::create($this->valid(['title'=>'Project '.$i,'slug'=>'project-'.$i,'display_order'=>5-$i]));
        $this->get('/')->assertInertia(fn(Assert $p)=>$p->has('projects',3)->where('projects.0.title','Project 4'));
        $this->get('/work')->assertInertia(fn(Assert $p)=>$p->has('projects',4));
    }
}
