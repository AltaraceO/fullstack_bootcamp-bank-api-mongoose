import React, { useState } from "react";
import url from "../api/Api";

export const Delete = () => {
  const [id, setId] = useState("");
  const [user, setUser] = useState(false);
  const [name, setName] = useState("");

  const onHandleChange = (e) => {
    setUser(false);
    setId(e.target.value);
  };

  const onHandleClick = async (e) => {
    e.preventDefault();

    //*making sure there is a user token
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const data = await url.delete(`/delete/${id}`);
    console.log(data.data);
    setName(data.data.name);
    setUser(true);
  };
  return (
    <>
      <h3>Delete user</h3>
      <form>
        <label htmlFor="id">User ID</label>
        <br />
        <input onChange={onHandleChange} type="text" name="id" value={id} />
        <br />
        <button onClick={onHandleClick}>Submit</button>
      </form>
      {user && <p>{name} Deleted</p>}
    </>
  );
};
