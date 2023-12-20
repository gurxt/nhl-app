import {
  getAllTeams,
  getTeamById,
  removeAllTeams,
  saveAllTeams,
} from '#/controllers/team_controller';
import { Router } from 'express';

const teamRouter = Router();

teamRouter.post('/', saveAllTeams);
teamRouter.delete('/', removeAllTeams);
teamRouter.get('/', getAllTeams);
teamRouter.get('/:teamId', getTeamById);

export default teamRouter;
