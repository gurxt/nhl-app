import { RequestHandler } from 'express';
import Team from '#/models/team_model';
import { getPlayers } from '#/util/rapid_api_queries';
import Player from '#/models/player_model';
import { paginationQuery } from '#/@types/misc_types';

export const saveAllPlayers: RequestHandler = async (req, res) => {
  const teams = await Team.find();
  if (teams.length === 0)
    return res.status(422).json({ error: 'Teams not populated.' });
  let players = await Player.find();
  if (players.length > 0)
    return res.status(422).json({ error: 'Players already populated.' });

  teams.forEach(async (team) => {
    const teamId = team.teamId;
    const players = await getPlayers(teamId);
    players?.forEach(async (p: any) => {
      const player = {
        teamId: teamId,
        firstName: p.firstName,
        lastName: p.lastName,
        shortName: p.shortName,
        weight: p.weight,
        height: p.height,
        age: p.age,
        birthPlace: {
          city: p.birthPlace?.city ?? '',
          state: p.birthPlace?.state ?? '',
          country: p.birthPlace?.country ?? '',
        },
        draft: {
          year: p.draft?.year ?? '',
          round: p.draft?.round ?? '',
          selection: p.draft?.selection ?? '',
        },
        headshot: p.headshot?.href ?? '',
        shoots: p.hand?.type ?? '',
        position: {
          name: p.position.name,
          abbreviation: p.position.abbreviation,
        },
        jerseyNumber: p.jersey,
        experience: p.experience.years,
        active: p.active,
      };
      try {
        const _player = await Player.create(player);
        console.log(_player._id);
        try {
          await Team.updateOne(
            { teamId: player.teamId },
            { $addToSet: { players: _player._id } }
          );
        } catch (error) {
          return res.status(404).json({ error: 'Team not found.' });
        }
      } catch (error) {
        return res.status(422).json({ error: 'Failed to create player.' });
      }
    });
  });

  res.status(200).json({ message: 'Successfully added players.' });
};

export const deleteAllPlayers: RequestHandler = async (req, res) => {
  const players = await Player.find();
  if (players.length === 0)
    return res.status(422).json({ error: 'No players to delete.' });
  await Player.deleteMany();
  res.status(201).json({ message: 'Successfully deeleted all players.' });
};

export const getAllPlayers: RequestHandler = async (req, res) => {
  const { limit = '20', pageNo = '0' } = req.query as paginationQuery;

  const players = await Player.find()
    .skip(parseInt(limit) * parseInt(pageNo))
    .limit(parseInt(limit))
    .sort('lastName');

  if (players.length === 0)
    return res.status(404).json({ error: 'No players found.' });

  res.status(201).json(players);
};

export const getPlayerById: RequestHandler = async (req, res) => {
  const { playerId } = req.params;
  const player = await Player.findById(playerId);
  if (!player) return res.status(404).json({ error: 'Failed to find player.' });
  res.status(201).json(player);
};
