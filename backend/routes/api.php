<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['api' => 'ready'];
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
