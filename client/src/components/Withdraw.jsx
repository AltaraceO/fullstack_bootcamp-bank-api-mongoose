import React, { useState } from "react";
import url from "../api/Api";

export const Withdraw = () => {
  const [cash, setCash] = useState(0);
  const [id, setId] = useState("");
  const [user, setUser] = useState(false);
  const [currBalance, setCurrBalance] = useState("");
  const [name, setName] = useState("");

  const onChangeCash = (e) => {
    setCash(e.target.value);
  };

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onHandleClick = async (e) => {
    e.preventDefault();
    const newObj = {
      cash,
    };
    const data = await url.patch(`/withdrawal/${id}`, newObj);

    setCurrBalance(data.data.cash);
    setName(data.data.name);
    setUser(true);
  };
  return (
    <>
      <div>
        <h3>Withdrawals</h3>
        <form>
          <label htmlFor="id">User ID</label>
          <br />
          <input type="text" name="id" value={id} onChange={onChangeId} />
          <br />
          <label htmlFor="cash">Withdrawal amount</label>
          <br />
          <input
            type="number"
            name="cash"
            value={cash}
            onChange={onChangeCash}
          />
          <br />
          <button onClick={onHandleClick}>Submit</button>
        </form>
      </div>{" "}
      {user && (
        <p>
          Current Balance for {name} is {currBalance}{" "}
        </p>
      )}
    </>
  );
};
