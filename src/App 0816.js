


import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import { createGlobalStyle } from "styled-components";
import Main from "./Main";

import Todopage from "./Todopage";
import Yumpage from "./Yumpage";

const GlobalStyle = createGlobalStyle`
    body {
      
    }
`;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path="/todopage" element={<AppTodo />} /> */}
          <Route path="/todopage" element={<Todopage />} />
          <Route path="/yumpage" element={<Yumpage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

