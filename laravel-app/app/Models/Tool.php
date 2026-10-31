<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    protected $fillable = ['name', 'category', 'proficiency', 'icon', 'display_order'];

    protected function casts(): array
    {
        return ['proficiency' => 'integer', 'display_order' => 'integer'];
    }
}
