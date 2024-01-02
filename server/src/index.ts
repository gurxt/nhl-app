import express from 'express';
import 'dotenv/config';
import '#/db';
import teamRouter from './routers/team_route';
import playerRouter from './routers/player_route';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/team', teamRouter);
app.use('/player', playerRouter);

app.listen(PORT, () => {
  console.log('Server is listening on port ' + PORT);
});
