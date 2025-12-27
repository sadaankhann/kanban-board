import React, { createContext } from 'react'

export const IndAndVal = createContext('IndexAVal');

const IndexAndValue = () => {

    const [Index, setIndex] = useState(null);
    const [Value, setValue] = useState(null);
    return (
        <IndAndVal.Provider value={{Index, setIndex, Value, setValue}}>
        <div>

        </div>
        </IndAndVal.Provider>
    )
}

export default IndexAndValue
