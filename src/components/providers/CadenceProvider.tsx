'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { checkUrgencyState } from '@/actions/notifications';
import { toast } from 'sonner';

type AudioContextWindow = Window & typeof globalThis & {
  webkitAudioContext?: typeof AudioContext;
};

interface CadenceContextType {
  unreadCount: number;
  hasNewUrgency: boolean;
  stateHash: string;
  refresh: () => Promise<void>;
}

const CadenceContext = createContext<CadenceContextType | undefined>(undefined);

export function CadenceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState({
    unreadCount: 0,
    hasNewUrgency: false,
    stateHash: '',
  });

  const lastHashRef = useRef('');
  const unreadCountRef = useRef(0);

  const playNotificationSound = useCallback(() => {
    try {
      const AudioContextCtor = window.AudioContext || (window as AudioContextWindow).webkitAudioContext;
      if (!AudioContextCtor) return;

      const audioContext = new AudioContextCtor();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.5);

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch {
      console.warn('Web Audio omitido - interacao do usuario necessaria.');
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const result = await checkUrgencyState();
      if (!result) return;

      if (result.stateHash !== lastHashRef.current && result.unreadCount > unreadCountRef.current) {
        playNotificationSound();
        toast.info('Voce tem novas notificacoes de cadencia pendentes.', {
          icon: <AlertCircle className="w-4 h-4 text-rose-500" />,
        });
      }

      lastHashRef.current = result.stateHash;
      unreadCountRef.current = result.unreadCount;
      setState({
        unreadCount: result.unreadCount,
        hasNewUrgency: result.hasNewUrgency,
        stateHash: result.stateHash,
      });
    } catch (error) {
      console.error('Erro no polling da cadencia:', error);
    }
  }, [playNotificationSound]);

  useEffect(() => {
    // Initial refresh
    const initialRefresh = window.setTimeout(() => {
      refresh();
    }, 0);

    // Polling a cada 2 minutos em vez de 1 minuto para reduzir carga
    const interval = setInterval(refresh, 120_000);
    
    // Refresh também quando a janela receber foco (tab switch)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refresh();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearTimeout(initialRefresh);
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refresh]);

  const value = useMemo(() => ({ ...state, refresh }), [state, refresh]);

  return (
    <CadenceContext.Provider value={value}>
      {children}
    </CadenceContext.Provider>
  );
}

export function useCadence() {
  const context = useContext(CadenceContext);
  if (context === undefined) {
    throw new Error('useCadence must be used within a CadenceProvider');
  }
  return context;
}
