<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
 public function up(): void { Schema::create('projects',function(Blueprint $table){
 $table->id(); $table->string('title',120)->unique(); $table->string('slug',140)->unique();
 $table->text('description'); $table->string('tech_stack',500); $table->string('image',2048)->nullable();
 $table->string('category',80); $table->string('role',80); $table->unsignedSmallInteger('completed_year');
 $table->string('project_url',2048)->nullable(); $table->string('repository_url',2048)->nullable();
 $table->unsignedInteger('display_order')->default(0); $table->timestamps();
 }); }
 public function down(): void { Schema::dropIfExists('projects'); }
};
