import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import url from "../api/Api";
// import { withRouter } from "react-router";
// import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const [email, setEmail] = useState("ori@email.com");
  const [password, setPassword] = useState("oriadmin123");
  const [error, setError] = useState("");

  const history = useHistory();
  //   const history = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("authToken")) {
  //     history.push("/");
  //   }
  // }, [history]);

  const onHandleClick = async (e) => {
    e.preventDefault();

    //*making sure there is a user token
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    // "email":"ori@email.com",
    // "password":"oriadmin123"

    try {
      const { data } = await url.post(
        "/admin/login",
        { email, password },
        config
      );
      console.log(data.token);
      localStorage.setItem("authToken", data.token);
      // history.push("/");
    } catch (e) {
      setError(e.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  console.log(history);
  return (
    <>
      <h3>Admin Login</h3>
      {error && (
        <div>
          {" "}
          <span>{error}</span> <hr />{" "}
        </div>
      )}
      <form>
        <label htmlFor="id">Password</label>
        <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          name="id"
          value={password}
        />
        <br />

        <label htmlFor="id">E-mail</label>
        <br />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name="id"
          value={email}
        />
        <br />

        <button onClick={onHandleClick}>Login</button>
      </form>
    </>
  );
};
