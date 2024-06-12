/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTriggerDto } from '../models/CreateTriggerDto';
import type { TriggerDto } from '../models/TriggerDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class TriggerService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param requestBody
     * @returns any The trigger has been successfully created.
     * @throws ApiError
     */
    public triggerControllerCreate(
        requestBody: CreateTriggerDto,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/trigger',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns TriggerDto The list of all triggers.
     * @throws ApiError
     */
    public triggerControllerFindAll(): CancelablePromise<Array<TriggerDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/trigger',
        });
    }
    /**
     * @param name
     * @returns TriggerDto The trigger with the specified name.
     * @throws ApiError
     */
    public triggerControllerFindOne(
        name: string,
    ): CancelablePromise<TriggerDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/trigger/{name}',
            path: {
                'name': name,
            },
        });
    }
    /**
     * @param name
     * @returns any The trigger has been successfully removed.
     * @throws ApiError
     */
    public triggerControllerRemove(
        name: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/trigger/{name}',
            path: {
                'name': name,
            },
        });
    }
}
