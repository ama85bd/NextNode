import { Express, Response, Request } from 'express';
import { requireUser } from '../middleware/requireUser';
import validate from '../middleware/validateResource';
import { createUserSchema, getUserSchema } from '../schema/user.schema';
import {
  createUserHandler,
  getUserHandler,
} from '../controller/user.controller';

function userRoutes(app: Express) {
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
}

export default userRoutes;
