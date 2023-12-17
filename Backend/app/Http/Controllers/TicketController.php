<?php

namespace App\Http\Controllers;

use App\Events\TicketAdded;
use App\Models\Ticket;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class TicketController extends Controller
{

    public function create()
    {
        //
    }






    public function edit(Ticket $ticket)
    {
        //
    }

    public function index()
    {
        $tickets = Ticket::select('ticket_id','num_ticket_temp','motif','ticket_status')->orderBy('ticket_id', 'asc')->get() ;
        return response()->json($tickets) ;
    }

    public function store(Request $request)
    {
        $ticket =new Ticket;
        $ticket->num_ticket_temp = $request->num_ticket_temp ;
        $ticket->motif = $request->motif ;
        $ticket->save() ;
        return response()->json($ticket);      
    }


    public function show($id)
    {
        $ticket = Ticket::findOrfail($id) ;
        return response()->json($ticket);
    }

    public function update(Request $request, $id)
    {
        $ticket = Ticket::findOrfail($id) ;
        $ticket->num_ticket_temp = $request->num_ticket_temp ;
        $ticket->motif = $request->motif ;
        $ticket->ticket_status = $request->ticket_status ;
        $ticket->save() ;
        return response()->json($ticket);
    }

    public function destroy($id)
    {
        $ticket = Ticket::findOrfail($id) ;
        $ticket->delete() ;
        return response()->json($ticket);
    }
}
