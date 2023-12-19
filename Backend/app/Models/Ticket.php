<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'num_ticket_temp',
        'service_name',
        'ticket_status',
    ];

    protected $primaryKey = 'ticket_id';

    public function call(){
        return $this->hasOne(call::class, 'ticket_id', 'ticket_id');
    }

    public function service(){
        return $this->belongsTo(Service::class , 'service_name' , 'service_name');
    }

}
