import { GlobalContext, initialState } from './context';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';

const GlobalContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState(initialState);

    return <GlobalContext.Provider value={[state, setState]}>{children && children}</GlobalContext.Provider>;
};

export default GlobalContextProvider;
