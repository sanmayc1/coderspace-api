import { UsecaseRegistery } from './usecase-registry';
import { RepositoryRegistery } from './repository-registry';
import { ServiceRegistry } from './service-registry';

export class DependencyInjection {
  static registerAll() {
    UsecaseRegistery.registerUsecase();
    RepositoryRegistery.registerRepository();
    ServiceRegistry.registerServices();
  }
}
