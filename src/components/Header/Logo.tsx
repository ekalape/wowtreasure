import Image from 'next/image';
import logoImg from '@/assets/w-icon.png';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/routes';

export default function Logo() {
  return (
    <div className='py-1 px-3 relative left-4 w-[10vw] max-w-[70px] min-w-[40px] aspect-square'>
      <Link href={ROUTES.HOME}>
        <Image src={logoImg.src} alt={'Logo'} fill className='relative h-auto'></Image>
      </Link>
    </div>
  );
}
