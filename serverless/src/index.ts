import { UnobjectFactory } from '@/utils/factories/unobject.factory';
import { ApiModule } from '@/api.module';

import 'module-alias/register';

// Configuração base da api
const initialize = async () => {
  const factory = new UnobjectFactory();
  const server = factory.create(ApiModule);

  const { url } = await server.start({ listen: { port: 4000 } });

  console.log(`🚀 Server ready at: ${url}`);
};

initialize();
