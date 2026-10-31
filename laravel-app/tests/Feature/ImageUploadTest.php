<?php
namespace Tests\Feature;

use App\Models\Project;
use App\Models\Tool;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ImageUploadTest extends TestCase
{
    use RefreshDatabase;

    private function cases(): array
    {
        return [
            ['crudtools',Tool::class,'icon_upload','icon',['name'=>'Upload tool','category'=>'Development','proficiency'=>80,'display_order'=>0]],
            ['crudprojects',Project::class,'image_upload','image',['title'=>'Upload project','slug'=>'upload-project','description'=>'A project with a locally uploaded screenshot.','tech_stack'=>'Laravel, React','category'=>'School project','role'=>'Developer','completed_year'=>2026,'display_order'=>0]],
        ];
    }

    private function image(): UploadedFile
    {
        return UploadedFile::fake()->createWithContent('photo.webp',file_get_contents(public_path('images/avatar.webp')));
    }

    public function test_upload_replace_retain_and_delete_for_both_resources(): void
    {
        Storage::fake('public');
        foreach ($this->cases() as [$url,$model,$upload,$field,$data]) {
            $this->post('/'.$url,[...$data,$upload=>$this->image()])->assertSessionHasNoErrors()->assertRedirect('/'.$url);
            $record=$model::firstOrFail();
            $oldPath=substr($record->$field,strlen('/storage/'));
            Storage::disk('public')->assertExists($oldPath);
            $this->post('/'.$url.'/'.$record->id,[...$data,'_method'=>'put'])->assertSessionHasNoErrors();
            $this->assertSame('/storage/'.$oldPath,$record->fresh()->$field);
            $this->post('/'.$url.'/'.$record->id,[...$data,'_method'=>'put',$upload=>$this->image()])->assertSessionHasNoErrors();
            Storage::disk('public')->assertMissing($oldPath);
            $newPath=substr($record->fresh()->$field,strlen('/storage/'));
            Storage::disk('public')->assertExists($newPath);
            $this->delete('/'.$url.'/'.$record->id)->assertRedirect('/'.$url);
            Storage::disk('public')->assertMissing($newPath);
        }
    }

    public function test_invalid_and_oversized_uploads_do_not_change_existing_images(): void
    {
        Storage::fake('public');
        foreach ($this->cases() as [$url,$model,$upload,$field,$data]) {
            $record=$model::create([...$data,$field=>'/images/avatar.webp']);
            foreach ([UploadedFile::fake()->create('document.txt',1,'text/plain'), $this->image()->size(2049)] as $file) {
                $this->post('/'.$url.'/'.$record->id,[...$data,'_method'=>'put',$upload=>$file])->assertSessionHasErrors($upload);
                $this->assertSame('/images/avatar.webp',$record->fresh()->$field);
            }
        }
        $this->assertCount(0,Storage::disk('public')->allFiles());
    }
}
