"use client";

import { useState } from 'react';
/* import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth'; */
/* import { auth } from '@/lib/firebase'; */

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            /*             const userCredential = await signInWithEmailAndPassword(auth, email, password);
                        const user = userCredential.user;
                        const token = await getIdToken(user); */

            const token = 'your-token'; // Замените на реальный токен
            const user = { uid: 'user-id' };

            // Отправляем токен на сервер для установки cookies
            await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            console.log("User logged in:", user.uid);
            window.location.href = '/add'; // Переход на страницу после входа
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
}