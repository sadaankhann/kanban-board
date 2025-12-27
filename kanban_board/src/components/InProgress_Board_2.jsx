import React, { createContext, useEffect, useState } from 'react'

export const InProgress = createContext(null);

const InProgress_Board_2 = ({children}) => {
    const [inProgress, setInProgress] = useState(() => {
        const data = localStorage.getItem('in_progress');
        return data ? JSON.parse(data) : [];
    });

    useEffect(() => {
        localStorage.setItem('in_progress', JSON.stringify(inProgress));
    }, [inProgress])
    return (
        <InProgress.Provider value={{inProgress, setInProgress}}>
            {children}
        </InProgress.Provider>
    )
}

export default InProgress_Board_2
