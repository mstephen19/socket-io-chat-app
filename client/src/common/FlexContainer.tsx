import type { FC, ReactNode } from 'react';
import { Container } from '@mui/material';

const FlexContainer: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Container
            component='div'
            maxWidth='xl'
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                flexDirection: 'column',
                minWidth: '500px',
            }}
        >
            {children && children}
        </Container>
    );
};

export default FlexContainer;
