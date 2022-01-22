// import "./App.css";
import localUrl from "./api/Api";
import { Home } from "./components/Home";

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
      <Home />
      <div>
        <button onClick={getReq}>click</button>
        <button onClick={getReqToo}>clickToo</button>
      </div>
    </div>
  );
}

export default App;
