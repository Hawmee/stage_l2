<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    public function ticket(){
        return $this->hasOne(Ticket::class , 'service_name' ,'service_name' ) ;
    }

    public function user (){
        return $this->hasOne(User::class , 'service_name', 'service_name');
    }
}
