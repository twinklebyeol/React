import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Main from './Main';
import Todopage from './Todopage';

function App() {


  return (
<BrowserRouter>
<div className="Container">
<Routes>
<Route path="/" element={<Main />} />
<Route path="/todopage" element={<Todopage />} />
</Routes>
</div>
</BrowserRouter>
 
  );
}

export default App;
