<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\Public\ContactRequest;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('public/Contact');
    }

    public function store(ContactRequest $request)
    {
        // Sesuai spesifikasi: tidak ada model Contact wajib.
        // Implementasi minimal: validasi + flash message.
        // (Jika nanti mau kirim email, tambahkan Mail di sini.)
        return redirect()->route('public.contact')->with('success', 'Message sent successfully.');
    }
}
