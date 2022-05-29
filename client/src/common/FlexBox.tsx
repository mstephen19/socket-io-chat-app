import type { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

type Supported = 'center' | 'space-evenly' | 'space-around' | 'space-between' | 'flex-start' | 'flex-end';

interface FlexBoxProps {
    children: ReactNode;
    content?: Supported | 'none';
    items?: Supported;
    direction?: 'row' | 'column';
    width: string;
    height: string;
    background?: string;
    overflowY?: string;
    gap?: string;
    padding?: string;
    wrapText?: boolean;
}

const FlexBox: FC<FlexBoxProps> = ({ children, content, items, direction, width, height, background, overflowY, gap, padding, wrapText }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: content && content === 'none' ? '' : content || 'center',
                alignItems: items || 'center',
                flexDirection: direction || 'column',
                background: background || '',
                paddingLeft: padding || 'clamp(5px, 5%, 25%)',
                paddingRight: padding || 'clamp(5px, 5%, 25%)',
                overflowY: overflowY || 'none',
                gap: gap || '',
                wordWrap: wrapText ? 'break-word' : '',
                wordBreak: wrapText ? 'break-word' : '',
                whiteSpace: wrapText ? 'pre-wrap' : '',
            }}
            width={width}
            height={height}
        >
            {children && children}
        </Box>
    );
};

export default FlexBox;
