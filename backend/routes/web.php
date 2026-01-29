<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['laravel' => app()->version()];
});

Route::middleware('auth:sanctum')->get('/api/user', function (Request $request) {
    return ['user' => $request->user()];
});

Route::post('/api/sign-up', [AuthController::class, 'register']);
Route::post('/api/sign-in', [AuthController::class, 'login']);
Route::post('/api/sign-out', [AuthController::class, 'logout'])->middleware('auth:sanctum');
