import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

interface State {
    name: string;
    room: string;
    joined: boolean;
}

export const initialState = { name: '', room: '', joined: false };

type GlobalContextType = [State, Dispatch<SetStateAction<State>>];

export const GlobalContext = createContext<GlobalContextType>([] as unknown as GlobalContextType);

export const useGlobalContext = () => useContext(GlobalContext);
