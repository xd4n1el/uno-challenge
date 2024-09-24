import { ModuleFactory } from '@/utils/factories/module.factory';
import { TodoService } from './services/todo/todo.service';

export class ApiModule extends ModuleFactory {
  constructor() {
    const services = [TodoService];

    super(...services);
  }
}
