import axios, { AxiosResponse } from 'axios';

const RAPID_API_KEY = process.env.RAPID_API_KEY;

export const getTeams = async (): Promise<AxiosResponse<any> | null> => {
  const options = {
    method: 'GET',
    url: 'https://nhl-api5.p.rapidapi.com/nhlteamlist',
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': 'nhl-api5.p.rapidapi.com',
    },
  };

  try {
    return await axios.request(options);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getPlayers = async (teamId: string) => {
  const axios = require('axios');

  const options = {
    method: 'GET',
    url: 'https://nhl-api5.p.rapidapi.com/nhlteamplayers',
    params: { teamid: teamId },
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': 'nhl-api5.p.rapidapi.com',
    },
  };

  try {
    let players = await axios.request(options);
    players = players?.data.team.athletes;
    console.log(players);
    return players;
  } catch (error) {
    console.error(error);
    return null;
  }
};
