import React, { createContext, useState } from 'react'

export const TaskAndDescription = createContext(null);

const AddTaskAndAddTaskDescription = ({children}) => {
    const [addTask, setAddTask] = useState("");
    const [addTaskDescription, setAddTaskDescription] = useState("");
  return (
    <TaskAndDescription.Provider value={{addTask, setAddTask, addTaskDescription, setAddTaskDescription}}>
        {children}
    </TaskAndDescription.Provider>
  )
}

export default AddTaskAndAddTaskDescription
