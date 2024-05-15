import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { MainRoute } from './routes/main.route';
import { ReleaseRoute } from './routes/release.route';
import { HelpRoute } from './routes/help.route';
import { TranslationRoute } from './routes/translation.route';

ValidateEnv();

const app = new App([
  //
  new TranslationRoute(),
  new HelpRoute(),
  new AuthRoute(),
  new UserRoute(),
  new MainRoute(),
  new ReleaseRoute(),
]);

app.listen();
