import React, { createContext, useState, useContext } from 'react';

const TradingContext = createContext();

export const TradingProvider = ({ children }) => {
    // Default to false (Live Mode)
    const [isPaperTrading, setIsPaperTrading] = useState(false);

    // Toggle function
    const togglePaperTrading = (mode) => {
        setIsPaperTrading(mode);
    };

    return (
        <TradingContext.Provider value={{ isPaperTrading, togglePaperTrading }}>
            {children}
        </TradingContext.Provider>
    );
};

export const useTrading = () => useContext(TradingContext);