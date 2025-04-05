import { NextRequest, NextResponse } from 'next/server';
/* import { authAdmin } from '@/lib/firebaseAdmin'; */

export async function POST(req: NextRequest) {
    const { token } = await req.json();

    try {
        // Проверяем токен
        /*  const decodedToken = await authAdmin.verifyIdToken(token); */
        /*  const uid = decodedToken.uid; */

        const uid = token  //TO-DO   CHANGE

        // Устанавливаем cookie с UID
        const response = NextResponse.json({ uid });
        response.cookies.set('uid', uid, {
            httpOnly: true, // Безопасность: доступ только серверу
            /* secure: process.env.NODE_ENV === 'production', */ // Только HTTPS в продакшене
            maxAge: 60 * 60 * 24 * 7, // 7 дней
            path: '/',
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
}