<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CallController;
use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout' , [AuthController::class , 'logout']);
});
    

Route::resource('tickets',TicketController::class)->except(['create']);

Route::resource('calls', CallController::class);

Route::post('/login' , [AuthController::class , 'login']);

Route::post('/signup' , [AuthController::class , 'signup']);

