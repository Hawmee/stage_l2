<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DropTableName extends Migration
{

    public function up()
    {
        Schema::dropIfExists('posts');
        Schema::dropIfExists('calls');
    }


    public function down()
    {
        //
    }
}
