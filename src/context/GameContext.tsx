import React, { createContext, useContext, useEffect, useState } from "react";
import { Game, Move } from "../types/types";
import useCreateGame from "../hooks/usePostGame";

type Props = {
  children: React.ReactNode;
};

type GameContextProps = {
  moves: Move[];
  createNewGame: () => void;
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
  const [moves, setMoves] = useState([]);
  const { createGame, isLoading, isError } = useCreateGame(sessionStorage.getItem("token") ?? "");

  const createNewGame = async() => {
    try {
      await createGame();
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      console.log("Creating game...");
    }

    if (isError) {
      console.error("Error creating game");
    }
  }, [isLoading, isError]);


  return (
    <GameContext.Provider value={{ moves, createNewGame }}>
      {children}
    </GameContext.Provider>
  );
};
