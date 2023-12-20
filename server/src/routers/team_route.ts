import { saveAllTeams } from '#/controllers/team_controller';
import { Router } from 'express';

const teamRouter = Router();

teamRouter.post('/', saveAllTeams);
// teamRouter.get('/all', getAllTeams);
// teamRouter.get('/:teamId', getTeamById);

export default teamRouter;
