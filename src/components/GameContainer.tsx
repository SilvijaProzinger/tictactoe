import Header from "./Header";
import GamesList from "./GamesList";
import { useState } from "react";
import stylesButton from "../styles/Buttons.module.css";
import Game from "./Game";

function GameContainer() {
  const [openNewGame, setOpenNewGame] = useState(false);

  const handleStartNewGame = () => {
    setOpenNewGame(true);
  };

  const handleExitGame = () => {
    setOpenNewGame(false);
  };

  return (
    <>
      <Header />
      <h2>List of games</h2>
      <GamesList />
      {openNewGame && <Game handleExitGame={handleExitGame} />}
      {!openNewGame && (
        <button className={stylesButton.primary} onClick={handleStartNewGame}>
          Start a new game
        </button>
      )}
    </>
  );
}

export default GameContainer;
