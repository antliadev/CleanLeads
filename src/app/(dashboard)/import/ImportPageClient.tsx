'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const ImportWizard = dynamic(
  () => import('@/features/imports/ImportWizard').then((mod) => mod.ImportWizard),
  {
    loading: () => (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    ),
    ssr: false, // ImportWizard uses FileReader, client-only
  }
);

export function ImportPageClient() {
  return <ImportWizard />;
}
