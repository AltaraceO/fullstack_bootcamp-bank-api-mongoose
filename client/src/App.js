import "./App.css";
import localUrl from "./api/Api";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { Deposit } from "./components/Deposit";
import { Withdraw } from "./components/Withdraw";
import { Transfer } from "./components/Transfer";
import { Delete } from "./components/Delete";
import { AdminLogin } from "./components/AdminLogin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [users, setUsers] = useState("");
  const getReq = async () => {
    const data = await localUrl.get("/users");
    setUsers(data.data);
    console.log(users);
  };

  // const history

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/deposit">
            <Deposit />
          </Route>

          <Route exact path="/withdrawal" component={Withdraw} />
          <Route exact path="/transfer">
            <Transfer />
          </Route>
          <Route exact path="/delete">
            <Delete />
          </Route>
          <Route exact path="/admin">
            <AdminLogin />
          </Route>
        </Switch>
      </Router>
      <div>
        <button onClick={getReq}>All users </button>
      </div>
      {users &&
        users.map((e) => {
          return (
            <div key={e._id}>
              <hr />
              Name:{e.name}
              <br />
              Balance:{e.cash}
              <br />
              ID:{e._id}
            </div>
          );
        })}
    </div>
  );
}

export default App;
