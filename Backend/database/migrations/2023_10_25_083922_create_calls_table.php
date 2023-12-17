<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCallsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calls', function (Blueprint $table) {
            // $table->engine = 'InnoDB';
            $table->id('call_id');
            $table->unsignedBigInteger('ticket_id');
            $table->foreign('ticket_id')
                    ->references('ticket_id')->on('tickets')
                    ->onDelete('cascade') ;

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')
                    ->references('user_id')->on('users')
                    ->onDelete('cascade') ;
                                             
            $table->boolean('Call_Status')->default(false) ;
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

        Schema::dropIfExists('calls');
    }
}
