<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use App\Models\call;

class CallController extends Controller
{
    public function index()
    {
        $call = call::select('call_id', 'ticket_id' ,'Call_Status')->orderBy('call_id', 'asc')->get() ;
        return response()->json($call) ;
    }


    public function store(Request $request)
    {
        $request->validate([
            'ticket_id'=>'exists:tickets,ticket_id',
        ]) ;
        $ticket = Ticket::findOrFail($request->ticket_id);
        $call=new call;
        $call->ticket_id = $ticket->ticket_id;
        $call->user_id = $request->user_id ;
        $call->Call_Status = $request->Call_Status;
        $call->save();
        return response()->json($call);
    }

    public function update(Request $request, $tiketId)
    {
        // $Call = call::findOrfail($id);
        // $Call->Call_Status = $request->Call_Status;
        // $Call->save();
        // return response()->json($Call);
        
        $tiket=Ticket::findOrFail($tiketId) ;
        $call = $tiket->call ;
        
        if($call){
            $call->Call_Status = $request->Call_Status ;
            $call->ticket_id = $request->ticket_id ;
            $call->save() ;
            return response()->json($call);
        }else{
            return response()->json(['error'=>"Ce tiket n'est plus disponible"]) ;
        }
    }

    public function destroy($tiketId)
    {
        $ticket = Ticket::findOrFail($tiketId) ;
        $call = $ticket->call  ; 
        if($call){
            $call->delete();
            return response()->json($call);
        }
    }
}
