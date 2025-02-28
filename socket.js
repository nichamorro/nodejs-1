//// src/socket.js

import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { Auth } from './AUTH/MODELS/Auth-V1.js';

let io;
const userSockets = {}; // Almacena los socketId asociados a los userId

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', // Se más específico en producción
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  });

  io.use(async (socket, next) => {
    try {
      // Leer el token desde el encabezado Authorization
      const authHeader = socket.handshake.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('Encabezado de autorización inválido o no enviado.');
        return next(new Error('Encabezado de autorización inválido o no enviado.'));
      }

      const token = authHeader.split(' ')[1]; // Extraer el token después de "Bearer"
      console.log("Token recibido:", token); // Verifica que el token llega correctamente

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sistem!383#$&');
      console.log('Token decodificado:', decoded);

      const user = await Auth.findById(decoded.userId);
      if (!user) {
        console.log('Usuario no encontrado.');
        return next(new Error('Usuario no encontrado.'));
      }

      socket.user = user; // Asociar usuario autenticado al socket
      return next();
    } catch (error) {
      console.error('Error al verificar token:', error.message);
      return next(new Error('Autenticación fallida.'));
    }
  });

  io.on('connection', (socket) => {
    if (socket.user) {
      console.log('Un cliente autenticado se ha conectado', socket.user._id);

      // Almacenar el socketId asociado con el userId
      userSockets[socket.user._id] = socket.id;

      socket.on('disconnect', () => {
        console.log('Cliente autenticado desconectado', socket.user._id);
        delete userSockets[socket.user._id]; // Eliminar el socketId al desconectar
      });
    } else {
      console.log('Un cliente no autenticado se ha conectado');

      socket.on('disconnect', () => {
        console.log('Cliente no autenticado desconectado');
      });
    }

    // Maneja otros eventos aquí
    socket.on('message', (data) => {
      console.log('Mensaje recibido:', data);
      // Broadcast the message to all connected clients
      io.emit('message', { user: socket.user ? socket.user._id : 'Anonymous', message: data });
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io no ha sido inicializado!');
  }
  return io;
};

export const getUserSockets = () => {
  return userSockets;
};
