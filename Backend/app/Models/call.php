<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class call extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id' ,
        'user_id' , 
        'Call_Status',
    ];

    protected $primaryKey = 'call_id';

    public function ticket(){
        return $this->belongsTo(Ticket::class, 'ticket_id', 'ticket_id') ; 
    }

    public function users(){
        return $this->belongsTo(User::class, 'user_id', 'user_id') ; 
    }
}
