import 'dotenv/config';
import App from './app';

const port = parseInt(process.env.PORT || '3333');

App.start(port);
