<?php

namespace Database\Seeders;

use App\Models\Tool;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(ProjectSeeder::class);
        foreach (json_decode(file_get_contents(database_path('seeders/tools.json')), true) as $tool) {
            Tool::firstOrCreate(['name' => $tool['name']], $tool);
        }
    }
}
