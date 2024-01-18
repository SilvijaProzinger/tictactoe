import stylesGameStatus from '../styles/GameStatus.module.css'

type Props = {
  currentlyPlaying: string;
  winner: boolean;
};

function GameStatus({ currentlyPlaying, winner }: Props) {
  return (
    <div className={stylesGameStatus.status__container}>
      {winner ? (
        <p>Congratulations {winner}, you've won!</p>
      ) : (
        <p>{currentlyPlaying} is currently playing</p>
      )}
    </div>
  );
}

export default GameStatus;
