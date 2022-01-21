import "./App.css";
import localUrl from "./api/Api";

function App() {
  const getReq = async () => {
    const data = await localUrl.get("/");
    console.log(data.data);
  };

  return (
    <div className="App">
      Hey world hey girrrl!!!
      <div>
        <button onClick={getReq}>click</button>
      </div>
    </div>
  );
}

export default App;
