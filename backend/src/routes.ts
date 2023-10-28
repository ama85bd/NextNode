import { Express, Response, Request } from 'express';
import {
  createUserHandler,
  getUserHandler,
} from './controller/user.controller';
import validate from './middleware/validateResource';
import { createUserSchema, getUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from './controller/session.controller';
import { requireUser } from './middleware/requireUser';

function routes(app: Express) {
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
   * '/api/users':
   *  post:
   *   tags:
   *   - User
   *   summary: Register a user
   *   requestBody:
   *    required: true
   *    content:
   *     application/json:
   *      schema:
   *       $ref: '#/components/schemas/CreateUserInput'
   *   responses:
   *    200:
   *     description: Success
   *     content:
   *      application/json:
   *       schema:
   *        $ref: '#/components/schemas/CreateUserResponse'
   *    409:
   *     description: Conflict
   *    400:
   *     description: Bad request
   */
  app.post('/api/users', validate(createUserSchema), createUserHandler);

  /**
   * @openapi
   * '/api/users/{userId}':
   *  get:
   *   tags:
   *   - User
   *   summary: Get user by Id
   *   parameters:
   *    - name: userId
   *      in: path
   *      description: The id of the User
   *      required: true
   *   responses:
   *    200:
   *     description: Success
   *     content:
   *      application/json:
   *       schema:
   *        $ref: '#/components/schemas/CreateUserResponse'
   *    400:
   *     description: User not found
   */
  app.get(
    '/api/users/:userId',
    [requireUser, validate(getUserSchema)],
    getUserHandler
  );

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

export default routes;
