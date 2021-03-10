import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../Context/ContextProvider";
import "../Style/HomePage.css";

const HomePage = () => {
  const url = "www.facebook.com";
  const { coins } = useContext(AppContext);
  const [error, setError] = useState(false);
  const [converts, setConverts] = useState([]);
  const [displayExchanges, setDisplayExchanges] = useState(false);
  const [convertCoins, setConvertCoins] = useState({
    fromType: "",
    toType: "",
    amount: 0,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setConvertCoins({
      ...convertCoins,
      [name]: value,
    });
    setError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newCoinObject = {
      fromType: convertCoins.fromType,
      toType: convertCoins.toType,
      fromTypeAmount: 0,
      toTypeAmount: 0,
      fromTypeSum: 0,
      amount: convertCoins.amount,
      total: 0,
    };
    let temp, sum;
    let flag = true;
    if (
      newCoinObject.fromType === "" ||
      newCoinObject.toType === "" ||
      newCoinObject.amount === "0"
    ) {
      flag = false;
      setError(true);
    }
    if (flag) {
      setError(false);

      for (let i = 0; i < coins.length; i++) {
        if (newCoinObject.fromType === coins[i].coinType) {
          newCoinObject.fromTypeAmount = coins[i].coinValue;
        }
        if (newCoinObject.toType === coins[i].coinType) {
          newCoinObject.toTypeAmount = coins[i].coinValue;
        }
      }
      temp = newCoinObject.fromTypeAmount * newCoinObject.amount;
      sum = temp / newCoinObject.toTypeAmount;
      sum = sum.toFixed(2);
      newCoinObject.fromTypeSum = temp;
      newCoinObject.total = sum;
      let temp2 = [...converts, newCoinObject];
      setConverts(temp2);
    }
    console.table(converts);
  };

  const removeConvert = (e) => {
    let temp = [...converts];
    const index = e.target.value; /// get the index of specific value to remove
    console.log(index);
    if (index !== -1) {
      temp.splice(index, 1);
      setConverts(temp);
      console.table(converts);
    } else {
      temp = [];
      setConverts(temp);
      console.table(converts);
    }
  };

  useEffect(() => {}, [converts]);

  return (
    <div className="homepage-container">
      <h2>EXChange</h2>
      <form className="amount-form" onSubmit={handleSubmit} noValidate>
        <div className="inputs-coin-types">
        <span className="from-span">FROM:</span>
          <select
            name="fromType"
            id="type"
            className="select-tag"
            onChange={handleChange}
          >
            <option defaultValue>type</option>
            {coins.map((coin, i) => {
              return (
                <option
                  className="option-types"
                  key={i}
                  value={coin.coinType}
                  onChange={handleChange}
                >
                  {coin.coinType}
                </option>
              );
            })}
          </select>
        </div>
        <div className="inputs-coin-types">
          <span className="to-span">TO:</span>
          <select
            name="toType"
            id="type"
            className="select-tag"
            onChange={handleChange}
          >
            <option defaultValue>type</option>
            {coins.map((coin, i) => {
              return (
                <option
                  className="option-types"
                  key={i}
                  value={coin.coinType}
                  onChange={handleChange}
                >
                  {coin.coinType}
                </option>
              );
            })}
          </select>
        </div>
        <div className="amount-div">
          <span className="amount-span">Amount:</span>
          <input
            name="amount"
            type="number"
            className="amount-to-convert"
            value={convertCoins.amount}
            onChange={handleChange}
          />
        </div>
        <div className="start">
          <input type="submit" className="start-btn" value="START" />
        </div>
      </form>
      {error && <p>Please provid valid information.</p>}
      <div className="link-div">
        <NavLink to="/coinvalue">
          <button className="link-btn">Update</button>
        </NavLink>
        <button
          className="facebook-btn"
          onClick={() => (window.location.href = "https://facebook.com")}
        >
          Share on FACEBOOK
        </button>

        <button
          onClick={() => setDisplayExchanges(!displayExchanges)}
          className="link-btn"
        >
          View your exchange list
        </button>
      </div>
      {displayExchanges && (
        <div className="converts-list-div">
          {converts.map((convert, i) => {
            return (
              <div key={i} className="converts">
                <span className="index">#{i + 1}</span>
                <span className="from-to">
                  From {convert.fromType} To {convert.toType}
                </span>
                <span className="amount-to-amount">
                  {convert.amount}={convert.total}
                </span>
                <div className="cancel-div">
                  <button
                    key={i}
                    className="cancel-btn"
                    value={i}
                    onClick={removeConvert}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
