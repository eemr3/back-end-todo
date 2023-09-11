import 'dotenv/config';
import App from './app';

const port = parseInt(process.env.PORT || '3333');

App.listen(port, () => {
  console.log(`Server runing at http://localhost:${port}`);
});
