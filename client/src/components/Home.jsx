import React, { useState } from "react";
import url from "../api/Api";

export const Home = () => {
  const [name, setName] = useState("");
  const [active, setActive] = useState("");

  const onHandleChangeName = (e) => {
    setName(e.target.value);
  };
  const onHandleChangeActive = (e) => {
    setActive(e.target.value);
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const newObj = {
      name,
      active,
    };
    console.log(JSON.stringify(newObj));
    const data = await url.post("/users", newObj);
    console.log(data.data);
  };

  return (
    <>
      <div>inputs</div>
      <form>
        <input
          onChange={onHandleChangeName}
          type="text"
          name="name"
          value={name}
        />
        <input
          onChange={onHandleChangeActive}
          type="text"
          name="active"
          value={active}
        />
        <button onClick={onHandleSubmit}>submit</button>
      </form>
    </>
  );
};
