import { Move } from "../types/types";

type Props = {
  moves: Move[];
  user: string;
};

function MovesDisplay({ moves, user }: Props) {
  return (
    <>
      <p>
        {user} selected
        {moves.map((move) => {
          return (
            <span>
              row {move.row}, column {move.col}
            </span>
          );
        })}
      </p>
    </>
  );
}

export default MovesDisplay;
