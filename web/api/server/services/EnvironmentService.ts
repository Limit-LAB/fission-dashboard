/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEnvironmentDto } from '../models/CreateEnvironmentDto';
import type { EnvironmentDto } from '../models/EnvironmentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class EnvironmentService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param requestBody
     * @returns any The environment has been successfully created.
     * @throws ApiError
     */
    public environmentControllerCreate(
        requestBody: CreateEnvironmentDto,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/environment',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns EnvironmentDto The list of all environments.
     * @throws ApiError
     */
    public environmentControllerFindAll(): CancelablePromise<Array<EnvironmentDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/environment',
        });
    }
    /**
     * @param name
     * @returns EnvironmentDto The environment with the specified name.
     * @throws ApiError
     */
    public environmentControllerFindOne(
        name: string,
    ): CancelablePromise<EnvironmentDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/environment/{name}',
            path: {
                'name': name,
            },
        });
    }
    /**
     * @param name
     * @returns any The environment has been successfully removed.
     * @throws ApiError
     */
    public environmentControllerRemove(
        name: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/environment/{name}',
            path: {
                'name': name,
            },
        });
    }
}
