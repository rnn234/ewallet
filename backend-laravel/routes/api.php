<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/topup', [TransactionController::class, 'topup']);
    Route::post('/transfer', [TransactionController::class, 'transfer']);
    Route::get('/history', [TransactionController::class, 'history']);
});
