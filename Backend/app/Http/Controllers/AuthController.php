<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignRequest $request){
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name'=>$data['name'],
            'user_name'=>$data['user_name'],
            'password'=>bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken ; 
    
        return response(compact('user','token'));
    }

    public function login (LoginRequest $request){
        $credentials = $request->validated() ;
        if(!Auth::attempt($credentials)){
            return response([
                'message'=>'UserName ou Mot de passe incorrecte'
            ]);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user() ; 
        $token = $user->createToken('main')->plainTextToken ;

        return response(compact('user','token'));
    }

    public function logout (Request $request){
        /** @var User $user */
        $user = $request->user() ;
        $user->currentAccessToken()->delete() ;

        return response('' , 204) ; 
    }
}
