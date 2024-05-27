import { App } from '@/app';
import { MainRoute } from './routes/main.route';

console.log('run server.js');

const app = new App([new MainRoute()]);

app.listen();
