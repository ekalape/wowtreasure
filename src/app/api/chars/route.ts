import { IChar } from '@/lib/models/char.interface'
import { baseUser } from '@/lib/temp-database'


const allChars = baseUser.chars;


export async function GET() {
    const chars = allChars


    return new Response(JSON.stringify(chars), { status: 200 })
}

export async function POST(request: Request) {

    const body = await request.json()
    const char: IChar = body.char

    if (!body || !char) {
        return new Response("Invalid request", { status: 405 })
    }

    allChars.push(char)

    return new Response(JSON.stringify(allChars), { status: 200 })

}    