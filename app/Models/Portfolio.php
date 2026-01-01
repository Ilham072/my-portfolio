<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'body',
        'cover_image_path',
        'project_url',
        'repository_url',
        'tech_stack',
        'featured',
        'sort_order',
        'published_at',
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'featured' => 'boolean',
        'sort_order' => 'integer',
        'published_at' => 'datetime',
    ];

    // public function getRouteKeyName(): string
    // {
    //     return 'slug';
    // }
}
