<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id("user_id");
            $table->string('name');
            // $table->string('email')->unique();
            $table->string('user_name')->unique();
            $table->timestamp('user_name_verified_at')->nullable();
            $table->string('password');

            $table->string('service_name');
            $table->foreign('service_name')
                    ->references('service_name')->on('services')
                    ->onDelete('cascade');

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
