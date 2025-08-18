import { ControllerRegistery } from "./controller-registry.js";
import { UsecaseRegistery } from "./usecase-registry.js";


export class DependencyInjection{
    static registerAll(){
      ControllerRegistery.registerControllers()
      UsecaseRegistery.registerUsecase()
    }
} 