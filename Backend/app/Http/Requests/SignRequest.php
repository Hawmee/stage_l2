<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=>'required|String|max:55',
            'service_name'=>'required|exists:services,service_name' , 
            'user_name'=>'required|String|max:25|unique:users,user_name' ,
            'password'=>'required|confirmed|min:4'
        ];
    }
}
