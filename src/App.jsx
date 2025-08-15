import { useState } from "react";
import { useAuth } from "./Authentication";
import "./App.css";
import SignIn from "./components/SignIn";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <h1 className="flex h-screen justify-center items-center text-xl">
        Carregando
      </h1>
    );
  }

  return (
    <div>
    <Routes>
      <Route path="/" element={currentUser ? <Home /> : <Navigate to='/login' />} />
      <Route path="/login" element={!currentUser ? <Login /> : <Navigate to='/' />} />
      <Route path="/register" element={!currentUser ? <Register />: <Navigate to='/' />} />
    </Routes>
    </div>
  );
}

export default App;
