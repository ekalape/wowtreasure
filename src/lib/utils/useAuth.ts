import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Дождитесь завершения загрузки
    if (!session) router.push('/'); // Если нет сессии, перенаправьте на главную страницу
  }, [session, status, router]);

  return session;
};
