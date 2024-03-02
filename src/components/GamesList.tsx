import Game from "./Game";
import useFetchGames from "../hooks/useFetchGames";
import { useEffect } from "react";
import Board from "./Board";
import styles from "../styles/GamesList.module.css";

function GamesList() {
  const storedToken = sessionStorage.getItem("token") ?? "";
  const { data, error } = useFetchGames(storedToken);

  useEffect(() => {
    console.log(data);

    if (error) {
      console.error("Error fetching games:", error);
    }
  }, [data, error]);

  return (
    <div className={styles.list__container}>
      {data?.map((game) => {
        return (
          <Board
            key={game.id}
            board={game.board}
            first={game.first_player?.id || null}
            second={game.second_player?.id || null}
            gameStatus={game.status}
            gameWinner={game.winner}
            gamePlayers={game.play}
            gameId={game.id}
            styles="list"
          />
        );
      })}
    </div>
  );
}

export default GamesList;
