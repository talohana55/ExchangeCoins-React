import React, { createContext, useState, useEffect } from "react";
export const AppContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [coins, setCoins] = useState([
    {
      coinType: "Dollar",
      coinValue:'3.2',
    },
    {
      coinType: "Euro",
      coinValue: '3.9',
    },
    {
      coinType: "Shekel",
      coinValue: '1',
    },
  ]);

    const [converts, setConverts] = useState([]);



  const addCoinToList = (coin) => {
    /// any new coin object
    let temp = [...coins, coin];
    setCoins(temp);
    console.log(coins);
  };


  useEffect(() => { }, [converts]);
  

  return (
    <AppContext.Provider
      value={{
        coins,
        addCoinToList,
        setCoins,     
     

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
