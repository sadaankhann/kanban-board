import React, { createContext, useState } from 'react';

export const IndAndVal = createContext(null);

const IndAndVal_ = ({ children }) => {
  const [Index, setIndex] = useState(null);
  const [Value, setValue] = useState(null);

  return (
    <IndAndVal.Provider value={{ Index, setIndex, Value, setValue }}>
      {children}
    </IndAndVal.Provider>
  );
};

export default IndAndVal_