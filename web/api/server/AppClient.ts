/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';
import { DefaultService } from './services/DefaultService';
import { EnvironmentService } from './services/EnvironmentService';
import { FunctionService } from './services/FunctionService';
import { PackageService } from './services/PackageService';
import { TriggerService } from './services/TriggerService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class AppClient {
    public readonly default: DefaultService;
    public readonly environment: EnvironmentService;
    public readonly function: FunctionService;
    public readonly package: PackageService;
    public readonly trigger: TriggerService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.default = new DefaultService(this.request);
        this.environment = new EnvironmentService(this.request);
        this.function = new FunctionService(this.request);
        this.package = new PackageService(this.request);
        this.trigger = new TriggerService(this.request);
    }
}

