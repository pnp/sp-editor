import { IController } from "./IController";
import { Configuration } from "../config/Configuration";
import { InitializeApplicationRequest } from "../request/InitializeApplicationRequest";
export declare function createV3Controller(config: Configuration, request?: InitializeApplicationRequest): Promise<IController>;
export declare function createController(config: Configuration): Promise<IController | null>;
//# sourceMappingURL=ControllerFactory.d.ts.map