import { App } from '@/app';
import { MainRoute } from './routes/main.route';

const app = new App([new MainRoute()]);

app.listen();
