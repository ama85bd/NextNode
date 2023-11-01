import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import connect from './utils/connect';
import logger from './utils/logger';
import { deserializeUser } from './middleware/deserializeUser';
import swaggerDocs from './utils/swagger';
import cors from 'cors';

//bring routes
import blogRoutes from './routes/blog';
import userRoutes from './routes/user';
import sessionRoutes from './routes/session';

const port = config.get<number>('port');
const app = express();

app.use(express.json());
app.use(deserializeUser);
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({ origin: [`${process.env.CLIENT_URL}`, 'http://localhost:1337'] })
  );
}
app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  // blog route
  blogRoutes(app);
  // user route
  userRoutes(app);
  // session route
  sessionRoutes(app);
  // swagger docs
  swaggerDocs(app, port);
});
