export type User = {
  username: string;
  password: string | number;
};

export type Register = (userData: User) => void;
export type Login = (userData: User) => void;
export type Logout = () => void;

export type Move = {
  row: number;
  col: number;
}

export type Squares = {
  row: number;
  col: number;
  value: string;
}

export type ComboDirection = {
  row: number;
  col: number;
};

export type Combos = {
  across: ComboDirection[][];
  down: ComboDirection[][];
  diagonal: ComboDirection[][];
};

export type Player = {
  id: number;
  username: string;
}

export type Game = {
  id: number;
  board?: [ number[] ];
  winner?: Player;
  first_player: Player;
  second_player: Player;
  created?: string;
  status: string;
}

