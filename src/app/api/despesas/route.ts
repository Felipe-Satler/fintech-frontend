import { NextResponse } from "next/server"

export async function GET() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/despesas`)
        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error("Error fetching products", error)
        return NextResponse.json({error: "Falha ao recuperar os produtos"}, {status: 401})
    }
}