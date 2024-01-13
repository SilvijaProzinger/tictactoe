export type User = {
  username: string;
  password: string | number;
};

export type Register = (userData: User) => void;
export type Login = (userData: User) => void;
export type Logout = () => void;
