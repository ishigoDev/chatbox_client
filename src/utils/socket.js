import socketClient from 'socket.io-client';
import {createContext} from 'react';

export const SocketIntialize = socketClient('localhost:4000', {
        transports: ['websocket'],
        withCredentials: true,
      })    
export const SocketContext = createContext();

