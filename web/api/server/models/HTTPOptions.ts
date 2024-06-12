/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type HTTPOptions = {
    /**
     * The method of the http trigger
     */
    method: HTTPOptions.method;
    /**
     * The endpoint of the http trigger
     */
    endpoint: string;
};
export namespace HTTPOptions {
    /**
     * The method of the http trigger
     */
    export enum method {
        GET = 'GET',
        POST = 'POST',
        PUT = 'PUT',
        DELETE = 'DELETE',
        PATCH = 'PATCH',
        OPTIONS = 'OPTIONS',
        HEAD = 'HEAD',
        CONNECT = 'CONNECT',
        TRACE = 'TRACE',
    }
}

