import "./App.css";
import WelcomeScreen from "./components/WelcomeScreen";
import GameContainer from "./components/GameContainer";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import { GameProvider } from "./context/gameContext";

function App() {
  const { isTokenSet, user } = useAuth()

  return <>{ isTokenSet || user ? <GameProvider><GameContainer /> </GameProvider>: <WelcomeScreen /> }</>;
}

export default App;
