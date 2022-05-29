import { useEffect, useCallback } from 'react';
import type { ChangeEvent, FC, KeyboardEvent } from 'react';
import type { Socket } from 'socket.io-client';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Chat from './Chat';
import { useGlobalContext } from '../../context';
import type { MessageData, SocketException } from '../../types';
import axios from 'axios';

export type MeMessageData = MessageData & { me: boolean };

const ChatContainer: FC<{ socket: Socket }> = ({ socket }) => {
    const [state, setState] = useGlobalContext();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<MeMessageData[]>([]);

    const handleKeyUp = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            return handleSend();
        }
    };

    const handleNewMessage = useCallback((prev: MeMessageData[], data: MessageData) => {
        return [
            ...prev,
            {
                ...data,
                me: data?.name === state?.name,
            },
        ];
    }, []);

    useEffect(() => {
        socket.on('receive_message', (data: MessageData) => {
            setMessages((prev) => handleNewMessage(prev, data));
        });

        socket.on('exception', (data: SocketException) => {
            console.log(data?.message);
        });
    }, []);

    const handleChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(target.value);
    };

    const handleSend = () => {
        const data = { name: state?.name, room: state?.room, message, date: new Date().toISOString() };

        socket.emit('send_message', data);

        setMessages((prev) => handleNewMessage(prev, data));

        setMessage('');
    };

    return (
        <>
            {!state?.joined && <Navigate replace to='/' />}
            <Chat
                messages={messages}
                name={state?.name}
                room={state?.room}
                message={message}
                onChange={handleChange}
                onSend={handleSend}
                disabled={!message}
                onKeyUp={handleKeyUp}
            />
        </>
    );
};

export default ChatContainer;
