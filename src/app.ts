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
    this.config();
    this.httpServer.use('/docs', swagerUi.serve, swagerUi.setup(swaggerDocument));
    this.routes();
  }

  private config() {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    this.httpServer.use(accessControl);
    this.httpServer.use(express.json());
  }
  private routes() {
    this.httpServer.get('/', (_req: any, res: any) => {
      res.send('Hello World');
    });

    this.httpServer.use(this.authRoutes.routes);
    this.httpServer.use(this.userRoutes.routes);
    this.httpServer.use(this.taskRoutes.routes);
  }

  public start(PORT: number | string): void {
    this.httpServer.listen(PORT, () =>
      console.log('Server runing at http://localhost:' + PORT),
    );
  }
}

export default new App();
