import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../Context/ContextProvider";
import "../Style/CoinValue.css";
const CoinValue = () => {
  const { coins, setCoins } = useContext(
    AppContext
  );
  const [error, setError] = useState(false); ///global error
  const [letterError, setLetterError] = useState(null); /// coin type error

  const [coinToAdd, setCoinToAdd] = useState({
    coinType: "",
    coinValue: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoinToAdd({
      ...coinToAdd,
      [name]: value,
    });
    setError(false);
  };

  const handleSubmit = (e) => {
    let flag = true,
      flag2 = true;
    if (coinToAdd.coinType === "" || coinToAdd.coinValue === "0") {
      flag = false;
      setError(true);
    }
    if (!/^[a-zA-Z]+$/.test(coinToAdd.coinType)) {
      flag = false;
      setLetterError(true);
    }
    if (flag) {
      for (let i = 0; i < coins.length; i++) {
        if (coinToAdd.coinType === coins[i].coinType) {
          flag2 = false;
        }
      }
      if (flag2) {
        setError(false);
        let temp = [...coins, coinToAdd];
        setCoins(temp);
      }
      if (flag && !flag2) {
        for (let i = 0; i < coins.length; i++) {
          if (coinToAdd.coinType === coins[i].coinType) {
            coins[i].coinValue = coinToAdd.coinValue;
            setCoins(coins);
          }
        }
      }
    }
    e.preventDefault();
  };

  useEffect(() => {}, [coins]);
  return (
    <>
      <div className="coinvalue-container">
        <h2>ATUPED</h2>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>TYPE</th>
              <th>VALUE</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin, i) => {
              return (
                <tr key={i}>
                  <td>{coin.coinType}</td>
                  <td>{coin.coinValue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <form
          className="coinvalue-container-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="update-div">
            <span className="type-span">Type</span>
            <input
              name="coinType"
              type="text"
              className="type"
              value={coinToAdd.coinType}
              onChange={handleChange}
            />
          </div>
          <div className="update-div">
            <span className="value-span">New Value</span>
            <input
              name="coinValue"
              type="number"
              className="value"
              value={coinToAdd.coinValue}
              onChange={handleChange}
            />
          </div>
          {letterError && <p>Please provid English letter - Coin Type.</p>}
          {error && <p>Please provid valid information.</p>}
          <div className="update-back-div">
            <NavLink to="/">
              <button className="back-update-btn">BACK</button>
            </NavLink>
            <input type="submit" className="back-update-btn" value="UPDATE" />
          </div>
        </form>
      </div>
    </>
  );
};

export default CoinValue;
