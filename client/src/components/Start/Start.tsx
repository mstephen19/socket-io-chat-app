import type { FC, ChangeEvent } from 'react';
import { TextField, Typography, Box, Button } from '@mui/material';

import PaperFlex from '../../common/PaperFlex';
import React from 'react';
import type { SocketException } from '../../types';

interface StartProps {
    name: string;
    room: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    disabled: boolean;
    error: SocketException | null;
}

const Start: FC<StartProps> = ({ name, room, onChange, onSubmit, disabled, error }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '75%' }}>
            <Typography variant='h3'>Join a room</Typography>
            <PaperFlex height={200}>
                <TextField label='Your name' value={name} autoFocus variant='filled' name='name' onChange={onChange}/>
                <TextField label='Room name' value={room} variant='filled' name='room' onChange={onChange} />
                <Button variant='contained' onClick={onSubmit} disabled={disabled}>
                    Join
                </Button>
                {error && <Typography sx={{ color: 'red' }}>{error?.message || 'An error occurred joining the room.'}</Typography>}
            </PaperFlex>
        </Box>
    );
};

export default Start;
