<?php

namespace Tests\Feature;

use App\Models\Tool;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ToolTest extends TestCase
{
    use RefreshDatabase;

    private function valid(array $overrides = []): array
    {
        return array_replace(['name' => 'Codex', 'category' => 'AI & development', 'proficiency' => 80, 'icon' => '/images/tools/codex.svg', 'display_order' => 1], $overrides);
    }

    public function test_empty_form_has_errors_for_each_required_field(): void
    {
        $this->post('/crudtools', [])->assertSessionHasErrors(['name', 'category', 'proficiency', 'display_order']);
        $this->assertDatabaseCount('tools', 0);
    }

    public function test_overlong_name_is_rejected(): void
    {
        $this->post('/crudtools', $this->valid(['name' => str_repeat('x', 81)]))->assertSessionHasErrors('name');
    }

    public function test_numeric_fields_reject_letters_and_out_of_range_values(): void
    {
        foreach (['letters', 0, 101] as $value) {
            $this->post('/crudtools', $this->valid(['proficiency' => $value]))->assertSessionHasErrors('proficiency');
        }
        $this->post('/crudtools', $this->valid(['display_order' => -1]))->assertSessionHasErrors('display_order');
    }

    public function test_duplicate_name_is_rejected(): void
    {
        Tool::create($this->valid());
        $this->post('/crudtools', $this->valid())->assertSessionHasErrors('name');
        $this->assertDatabaseCount('tools', 1);
    }

    public function test_update_ignores_its_own_unique_name_but_not_another_tools_name(): void
    {
        $tool = Tool::create($this->valid());
        $other = Tool::create($this->valid(['name' => 'Laravel']));
        $this->put('/crudtools/'.$tool->id, $this->valid(['proficiency' => 95]))->assertSessionHasNoErrors()->assertRedirect('/crudtools');
        $this->assertDatabaseHas('tools', ['id' => $tool->id, 'proficiency' => 95]);
        $this->put('/crudtools/'.$tool->id, $this->valid(['name' => $other->name]))->assertSessionHasErrors('name');
    }

    public function test_unsafe_or_invalid_icon_urls_are_rejected(): void
    {
        foreach (['javascript:alert(1)', 'http://example.com/a.png', 'not-a-url'] as $icon) {
            $this->post('/crudtools', $this->valid(['icon' => $icon]))->assertSessionHasErrors('icon');
        }
    }

    public function test_failed_validation_retains_input(): void
    {
        $this->from('/crudtools/create')->post('/crudtools', $this->valid(['proficiency' => 101]))
            ->assertRedirect('/crudtools/create')->assertSessionHasInput('name', 'Codex')->assertSessionHasErrors('proficiency');
    }

    public function test_create_public_display_update_and_delete(): void
    {
        $this->post('/crudtools', $this->valid())->assertRedirect('/crudtools')->assertSessionHas('success');
        $tool = Tool::firstOrFail();
        foreach (['/' => 'Portfolio', '/about' => 'About', '/crudtools' => 'Tools/Index'] as $url => $component) {
            $this->get($url)->assertInertia(fn (Assert $page) => $page->component($component)->has('tools', 1)->where('tools.0.name', 'Codex'));
        }
        $this->get('/crudtools/create')->assertOk();
        $this->get('/crudtools/'.$tool->id.'/edit')->assertOk();
        $this->delete('/crudtools/'.$tool->id)->assertRedirect('/crudtools')->assertSessionHas('success');
        $this->assertDatabaseCount('tools', 0);
        $this->get('/about')->assertInertia(fn (Assert $page) => $page->has('tools', 0));
    }

    public function test_public_pages_and_missing_records(): void
    {
        foreach (['/', '/about', '/work', '/contact'] as $url) {
            $this->get($url)->assertOk();
        }
        $this->get('/crudtools/999/edit')->assertNotFound();
    }
}
