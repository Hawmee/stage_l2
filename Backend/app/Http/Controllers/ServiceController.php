<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{

    public function index()
    {
        $service = Service::select('service_name')->get() ;
        return response()->json($service) ;
    }

    public function store(Request $request)
    {
        $service =new Service;
        $service->service_name = $request->service_name ;
        $service->save() ;
        return response()->json($service); 
    }


    public function update(Request $request, $id)
    {
        $service = Service::findOrfail($id) ;
        $service->service_name = $request->service_name ;
        $service->save() ;
        return response()->json($service);
    }

    public function destroy($id)
    {
        $service = Service::findOrfail($id) ;
        $service->delete() ;
        return response()->json($service);
    }
}
