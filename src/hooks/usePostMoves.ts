import { useMutation } from 'react-query';
import { Move } from '../types/types';

const usePostMoves = (token: string, id: number) => {
  const postMoves = async (move: Move) => {
    const response = await fetch(`/api/games/${id}/move/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(move),
    });

    if (!response.ok) {
      throw new Error('Failed to create game');
    }
    console.log(response)

    return response.json();
  };

  const { mutate, isLoading, isError } = useMutation(postMoves);

  return {
    postMoves: mutate,
    isLoading,
    isError,
  };
};

export default usePostMoves;