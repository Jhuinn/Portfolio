<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Project extends Model {
 protected $fillable = ['title', 'slug', 'description', 'tech_stack', 'image', 'category', 'role', 'completed_year', 'project_url', 'repository_url', 'display_order'];
 protected function casts(): array { return ['completed_year'=>'integer','display_order'=>'integer']; }
}
