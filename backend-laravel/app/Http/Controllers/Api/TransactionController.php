<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    public function topup(Request $request)
    {
        // Validate the request
        $request->validate([
            'amount' => 'required|numeric|min:1000',
        ]);

        // Get the authenticated user
        $user = Auth::user();

        // Update the user's balance
        $user->balance += $request->amount;
        $user->save();

        // Create a transaction record
        Transaction::create([
            'user_id' => $user->id,
            'type' => 'topup',
            'amount' => $request->amount,
        ]);

        return response()->json(['message' => 'Top-up successful', 'balance' => $user->balance]);
    }

    public function transfer(Request $request)
    {
        // Validate the request
        $request->validate([
            'target_user_id' => 'required|exists:users,id',
            'amount' => 'required|numeric|min:1000',
        ]);

        // Get the authenticated user
        $user = Auth::user();
        $target = User::find($request->target_user_id);

        // Check if the user has enough balance
        if ($user->balance < $request->amount) {
            return response()->json(['message' => 'Insufficient balance'], 400);
        }

        // Update the balances of both users
        $user->balance -= $request->amount;
        $user->save();

        $target->balance += $request->amount;
        $target->save();

        // Create a transaction record for both users
        Transaction::create([
            'user_id' => $user->id,
            'type' => 'transfer',
            'amount' => -$request->amount,
            'target_user_id' => $target->id,
        ]);
        
        Transaction::create([
            'user_id' => $target->id,
            'type' => 'transfer',
            'amount' => $request->amount,
            'target_user_id' => $user->id,
        ]);

        return response()->json(['message' => 'Transfer successful', 'balance' => $user->balance]);
    }

    public function history()
    {
        return Auth::user()->transactions()->latest()->get();
    }
}
