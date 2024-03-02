import Board from "./Board";
import stylesButton from "../styles/Buttons.module.css";

type Props = {
  handleExitGame: () => void;
};

function Game({ handleExitGame }: Props) {
  return (
    <>
      <Board styles="main"/>
      <button className={stylesButton.secondary} onClick={handleExitGame}>
        Exit game
      </button>
    </>
  );
}

export default Game;
