import Team from '#/models/team_model';
import { getTeams } from '#/util/rapid_api_queries';
import { RequestHandler } from 'express';

export const saveAllTeams: RequestHandler = async (req, res) => {
  const count = await Team.countDocuments();

  if (count > 0)
    return res.status(422).json({ error: 'Teams already populated.' });

  let teams = await getTeams();
  if (!teams) return res.status(422).json({ error: 'Request failed.' });

  teams.data.sports[0].leagues[0].teams.forEach((t: any) => {
    const team = {
      teamId: t.team.id,
      name: t.team.displayName,
      abbreviation: t.team.abbreviation,
      color: t.team.color,
      altColor: t.team.alternativeColor,
      logos: t.team.logos.map((logo: any) => {
        return {
          href: logo.href,
          width: logo.width,
          height: logo.height,
        };
      }),
    };
    Team.create(team);
  });
  res.status(201).json({ message: 'Teams successfully added.' });
};

export const removeAllTeams: RequestHandler = async (req, res) => {
  const count = await Team.countDocuments();
  if (count === 0)
    return res.status(422).json({ error: 'Teams already removed.' });

  try {
    await Team.deleteMany();
    res.status(201).json({ message: 'All teams removed.' });
  } catch (error) {
    res.status(422).json({ error: 'Could not remove teams.' });
  }
};
