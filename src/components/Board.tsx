import { useEffect, useState, useMemo } from "react";
import stylesBoard from "../styles/Board.module.css";
import Square from "./Square";
import GameStatus from "./GameStatus";
import { Combos, Move, Squares } from "../types/types";
import { useGame } from "../context/GameContext";

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

function Board() {
  const { createNewGame } = useGame();
  const [squares, setSquares] = useState<Squares[]>(
    Array(9)
      .fill(null)
      .map((_, index) => {
        // calculate row and col based on the index
        const row = Math.floor(index / 3);
        const col = index % 3;
        return { row, col, value: "" };
      })
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
