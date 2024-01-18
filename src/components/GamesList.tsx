import Game from "./Game";
import useFetchGames from '../hooks/useFetchGames'
import { useAuth } from "../context/AuthContext";

function GamesList() {
  const storedToken = sessionStorage.getItem('token') ?? '';
  const { data } = useFetchGames(storedToken);

  return (
    <>
      <Game />
    </>
  );
}

export default GamesList;
