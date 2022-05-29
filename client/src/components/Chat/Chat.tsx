import type { FC, ChangeEvent, KeyboardEvent } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import PaperFlex from '../../common/PaperFlex';
import FlexBox from '../../common/FlexBox';
import type { MeMessageData } from './ChatContainer';

interface ChatProps {
    room: string;
    message: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onSend: () => void;
    disabled: boolean;
    name: string;
    messages: MeMessageData[];
    onKeyUp: (e: KeyboardEvent<HTMLDivElement>) => void;
}

const Chat: FC<ChatProps> = ({ room, message, onChange, onSend, onKeyUp, disabled, name, messages }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '75%' }}>
            <PaperFlex height={500} noPadding noGap>
                <FlexBox width='100%' height='10%'>
                    <Typography variant='h4'>Room: {room}</Typography>
                </FlexBox>
                <FlexBox width='100%' height='70%' overflowY='scroll' content='none' padding='0' gap='5px'>
                    {messages.map(({ message, name, me, date }, i) => (
                        <FlexBox width='100%' height='auto' key={`${i}-${name}`} items={me ? 'flex-end' : 'flex-start'}>
                            <FlexBox width='45%' height='auto' background={me ? 'lightblue' : 'lightgrey'} wrapText>
                                <Typography>{new Date(date).toLocaleTimeString()}</Typography>
                                {`${name}: ${message}`}
                            </FlexBox>
                        </FlexBox>
                    ))}
                </FlexBox>
                <FlexBox width='100%' height='20%' direction='row'>
                    <TextField
                        variant='filled'
                        fullWidth
                        multiline
                        maxRows={2}
                        value={message}
                        onChange={onChange}
                        label={`Send a message as ${name}...`}
                        onKeyUp={onKeyUp}
                    />
                    <Button variant='contained' onClick={onSend} disabled={disabled}>
                        Send
                    </Button>
                </FlexBox>
            </PaperFlex>
        </Box>
    );
};

export default Chat;
