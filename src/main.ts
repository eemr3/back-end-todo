import 'dotenv/config';
import App from './app';
import cors from 'cors';

const port = parseInt(process.env.PORT || '3333');
App.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);
App.listen(port, () => {
  console.log(`Server runing at http://localhost:${port}`);
});
