import { useEffect, useState, useMemo } from "react";
import stylesBoard from "../styles/Board.module.css";
import Square from "./Square";
import GameStatus from "./GameStatus";
import { Combos, Move, Squares } from "../types/types";
import { useGame } from "../context/GameContext";

type Props = {
  board: any;
  first: string | null;
  second: string | null;
}

const combos = {
  across: [
    [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ],
    [
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
    ],
    [
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ],
  ],
  down: [
    [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ],
    [
      { row: 0, col: 1 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
    ],
    [
      { row: 0, col: 2 },
      { row: 1, col: 2 },
      { row: 2, col: 2 },
    ],
  ],
  diagonal: [
    [
      { row: 0, col: 0 },
      { row: 1, col: 1 },
      { row: 2, col: 2 },
    ],
    [
      { row: 0, col: 2 },
      { row: 1, col: 1 },
      { row: 2, col: 0 },
    ],
  ],
};

function Board({ board, first, second }: Props) {
  const { createNewGame, saveMoveToContext } = useGame();
  const [squares, setSquares] = useState<Squares[]>(() =>
  board
    ? board.flat().map((value, index) => ({
        row: Math.floor(index / 3),
        col: index % 3,
        value: value ? (value === first ? 'X' : 'O') : null
      }))
    : Array(9).fill(null).map((_, index) => ({
        row: Math.floor(index / 3),
        col: index % 3,
        value: null,
      }))
);
  const [isXNext, setIsNext] = useState(true);

  const saveMove = (move: Move) => {
    if (
      squares.some( 
        (square) =>
          square.row === move.row && square.col === move.col && square.value
      ) || winner
    ) {
      return; // if the square has already been clicked return
    }
    const newSquares = squares.map((square) => ({ ...square }));

    // find the index of the clicked square in the new array
    const index = newSquares.findIndex(
      (square) => square.row === move.row && square.col === move.col
    );

    if (index !== -1) {
      // update the new array's value property
      newSquares[index].value = isXNext ? "X" : "O";
      setSquares(newSquares);
      setIsNext(!isXNext);
      //save move to game's data context
      saveMoveToContext(move)
    }
  };

  const checkWinner = (squares: Squares[], combos: Combos) => {
    for (const direction in combos) {
      for (const combination of combos[direction]) {
        const values = combination.map(
          ({ row, col }) => squares[row * 3 + col]?.value
        );
        if (
          values.every((value: string) => value === "X") ||
          values.every((value: string) => value === "O")
        ) {
          console.log(values[0])
          return values[0]; // return the winner
        }
      }
    }
    return null; // if there is a tie return no winner
  };

  const winner = useMemo(() => {
    return checkWinner(squares, combos);
  }, [squares]);

  useEffect(() => { 
    // save new game to context
    createNewGame();
  },[])

  return (
    <>
    <div className={stylesBoard.board}>
      {squares.map((square) => (
        <Square
          key={`${square.row}-${square.col}`}
          row={square.row}
          col={square.col}
          saveMove={saveMove}
          value={square.value}
        />
      ))}
    </div>
    <GameStatus currentlyPlaying={isXNext ? 'X' : 'O'} winner={winner}/>
    </>
  );
}

export default Board;
