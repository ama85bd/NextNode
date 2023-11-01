import { Express, Response, Request } from 'express';
import validate from '../middleware/validateResource';
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from '../controller/session.controller';
import { createSessionSchema } from '../schema/session.schema';
import { requireUser } from '../middleware/requireUser';

function sessionRoutes(app: Express) {
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *   tags:
   *   - Healthcheck
   *   summary: For checking app
   *   description: Responds of the app is up and running
   *   responses:
   *     200:
   *      description: App is up and running
   */
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  /**
   * @openapi
   * '/api/sessions':
   *  get:
   *   tags:
   *   - Session
   *   summary: Get all sessions
   *   responses:
   *    200:
   *     description: Get all sessions for current user
   *     content:
   *      application/json:
   *       schema:
   *        $ref: '#/components/schemas/GetSessionResponse'
   *    403:
   *     description: Forbidden
   *  post:
   *   tags:
   *   - Session
   *   summary: Create a session
   *   requestBody:
   *    required: true
   *    content:
   *     application/json:
   *      schema:
   *       $ref: '#/components/schemas/CreateSessionInput'
   *   responses:
   *    200:
   *     description: Session created
   *     content:
   *      application/json:
   *       schema:
   *        $ref: '#/components/schemas/CreateSessionResponse'
   *    401:
   *     description: Unauthorized
   *  delete:
   *   tags:
   *   - Session
   *   summary: Delete a session
   *   responses:
   *    200:
   *     description: Session deleted
   *    403:
   *     description: Forbidden
   */
  app.post(
    '/api/sessions',
    validate(createSessionSchema),
    createUserSessionHandler
  );
  app.get('/api/sessions', requireUser, getUserSessionHandler);
  app.delete('/api/sessions', requireUser, deleteSessionHandler);
}

export default sessionRoutes;
