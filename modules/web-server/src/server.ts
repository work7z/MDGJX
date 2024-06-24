import { App } from '@/app';
import { MainRoute } from './routes/main.route';
import { ExtensionRoute } from './routes/extension.route';
import { logger } from './utils/logger';
import { fn_runOrRestartExtViewAppServer } from './ext-view-app';
import { DevConfigRoute } from './routes/devconfig.route';

try {
  console.log('run server.js'); 

  const app = new App([new MainRoute(), new ExtensionRoute(),new DevConfigRoute()]);

  app.listen();

  // when the app is started, the ext-view server should be started as well
  fn_runOrRestartExtViewAppServer();
} catch (e) {
  console.log('error: ' + e);
  logger.error(e);
}
