import React, { useState } from "react";
import url from "../api/Api";

export const Transfer = () => {
  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");
  const [cash, setCash] = useState("");
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [active, setActive] = useState(false);

  const onIdOneChange = (e) => {
    setFirstId(e.target.value);
  };
  const onIdTwoChange = (e) => {
    setSecondId(e.target.value);
  };
  const onCashChange = (e) => {
    setCash(e.target.value);
  };

  const onHandleClick = async (e) => {
    e.preventDefault();
    const newObj = {
      cash,
    };
    const data = await url.patch(`/transfer/${firstId}/${secondId}`, newObj);

    setFromName(data.data.from.name);
    setToName(data.data.to.name);
    setActive(true);
  };
  return (
    <>
      <h3>Transfer</h3>
      <form>
        <label htmlFor="id1">User ID to transfer from</label>
        <br />
        <input
          onChange={onIdOneChange}
          type="text"
          name="id1"
          value={firstId}
        />
        <br />
        <label htmlFor="id2">User ID to transfer to</label>
        <br />
        <input
          onChange={onIdTwoChange}
          type="text"
          name="id2"
          value={secondId}
        />
        <br />
        <label htmlFor="cash">Amount to transfer</label>
        <br />
        <input onChange={onCashChange} type="number" name="cash" value={cash} />
        <br />
        <button onClick={onHandleClick}>Submit</button>
      </form>
      {active && (
        <p>
          {cash} transferred from {fromName} to {toName}
        </p>
      )}
    </>
  );
};
