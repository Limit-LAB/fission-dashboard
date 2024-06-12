/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HTTPOptions } from './HTTPOptions';
import type { MqOptions } from './MqOptions';
export type CreateTriggerDto = {
    /**
     * The type of the trigger
     */
    type: CreateTriggerDto.type;
    /**
     * The name of the trigger
     */
    name: string;
    /**
     * The http options of the trigger
     */
    http?: HTTPOptions;
    /**
     * The name of the function
     */
    function: string;
    /**
     * The schedule of the trigger
     */
    schedule?: string;
    /**
     * The mq options of the trigger
     */
    mq?: MqOptions;
};
export namespace CreateTriggerDto {
    /**
     * The type of the trigger
     */
    export enum type {
        HTTPTRIGGER = 'httptrigger',
        MESSAGEQUEUETRIGGER = 'messagequeuetrigger',
        TIMETRIGGER = 'timetrigger',
    }
}

