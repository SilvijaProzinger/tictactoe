import "./App.css";
import WelcomeScreen from "./components/WelcomeScreen";
import GameContainer from "./components/GameContainer";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isTokenSet, user } = useAuth()

  return <>{ isTokenSet || user ? <GameContainer /> : <WelcomeScreen /> }</>;
}

export default App;
