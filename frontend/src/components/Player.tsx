import { useEffect, useState } from 'react';
import { fetchData } from './helpers/fetchData';
import { PlayerType } from '../@types/player';
import { inchesToFeet } from './helpers/inchesToFeet';

type Props = {
  id: string;
};

export const Player = ({ id }: Props) => {
  const [player, setPlayer] = useState<PlayerType | null>(null);

  useEffect(() => {
    (async () => {
      const data = await fetchData<PlayerType>(`/player/${id}`);
      setPlayer(data);
    })();
  }, [id]);

  return player ? (
    <div className="flex flex-col items-center border border-r-2 border-b-4 border-black p-4 m-4">
      <div className="flex">
        <span className="font-bold text-lg text-gray-800">
          {player.firstName}
        </span>
        <span className="font-bold text-xl text-gray-900">
          &nbsp;{player.lastName.toUpperCase()}
        </span>
      </div>
      <div className="w-1/2 border-y-2 border-gray-600"></div>
      <img
        src={player.headshot ?? null}
        className="justify-start w-[20%] h-[20%]"
      />
      <p>{player.active ? 'Active' : 'Inactive'}</p>
      <p>Age: {player.age}</p>
      {player.birthPlace?.city && (
        <div>
          <span>{player.birthPlace.city + ', '}</span>
          <span>
            {player.birthPlace.state ? player.birthPlace.state + ', ' : ''}
          </span>
          <span>{player.birthPlace.country}</span>
        </div>
      )}
      {player.draft?.year && (
        <div>
          <span>Draft Year: {player.draft.year} | </span>
          <span>Round: {player.draft.round} | </span>
          <span>Pick: {player.draft.selection}</span>
        </div>
      )}
      <p>NHL Experience: {player.experience} years</p>
      <p>Height: {inchesToFeet(player.height)}</p>
      <p>Weight: {player.weight} lbs</p>
      <p>Jersey: #{player.jerseyNumber}</p>
      {player.position?.name && (
        <div>
          <span>Position: {player.position.name} | </span>
          <span>{player.position.abbreviation}</span>
        </div>
      )}
    </div>
  ) : (
    <div>Loading...</div>
  );
};
