<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::get('/', function () {
    return ['laravel' => app()->version()];
});

Route::middleware('auth:sanctum')->get('/api/user', function (Request $request) {
    return ['user' => $request->user()];
});

Route::post('/api/sign-up', [AuthController::class, 'register']);
Route::post('/api/sign-in', [AuthController::class, 'login']);
Route::post('/api/sign-out', [AuthController::class, 'logout'])->middleware('auth:sanctum');



// Verifies the email via the link
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('http://localhost:3000/');
})->middleware(['auth:sanctum', 'signed'])->name('verification.verify');

// Resend the verification email
Route::post('api/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => 'Verification link sent!']);
})->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send');