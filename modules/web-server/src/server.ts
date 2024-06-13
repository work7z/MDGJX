import { App } from '@/app';
import { MainRoute } from './routes/main.route';
import { ExtensionRoute } from './routes/extension.route';

console.log('run server.js');

const app = new App([new MainRoute(), new ExtensionRoute()]);

app.listen();
