import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

import { OperatorProvider } from '@/components/providers/OperatorProvider';
import { CadenceProvider } from '@/components/providers/CadenceProvider';
import { prisma } from '@/lib/prisma';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const profile = await prisma.profile.findUnique({
    where: { authUid: user.id },
    select: { id: true },
  });

  const operators = profile ? await prisma.operator.findMany({
    where: { profileId: profile.id },
    orderBy: { createdAt: 'desc' },
  }) : [];

  return (
    <OperatorProvider operators={operators}>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header userName={user.user_metadata?.name || user.email || 'Usuário'} />
          <main className="p-4 md:p-6 pt-24">
            {children}
          </main>
        </div>
      </div>
    </OperatorProvider>
  );
}
