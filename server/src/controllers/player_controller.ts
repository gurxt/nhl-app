import { RequestHandler } from 'express';
import Team from '#/models/team_model';
import { getPlayers } from '#/util/rapid_api_queries';
import Player, { PlayerDocument } from '#/models/player_model';

export const saveAllPlayers: RequestHandler = async (req, res) => {
  const teams = await Team.find();
  teams.forEach(async (team) => {
    const teamId = team.teamId;
    const players = await getPlayers(teamId);
    players?.forEach((p: any) => {
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
      Player.create(player);
    });
  });
  res.status(200).json({ message: 'passed' });
};
