import API from "../../utils/API";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../App";
import "./style.css";

export default function Trade(props) {
  const { ticker } = props.location.state;
  const { state } = useContext(AuthContext);

  const [orderState, setOrderState] = useState({
    side: "",
    id: state.id,
    company: ticker,
    price: 0,
    quantity: 0,
  });

  function handleSubmit(event) {
    event.preventDefault();
    const tradeOptions = {
      id: orderState.id,
      company: ticker,
      cost: +orderState.price,
      quantity: +orderState.quantity,
    };
    if (orderState.side === "buy") {
      API.tradeBuy(tradeOptions, state.token)
        .then(() => {
          props.history.push("/profile");
        })
        .catch((err) => console.error(err));
    }
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setOrderState({
      ...orderState,
      [name]: value,
    });
  }
  return (
    <>
      <div className="order-container">
        <div className="order-title-container">
          <h3>Create Order</h3>
        </div>

        <div className="order-body-container">
          <h4>{ticker}</h4>
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <label>
              Side: <br />
              <label for="side">
                Buy
                <input type="radio" name="side" value="buy" />
              </label>
              <label for="side">
                Sell
                <input type="radio" name="side" value="sell" disabled />
              </label>
            </label>
            <br />
            <label for="quantity">
              Quantity: <br />
              <input type="number" name="quantity"></input>
            </label>
            <br />
            <label for="price">
              Price: <br />
              <input type="number" name="price"></input>
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
}
