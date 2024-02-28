import Game from "./Game";
import useFetchGames from "../hooks/useFetchGames";
import { useAuth } from "../context/AuthContext";
import { useCallback, useEffect } from "react";
import Board from "./Board";

function GamesList() {
  const storedToken = sessionStorage.getItem("token") ?? "";
  const { data, error } = useFetchGames(storedToken);

  useEffect(() => {
    console.log(data);

    if (error) {
      console.error('Error fetching games:', error);
    }
  }, [data, error]);


  return (
    <>
    {data?.map((game) => {
      return <Board board={game.board} first={game.first_player?.id || null} second={game.second_player?.id || null}/>
    })}
    </>
  );
}

export default GamesList;
