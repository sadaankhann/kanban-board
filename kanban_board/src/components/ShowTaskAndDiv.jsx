import React, { createContext, useState } from 'react'

export const TaskAndDiv = createContext(null);

const ShowTaskAndDiv = ({children}) => {
    const [showTaskAddDiv, setShowTaskAddDiv] = useState(false);
    
  return (
    <TaskAndDiv.Provider value={{showTaskAddDiv, setShowTaskAddDiv}}>
        {children}
    </TaskAndDiv.Provider>
  )
}

export default ShowTaskAndDiv
