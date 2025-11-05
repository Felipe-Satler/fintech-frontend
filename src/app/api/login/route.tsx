import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {username, password } = await request.json();
    
    if(!username || !password) {
        return new Response(JSON.stringify({ message: "Os campos são obrigatórios."}), {status: 400})
    }

    if (username === "Felipe" && password === "123") {
        return NextResponse.json( {token: 'token-exemplo'});
    }

    return NextResponse.json({ message: "Login e/ou senha incorretos."}, {status: 401})
}