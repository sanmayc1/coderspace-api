"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyInjection = void 0;
const usecase_registry_1 = require("./usecase-registry");
const repository_registry_1 = require("./repository-registry");
const service_registry_1 = require("./service-registry");
class DependencyInjection {
    static registerAll() {
        usecase_registry_1.UsecaseRegistery.registerUsecase();
        repository_registry_1.RepositoryRegistery.registerRepository();
        service_registry_1.ServiceRegistry.registerServices();
    }
}
exports.DependencyInjection = DependencyInjection;
//# sourceMappingURL=di-registry.js.map