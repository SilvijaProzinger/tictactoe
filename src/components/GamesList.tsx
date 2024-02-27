import Game from "./Game";
import useFetchGames from "../hooks/useFetchGames";
import { useAuth } from "../context/AuthContext";
import { useCallback, useEffect } from "react";

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
    </>
  );
}

export default GamesList;
