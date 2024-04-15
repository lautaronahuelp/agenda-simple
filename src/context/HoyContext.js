import { createContext, useContext } from 'react';

const hoy = new Date('2024-03-18T20:00:00');

const HoyContext = createContext(null);

export function HoyProvider({ children }) {

    return(
        <HoyContext.Provider value={ hoy }>
            { children }
        </HoyContext.Provider>
    )
}

export function useHoy() {
    return useContext(HoyContext);
}