import { IChar } from '@/lib/models/char.interface'

const baseUser = {
    id: "jhbghdvnhs53",
    name: "John Doe",
    email: "ZP7mG@example.com",
    chars: [
        {
            id: "123",
            name: "Liliana",
            fraction: "aliance",
            server: "eversong",
            class: "druid",
            createdAt: "2024-10-04T12:00:00.000Z",
            earnings: [{
                date:
                    "2024-11-04T12:00:00.000Z",
                amount: 1100
            },
            {
                date:
                    "2024-11-06T12:00:00.000Z",
                amount: 2115
            },
            {
                date:
                    "2024-12-12T12:00:00.000Z",
                amount: 4005
            },
            {
                date:
                    "2024-12-24T12:00:00.000Z",
                amount: 4005
            },
            {
                date:
                    "2024-12-24T12:00:00.000Z",
                amount: 4005
            },
            {
                date:
                    "2025-01-14T12:00:00.000Z",
                amount: 1000
            },
            {
                date:
                    "2025-01-14T12:00:00.000Z",
                amount: 1020
            },
            {
                date:
                    "2025-01-17T12:00:00.000Z",
                amount: 555
            },
            {
                date:
                    "2025-01-30T12:00:00.000Z",
                amount: 557
            },

            ]
        },
        {
            id: "1234",
            name: "Alice",
            fraction: "aliance",
            server: "eversong",
            class: "priest",
            createdAt: "2024-10-12T12:00:00.000Z",
            earnings: [{
                date:
                    "2024-11-12T12:00:00.000Z",
                amount: 529
            },
            {
                date:
                    "2024-12-14T12:00:00.000Z",
                amount: 8888
            },
            {
                date:
                    "2024-12-15T12:00:00.000Z",
                amount: 1300
            },
            {
                date:
                    "2025-01-06T12:00:00.000Z",
                amount: 5000
            },
            {
                date:
                    "2025-01-30T12:00:00.000Z",
                amount: 2000
            },
            {
                date:
                    "2025-01-30T12:00:00.000Z",
                amount: 122
            },
            ]
        },
        {
            id: "12345",
            name: "Glumbergstainder",
            fraction: "horde",
            server: "azuregos",
            class: "mage",
            createdAt: "2024-10-29T12:00:00.000Z",
            earnings: [{
                date:
                    "2024-11-30T12:00:00.000Z",
                amount: 650
            },
            {
                date:
                    "2024-11-11T12:00:00.000Z",
                amount: 1264
            },
            {
                date:
                    "2024-12-13T12:00:00.000Z",
                amount: 600
            },
            {
                date:
                    "2024-12-13T12:00:00.000Z",
                amount: 500
            },
            {
                date:
                    "2025-01-10T12:00:00.000Z",
                amount: 500
            },
            {
                date:
                    "2025-01-29T12:00:00.000Z",
                amount: 1500
            },
            ]
        }
    ],
    lastVisitedAt: "2025-01-12T12:00:00.000Z",
    wowTokens: [],
}


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