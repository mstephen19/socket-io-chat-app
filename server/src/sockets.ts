import type { Socket } from 'socket.io';
import { isValid } from './utils';
import type { JoinRoomParams, SendMessageParams } from './types';

export const handleConnection = (socket: Socket) => {
    console.log('connected', socket.id);

    socket.on('join_room', (data: JoinRoomParams) => {
        if (!isValid(data, !!data?.room && typeof data?.room === 'string')) {
            return socket.emit('exception', { message: 'Room incorrectly provided!' });
        }

        socket.join(data.room);

        socket.emit('room_joined', true);
    });

    socket.on('send_message', (data: SendMessageParams) => {
        if (!isValid(data, !!data?.message && !!data?.room && !!data?.name && !!data?.date)) {
            return socket.emit('exception', { message: 'Message data corrupted. Try again.' });
        }

        socket.to(data?.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('disconnected', socket.id);
    });
};
