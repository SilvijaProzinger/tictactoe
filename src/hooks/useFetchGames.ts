import { useQuery } from 'react-query';

const fetchGames = async (token: string) => {
  const response = await fetch('/api/games/', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  console.log(response)

  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }

  const data = await response.json();
  console.log(data)
  return data.results; 
};

const useFetchGames = (token: string) => {
  return useQuery('games', () => fetchGames(token), {
    enabled: false
  });
};

export default useFetchGames;
