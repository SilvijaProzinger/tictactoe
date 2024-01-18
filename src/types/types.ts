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