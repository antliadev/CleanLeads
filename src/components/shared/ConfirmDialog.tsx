'use client';

import { useState, useEffect } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfirmDialogProps {
  title?: string;
  description?: string;
  onConfirm: () => Promise<void>;
  children: React.ReactNode;
  destructive?: boolean;
}

export function ConfirmDialog({
  title = 'Confirmar ação',
  description = 'Tem certeza que deseja continuar? Esta ação não pode ser desfeita.',
  onConfirm,
  children,
  destructive = true,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Trava scroll da página quando modal abre
  useEffect(() => {
    if (open) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [open]);

  async function handleConfirm() {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <span onClick={() => setOpen(true)}>{children}</span>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => !loading && setOpen(false)}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-4 p-8 space-y-6">
            <div className="flex flex-col items-center text-center space-y-3">
              {destructive && (
                <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center">
                  <Trash2 className="w-7 h-7 text-rose-500" />
                </div>
              )}
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-all text-sm disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className={cn(
                  'flex-1 px-4 py-3 font-semibold rounded-xl transition-all text-sm text-white flex items-center justify-center gap-2 disabled:opacity-50',
                  destructive
                    ? 'bg-rose-500 hover:bg-rose-600'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                )}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Confirmar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
