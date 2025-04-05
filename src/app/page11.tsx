import { redirect } from 'next/navigation';

export default function Home() {
  return <MainPage />;
}

const MainPage = () => {
  redirect('/login');
  /*  redirect('/add') */
};
