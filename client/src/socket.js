
import socketIoClient from 'socket.io-client';
const ENDPOINT = "http://127.0.0.1:5000";


export const socket = socketIoClient(ENDPOINT);