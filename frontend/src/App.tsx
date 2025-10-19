import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import CreateStation from "./pages/CreateStation";


function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<CreateStation/>} path='/create'/>
    </Routes>
  );
}

export default App;
