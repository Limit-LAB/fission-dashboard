/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MqOptions = {
    /**
     * The type of the message queue
     */
    type: MqOptions.type;
    /**
     * The kind of the message queue
     */
    kind: MqOptions.kind;
    /**
     * The topic of the message queue
     */
    requestTopic: string;
    /**
     * The response topic of the message queue
     */
    responseTopic: string;
    /**
     * The error topic of the message queue
     */
    errorTopic: string;
    /**
     * The maxretry of the message queue
     */
    maxRetry: number;
    /**
     * The boostrap server of the message queue
     */
    bootstrapServer: string;
    /**
     * The group id of the message queue
     */
    groupId: string;
    /**
     * The cold down period of the message queue
     */
    coldDownPeriod: number;
    /**
     * The polling interval of the message queue
     */
    pollingInterval: number;
    /**
     * The secret of the message queue
     */
    secret: string;
};
export namespace MqOptions {
    /**
     * The type of the message queue
     */
    export enum type {
        KAFKA = 'kafka',
        NATS = 'nats',
        RABBITMQ = 'rabbitmq',
        REDIS = 'redis',
    }
    /**
     * The kind of the message queue
     */
    export enum kind {
        KEDA = 'keda',
        KNATIVE = 'knative',
    }
}

