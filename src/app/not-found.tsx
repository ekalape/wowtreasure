'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className={`flex flex-col gap-6 w-1/3 m-auto h-screen items-center justify-center`}>
      This page does not exist
      <Button onClick={() => router.back()}> Back</Button>
    </div>
  );
}
