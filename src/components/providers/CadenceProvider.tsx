'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { checkUrgencyState } from '@/actions/notifications';
import { toast } from 'sonner';

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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializa áudio com um 'Chime' sintético em Base64 para garantir disponibilidade
  useEffect(() => {
    // Som curto e limpo de notificação (Chime)
    const chimeBase64 = "data:audio/mp3;base64,SUQzBAAAAAABEVRYWFhYAAAAHAAAAGNoaW1lX2F1ZGlvX2Jhc2U2NF9zb3VuZAAA//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABY29tYm8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7kmRAAAAHAAAABQAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uSZEAAAAcAAAAFAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//uSZEAAAAcAAAAFAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    // Nota: Como não posso gerar um binário MP3 real complexo aqui, vou usar um som de sistema padrão ou garantir que o erro não trave a app.
    // Na verdade, vou usar um som de oscilador via Web Audio API para ser 100% sênior e independente de assets.
  }, []);

  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
      oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.5); // A4

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.warn("Web Audio omitido - interação do usuário necessária.");
    }
  };

  const refresh = async () => {
    try {
      const result = await checkUrgencyState();
      if (!result) return;

      // Se o hash mudou e temos novas notificações não lidas, toca som
      if (result.stateHash !== lastHashRef.current && result.unreadCount > state.unreadCount) {
        playNotificationSound();
        toast.info(`Você tem novas notificações de cadência pendentes.`, {
          icon: <AlertCircle className="w-4 h-4 text-rose-500" />
        });
      }

      lastHashRef.current = result.stateHash;
      setState({
        unreadCount: result.unreadCount,
        hasNewUrgency: result.hasNewUrgency,
        stateHash: result.stateHash,
      });
    } catch (error) {
      console.error('Erro no polling da cadência:', error);
    }
  };

  // Polling a cada 60 segundos
  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CadenceContext.Provider value={{ ...state, refresh }}>
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
