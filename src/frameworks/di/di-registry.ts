import { UsecaseRegistery } from "./usecase-registry.js";
import { RepositoryRegistery } from "./repository-registry.js";
import { ServiceRegistry } from "./service-registry.js";

export class DependencyInjection {
  static registerAll() {
    UsecaseRegistery.registerUsecase();
    RepositoryRegistery.registerRepository();
    ServiceRegistry.registerServices()
  }
}
