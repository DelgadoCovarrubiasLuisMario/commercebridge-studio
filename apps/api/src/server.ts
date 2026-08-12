import { app } from './app.js';
import { sequelize } from './config/database.js';
import { env } from './config/env.js';
import './models/index.js';

async function bootstrap() {
  await sequelize.authenticate();
  await sequelize.sync();

  app.listen(env.PORT, () => {
    console.log(`CommerceBridge API running on http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error('Unable to start API', error);
  process.exit(1);
});
