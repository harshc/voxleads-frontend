import React, { createContext, useState, useContext, useEffect } from 'react';

const TimeContext = createContext();

export const useTime = () => {
    const context = useContext(TimeContext);
    if (!context) {
        throw new Error('useTime must be used within a TimeProvider');
    }
    return context;
};

export const TimeProvider = ({ children }) => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    useEffect(() => {
        // Update time every minute
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        // Cleanup interval on unmount
        return () => clearInterval(timer);
    }, []);

    const value = {
        currentTime,
        timezone,
        formattedTime: currentTime.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: timezone
        })
    };

    return (
        <TimeContext.Provider value={value}>
            {children}
        </TimeContext.Provider>
    );
};

export default TimeContext;
