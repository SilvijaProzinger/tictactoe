import stylesBoard from "../styles/Board.module.css";
import { Move } from "../types/types";

type Props = {
  row: number;
  col: number;
  saveMove: (move: Move) => void;
};

function Square({ row, col, saveMove }: Props) {
  const handleClick = () => {
    const moveObj = {
      row: row,
      col: col,
    };
    saveMove(moveObj);
  };

  return (
    <button className={stylesBoard.square} onClick={handleClick}>
      {row}
      {col}
    </button>
  );
}

export default Square;
