import React, { useState } from "react";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";

function App() {
  const [currentUser, setcurrentUser] = useState({
    _id: "637860dd67506f50b6d02d92",
    followers: [],
    following: [],
    password: "1234",
    profilePicture: "assets/person/1.jpeg",
    userId: 1,
    username: "Safak Kocaoglu",
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home currentUser={currentUser} setcurrentUser={setcurrentUser}/>} />
        <Route path="/login" element={<Login currentUser={currentUser}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
