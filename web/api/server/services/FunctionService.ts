/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFunctionDto } from '../models/CreateFunctionDto';
import type { FunctionDto } from '../models/FunctionDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FunctionService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param requestBody
     * @returns any The function has been successfully created.
     * @throws ApiError
     */
    public functionControllerCreate(
        requestBody: CreateFunctionDto,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/function',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns FunctionDto The list of all functions.
     * @throws ApiError
     */
    public functionControllerFindAll(): CancelablePromise<Array<FunctionDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/function',
        });
    }
    /**
     * @param name
     * @returns FunctionDto The function with the specified name.
     * @throws ApiError
     */
    public functionControllerFindOne(
        name: string,
    ): CancelablePromise<FunctionDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/function/{name}',
            path: {
                'name': name,
            },
        });
    }
    /**
     * @param name
     * @returns any The function has been successfully removed.
     * @throws ApiError
     */
    public functionControllerRemove(
        name: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/function/{name}',
            path: {
                'name': name,
            },
        });
    }
}
