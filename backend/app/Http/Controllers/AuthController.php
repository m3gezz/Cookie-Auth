<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'username' => ['required','min:3','max:20','regex:/^[a-zA-Z0-9_]+$/', 'unique:users,username'],
            'email' => ['required','email','unique:users,email'],
            'password' => ['required','confirmed',Password::min(8)->mixedCase()->numbers()],
        ]);

        $user = User::create($fields);

        Auth::login($user);

        $user->sendEmailVerificationNotification();

        return response()->json(['user' => $user], 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => ['required','email'],
            'password' => ['required','string'],
        ]);

        if (!Auth::attempt($fields)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
                'password' => ['The provided credentials are incorrect.'],
            ]);
        }

        return response()->json(['user' => Auth::user()], 201);
    }

    public function logout(Request $request)
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
