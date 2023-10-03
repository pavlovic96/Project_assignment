import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Favorites from "./components/Favorites/Favorites";
import { DataContextProvider } from "./context/DataContextProvider";

import "./App.css";
import DetailsPage from "./components/Home/DetailsPage/DetailsPage";

function App() {
  return (
    <div className="App">
      <DataContextProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:symb" element={<DetailsPage />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </DataContextProvider>
    </div>
  );
}

export default App;
