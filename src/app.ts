import express, { Application } from 'express';
import swagerUi from 'swagger-ui-express';
import { AuthRoutes, TaskRoutes, UserRouter } from './infra/routes';
import * as swaggerDocument from './swagger.json';
import cors from 'cors';
class App {
  public httpServer: Application;
  private authRoutes = new AuthRoutes();
  private userRoutes = new UserRouter();
  private taskRoutes = new TaskRoutes();

  constructor() {
    this.httpServer = express();
    this.httpServer.use(
      cors({
        origin: 'https://project-blitzcareer.vercel.app/',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
      }),
    );
    this.httpServer.use(express.json());
    this.httpServer.use('/docs', swagerUi.serve, swagerUi.setup(swaggerDocument));
    this.routes();
  }

  private routes() {
    this.httpServer.get('/', (_req: any, res: any) => {
      res.send('Hello World');
    });

    this.httpServer.use(this.authRoutes.routes);
    this.httpServer.use(this.userRoutes.routes);
    this.httpServer.use(this.taskRoutes.routes);
  }
}

export default new App().httpServer;
