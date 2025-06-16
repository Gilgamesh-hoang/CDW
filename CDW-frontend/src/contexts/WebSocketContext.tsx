import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Client, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_URL } from '@/config';

interface WebSocketContextType {
  client: Client | null;
  connected: boolean;
  subscribe: (
    destination: string,
    callback: (message: any) => void
  ) => StompSubscription | undefined;
  unsubscribe: (subscription: StompSubscription) => void;
  publish: (destination: string, body: any) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
}

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [client, setClient] = useState<Client | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newClient = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}/ws`),
      debug: (str) => {
        console.log('STOMP: ' + str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    newClient.onConnect = () => {
      setConnected(true);
      console.log('Connected to WebSocket');
    };

    newClient.onDisconnect = () => {
      setConnected(false);
      console.log('Disconnected from WebSocket');
    };

    newClient.onStompError = (frame) => {
      console.error('STOMP error', frame);
    };

    newClient.activate();
    setClient(newClient);

    return () => {
      if (newClient.connected) {
        newClient.deactivate();
      }
    };
  }, []);

  const subscribe = (
    destination: string,
    callback: (message: any) => void
  ): StompSubscription | undefined => {
    if (!client || !connected) {
      console.warn('WebSocket not connected. Cannot subscribe.');
      return undefined;
    }

    return client.subscribe(destination, (message) => {
      try {
        const parsedBody = JSON.parse(message.body);
        callback(parsedBody);
      } catch (error) {
        console.error('Error parsing message body', error);
        callback(message.body);
      }
    });
  };

  const unsubscribe = (subscription: StompSubscription) => {
    if (subscription) {
      subscription.unsubscribe();
    }
  };

  const publish = (destination: string, body: any) => {
    if (!client || !connected) {
      console.warn('WebSocket not connected. Cannot publish.');
      return;
    }

    client.publish({
      destination,
      body: JSON.stringify(body),
    });
  };

  return (
    <WebSocketContext.Provider
      value={{ client, connected, subscribe, unsubscribe, publish }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
