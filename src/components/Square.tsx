import stylesBoard from "../styles/Board.module.css";
import { Move } from "../types/types";

type Props = {
  row: number;
  col: number;
  saveMove: (move: Move) => void;
  value: string;
  isListView: boolean;
};

function Square({ row, col, saveMove, value, isListView }: Props) {
  const handleClick = () => {
    const moveObj = {
      row: row,
      col: col,
    };
    saveMove(moveObj);
  };

  return (
    <button onClick={handleClick} className={`${value === 'X' ? stylesBoard.x : stylesBoard.o} ${stylesBoard.square}`}  disabled={value !== "" || isListView}>
      {value}
    </button>
  );
}

export default Square;
