import React, { createContext, useContext, useEffect, useState } from "react";
import { Move } from "../types/types";
import useCreateGame from "../hooks/useCreateGame";
import usePostMoves from "../hooks/usePostMoves";

type Props = {
  children: React.ReactNode;
};

type GameContextProps = {
  moves: Move[];
  createNewGame: () => void;
  saveMoveToContext: (move: Move) => void;
};

export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);

export const useGame = (): GameContextProps => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const GameProvider = ({ children }: Props) => {
  const [moves, setMoves] = useState<Move[]>([]);
  const { createGame, isLoading, isError } = useCreateGame(
    sessionStorage.getItem("token") ?? ""
  );
  const { postMoves } = usePostMoves(
    sessionStorage.getItem("token") ?? "", 420 //to fetch id dynamically later
  );

  const createNewGame = async () => {
    try {
      await createGame();
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const saveMoveToContext = (move: Move) => {
    setMoves((prevMoves) => [...prevMoves, move]);
  };

  useEffect(() => {
    const createNewMove = async () => {
      try {
        await postMoves(moves[length - 1], );
      } catch (error) {
        console.error("Error posting a move:", error);
      }
    };

    if (moves) createNewMove();
  }, [moves, postMoves]);

  return (
    <GameContext.Provider
      value={{ moves, createNewGame, saveMoveToContext }}
    >
      {children}
    </GameContext.Provider>
  );
};
