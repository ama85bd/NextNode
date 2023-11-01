import { Express, Response, Request } from 'express';

function blogRoutes(app: Express) {
  /**
   * @openapi
   * /blog:
   *  get:
   *   tags:
   *   - Blog
   *   summary: For checking app
   *   description: Responds of the app is up and running
   *   responses:
   *     200:
   *      description: App is up and running
   */
  app.get('/blog', (req: Request, res: Response) => res.sendStatus(200));
}

export default blogRoutes;
