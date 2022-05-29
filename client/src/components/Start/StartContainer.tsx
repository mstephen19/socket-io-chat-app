import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import type { Socket } from 'socket.io-client';
import Start from './Start';
import { useGlobalContext } from '../../context';
import type { SocketException } from '../../types';
import { Navigate } from 'react-router-dom';

const StartContainer: FC<{ socket: Socket }> = ({ socket }) => {
    const [state, setState] = useGlobalContext();
    const [error, setError] = useState<SocketException | null>(null);

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name: item, value } = target;

        setState((prev) => ({ ...prev, [item]: value }));
    };

    const handleSubmit = () => {
        socket.emit('join_room', { room: state?.room });

        socket.on('exception', (err: SocketException) => {
            setError(err);
        });

        socket.on('room_joined', (joined: boolean) => setState((prev) => ({ ...prev, joined })));
    };

    return (
        <>
            {state?.joined && <Navigate replace to='/chat' />}
            <Start
                name={state?.name}
                room={state?.room}
                onChange={handleChange}
                onSubmit={handleSubmit}
                disabled={!state?.name || !state?.room}
                error={error}
            />
        </>
    );
};

export default StartContainer;
