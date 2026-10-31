<?php
namespace Database\Seeders;
use App\Models\Project;
use Illuminate\Database\Seeder;
class ProjectSeeder extends Seeder {
 public function run(): void {
 foreach(json_decode(file_get_contents(database_path('seeders/projects.json')),true) as $project)
 Project::firstOrCreate(['slug'=>$project['slug']],$project);
 }
}
