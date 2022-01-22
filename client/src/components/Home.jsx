import React, { useState } from "react";
import url from "../api/Api";

export const Home = () => {
  const [name, setName] = useState("");
  const [cash, setCash] = useState(0);
  const [credit, setCredit] = useState(0);
  const [user, setUser] = useState(false);

  const onHandleChangeName = (e) => {
    setUser(false);
    setName(e.target.value);
  };
  const onHandleChangeCash = (e) => {
    setUser(false);
    setCash(e.target.value);
  };
  const onHandleChangeCredit = (e) => {
    setUser(false);
    setCredit(e.target.value);
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (cash < 0 || credit < 0) {
      throw new Error("Values cannot be lower than zero");
    }
    const newObj = {
      name,
      cash,
    };

    const data = await url.post("/users", newObj);
    console.log(data.data);
    setUser(true);
  };

  return (
    <>
      <h3>New Account</h3>
      <form>
        <label htmlFor="name">Account holder name</label>
        <br />
        <input
          onChange={onHandleChangeName}
          type="text"
          name="name"
          value={name}
        />
        <br />
        <label htmlFor="cash">Cash</label>
        <br />
        <input
          onChange={onHandleChangeCash}
          type="number"
          name="cash"
          value={cash}
        />
        <br />
        <label htmlFor="credit">Credit</label>
        <br />
        <input
          onChange={onHandleChangeCredit}
          type="number"
          name="credit"
          value={credit}
        />
        <br />
        <button onClick={onHandleSubmit}>submit</button>
      </form>
      {user && (
        <div>
          {" "}
          <p>
            Account created for {name} with {cash} in cash and {credit} in
            credit.
          </p>{" "}
        </div>
      )}
    </>
  );
};
