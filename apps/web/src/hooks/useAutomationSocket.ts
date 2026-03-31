import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export interface AutomationUpdate {
  leadId: string;
  status: 'PROCESSING' | 'COMPLETED' | 'FAILED';
  log: string;
}

export const useAutomationSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [lastUpdate, setLastUpdate] = useState<AutomationUpdate | null>(null);

  useEffect(() => {
    // URL estática para desenvolvimento local
    const socketInstance = io('http://localhost:3000', {
      transports: ['websocket'],
    });

    socketInstance.on('connect', () => {
      console.log('Conectado ao Gateway de Automação');
    });

    socketInstance.on('automation_update', (data: AutomationUpdate) => {
      setLastUpdate(data);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, lastUpdate };
};
