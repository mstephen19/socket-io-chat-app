import type { FC, ReactNode } from 'react';
import { Paper } from '@mui/material';

const PaperFlex: FC<{ children: ReactNode; height: number; noPadding?: boolean, noGap?: boolean }> = ({ children, height, noPadding, noGap }) => {
    return (
        <Paper
            elevation={10}
            sx={{
                height: `${height}px`,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'column',
                padding: noPadding ? '0' : '10px',
                gap: noGap ? '' : '10px',
            }}
        >
            {children && children}
        </Paper>
    );
};

export default PaperFlex;
