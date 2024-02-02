import { io } from 'socket.io-client';
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Bin from "./components/Bin";
import { useEffect  } from "react";


import "./App.css";
const socket = io("http://localhost:3000");

function App() {
  // const [count, setCount] = useState(0)

  

  useEffect(() => {
    socket.emit("frontend", "helloefromfrontendzooor");

    const testRequest = async () => fetch("http://localhost:3000");
    testRequest();
    socket.on("backend", (message) => console.log(message));
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/display/:bin_path" element={<Bin />}></Route>
      </Routes>
    </>
  );
}

export default App;
