import stylesBoard from "../styles/Board.module.css";
import { Move } from "../types/types";

type Props = {
  row: number;
  col: number;
  saveMove: (move: Move) => void;
  value: string;
};

function Square({ row, col, saveMove, value }: Props) {
  const handleClick = () => {
    const moveObj = {
      row: row,
      col: col,
    };
    saveMove(moveObj);
  };

  return (
    <button onClick={handleClick} className={`${value === 'X' ? stylesBoard.x : stylesBoard.o} ${stylesBoard.square}`}>
      {value}
    </button>
  );
}

export default Square;
