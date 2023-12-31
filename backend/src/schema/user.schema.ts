import { TypeOf, object, string } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *   CreateUserInput:
 *    type: object
 *    required:
 *     - email
 *     - name
 *     - password
 *     - passwordConfirmation
 *    properties:
 *     email:
 *      type: string
 *      default: test@test.com
 *     name:
 *      type: string
 *      default: test
 *     password:
 *      type: string
 *      default: strongPassword
 *     passwordConfirmation:
 *      type: string
 *      default: strongPassword
 *   CreateUserResponse:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *     name:
 *      type: string
 *     _id:
 *      type: string
 *     createdAt:
 *      type: string
 *     updatedAt:
 *      type: string
 */

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    passwordConfirmation: string({
      required_error: 'Password Confirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Password do not match',
    path: ['passwordConfirmation'],
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;

const params = {
  params: object({
    userId: string({
      required_error: 'userId is required',
    }),
  }),
};

export const getUserSchema = object({
  ...params,
});

export type GetUserInput = TypeOf<typeof getUserSchema>;
