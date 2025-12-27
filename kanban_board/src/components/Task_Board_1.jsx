import React, { createContext, useEffect, useState } from 'react'

export const Tasks = createContext(null);

const Task_Board_1 = ({children}) => {
    const [tasks, setTasks] = useState(() => {
        const data = localStorage.getItem('todo');
        return data ? JSON.parse(data) : [];
    });

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(tasks));
    }, [tasks])
    return (
        <Tasks.Provider value={{tasks, setTasks}}>
            {children}
        </Tasks.Provider>
    )
}

export default Task_Board_1
