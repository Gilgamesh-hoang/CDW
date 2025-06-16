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
    const wsUrl = `${API_URL}/ws`;
    console.log('🔌 Attempting to connect to WebSocket at:', wsUrl);

    try {
      // Create SockJS instance with detailed logging
      const socket = new SockJS(wsUrl);

      // Add event handlers directly to the SockJS instance for better debugging
      socket.onopen = () => {
        console.log('🔌 SockJS connection opened successfully');
      };

      socket.onclose = (event) => {
        console.log('🔌 SockJS connection closed', event);
      };

      socket.onerror = (error) => {
        console.error('🔌 SockJS connection error:', error);
      };

      const newClient = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {
          console.log('🔌 STOMP: ' + str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      newClient.onConnect = (frame) => {
        setConnected(true);
        console.log('🔌 Connected to WebSocket with STOMP', frame);
      };

      newClient.onDisconnect = () => {
        setConnected(false);
        console.log('🔌 Disconnected from WebSocket');
      };

      newClient.onStompError = (frame) => {
        console.error('🔌 STOMP error', frame);
      };

      newClient.onWebSocketError = (event) => {
        console.error('🔌 WebSocket error:', event);
      };

      newClient.onWebSocketClose = (event) => {
        console.log('🔌 WebSocket connection closed', event);
      };

      console.log('🔌 Activating STOMP client...');
      newClient.activate();
      setClient(newClient);

      return () => {
        console.log('🔌 Cleaning up WebSocket connection');
        if (newClient.connected) {
          newClient.deactivate();
        }
      };
    } catch (error) {
      console.error('🔌 Error creating WebSocket connection:', error);
      return () => {};
    }
  }, []);

  const subscribe = (
    destination: string,
    callback: (message: any) => void
  ): StompSubscription | undefined => {
    if (!client || !connected) {
      console.warn(
        '🔌 WebSocket not connected. Cannot subscribe to:',
        destination
      );
      return undefined;
    }

    console.log('🔌 Subscribing to:', destination);
    return client.subscribe(destination, (message) => {
      try {
        console.log(`🔌 Message received from ${destination}:`, message.body);
        const parsedBody = JSON.parse(message.body);
        callback(parsedBody);
      } catch (error) {
        console.error('🔌 Error parsing message body', error);
        callback(message.body);
      }
    });
  };

  const unsubscribe = (subscription: StompSubscription) => {
    if (subscription) {
      console.log('🔌 Unsubscribing from:', subscription.id);
      subscription.unsubscribe();
    }
  };

  const publish = (destination: string, body: any) => {
    if (!client || !connected) {
      console.warn(
        '🔌 WebSocket not connected. Cannot publish to:',
        destination
      );
      return;
    }

    console.log('🔌 Publishing to:', destination, body);
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
