/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePackageDto } from '../models/CreatePackageDto';
import type { PackageDto } from '../models/PackageDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PackageService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param requestBody
     * @returns any The package has been successfully created.
     * @throws ApiError
     */
    public packageControllerCreate(
        requestBody: CreatePackageDto,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/package',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns PackageDto The list of all packages.
     * @throws ApiError
     */
    public packageControllerFindAll(): CancelablePromise<Array<PackageDto>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/package',
        });
    }
    /**
     * @param name
     * @returns PackageDto The package with the specified name.
     * @throws ApiError
     */
    public packageControllerFindOne(
        name: string,
    ): CancelablePromise<PackageDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/package/{name}',
            path: {
                'name': name,
            },
        });
    }
    /**
     * @param name
     * @returns any The package has been successfully removed.
     * @throws ApiError
     */
    public packageControllerRemove(
        name: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/package/{name}',
            path: {
                'name': name,
            },
        });
    }
}
