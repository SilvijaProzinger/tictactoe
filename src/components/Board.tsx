import { useState } from 'react'
import stylesBoard from "../styles/Board.module.css";
import Square from "./Square";
import { Move } from '../types/types';

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
  
    const saveMove = (move: Move) => {
      if (squares[move.row && move.col]) {
        return;
      }
      console.log(move)
    }

  return (
    <div>
      {[1,2,3].map((row) => {
        return (
          <div className={stylesBoard.board} key={row}>
            {[1,2,3].map((col) => {
              return <Square row={row} col={col} saveMove={saveMove}/>
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
