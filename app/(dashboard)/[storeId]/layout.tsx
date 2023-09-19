import { redirect } from 'next/navigation';

import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb';
import getSession from '@/actions/getSession';
import toast from 'react-hot-toast';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const session = await getSession()

  if (!session?.user) {
    redirect('/signin');
  }
  if (session.user.email !== 'leocode09@gmail.com') {
    redirect('/signin');
  }

  const store = await prismadb.store.findFirst({ 
    where: {
      id: params.storeId,
    }
   });

  if (!store) {
    redirect('/');
  };

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
