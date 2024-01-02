import {
  deleteAllPlayers,
  getAllPlayers,
  getPlayerById,
  saveAllPlayers,
} from '#/controllers/player_controller';
import { Router } from 'express';

const playerRouter = Router();

playerRouter.post('/', saveAllPlayers);
playerRouter.delete('/', deleteAllPlayers);
playerRouter.get('/', getAllPlayers);
playerRouter.get('/:playerId', getPlayerById);

export default playerRouter;
