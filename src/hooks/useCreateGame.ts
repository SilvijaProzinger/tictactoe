import { useMutation } from 'react-query';

const apiUrl = import.meta.env.VITE_API;

const useCreateGame = (token: string) => {
  const createGame = async () => {
    const response = await fetch(`${apiUrl}games/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create game');
    }
    console.log(response)

    return response.json();
  };

  const { mutate, isLoading, isError } = useMutation(createGame);

  return {
    createGame: mutate,
    isLoading,
    isError,
  };
};

export default useCreateGame;
