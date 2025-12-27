<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('slug')->unique()->index();

            $table->string('excerpt', 280)->nullable();
            $table->longText('body')->nullable();

            $table->string('cover_image_path')->nullable();
            $table->string('project_url')->nullable();
            $table->string('repository_url')->nullable();

            $table->json('tech_stack')->nullable();
            $table->boolean('featured')->default(false)->index();
            $table->unsignedInteger('sort_order')->default(0)->index();

            $table->timestamp('published_at')->nullable()->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};
