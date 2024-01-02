import { saveAllPlayers } from '#/controllers/player_controller';
import { Router } from 'express';

const playerRouter = Router();

playerRouter.post('/', saveAllPlayers);

export default playerRouter;
