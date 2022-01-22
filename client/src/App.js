// import "./App.css";
import localUrl from "./api/Api";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  const getReq = async () => {
    const data = await localUrl.get("/users");
    console.log(data.data);
  };

  const getReqToo = async () => {
    const data = await localUrl.get("/api");
    console.log(data.data);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Route>
          <Home exact path="/" />
        </Route>
      </BrowserRouter>
      <div>
        <button onClick={getReq}>click</button>
        <button onClick={getReqToo}>clickToo</button>
      </div>
    </div>
  );
}

export default App;
