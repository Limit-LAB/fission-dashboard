import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

type TriggerType = 'httptrigger' | 'timetrigger' | 'messagequeuetrigger';
// | 'k8s-webhook';

export class MqOptions {
  @ApiProperty({
    description: 'The type of the message queue',
    example: 'kafka',
    enum: ['kafka', 'nats', 'rabbitmq', 'redis'] as string[],
  })
  type: 'kafka';

  @ApiProperty({
    description: 'The kind of the message queue',
    example: 'keda',
    enum: ['keda', 'knative'] as string[],
  })
  kind: 'keda';

  @ApiProperty({
    description: 'The topic of the message queue',
    example: 'topic1',
  })
  requestTopic: string;

  @ApiProperty({
    description: 'The response topic of the message queue',
    example: 'response-topic1',
  })
  responseTopic: string;

  @ApiProperty({
    description: 'The error topic of the message queue',
    example: 'error-topic1',
  })
  errorTopic: string;

  @ApiProperty({
    description: 'The maxretry of the message queue',
    example: 3,
  })
  maxRetry: number;

  @ApiProperty({
    description: 'The boostrap server of the message queue',
    example: 'localhost:9092',
  })
  bootstrapServer: string;

  @ApiProperty({
    description: 'The group id of the message queue',
    example: 'group1',
  })
  groupId: string;

  @ApiProperty({
    description: 'The cold down period of the message queue',
    example: 30,
  })
  coldDownPeriod: number;

  @ApiProperty({
    description: 'The polling interval of the message queue',
    example: 5,
  })
  pollingInterval: number;

  @ApiProperty({
    description: 'The secret of the message queue',
    example: 'secret1',
  })
  secret: string;
}

export class HTTPOptions {
  @ApiProperty({
    description: 'The method of the http trigger',
    example: 'GET',
    enum: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
      'OPTIONS',
      'HEAD',
      'CONNECT',
      'TRACE',
    ] as string[],
  })
  method: string;

  @ApiProperty({
    description: 'The endpoint of the http trigger',
    example: '/hello',
  })
  endpoint: string;
}

export class TriggerDto {
  @ApiProperty({
    description: 'The type of the trigger',
    example: 'httptrigger',
    enum: [
      'httptrigger',
      'messagequeuetrigger',
      'timetrigger',
    ] as TriggerType[],
  })
  type: TriggerType;

  @ApiProperty({
    description: 'The name of the trigger',
    example: 'http-trigger',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'The http options of the trigger',
    type: HTTPOptions,
  })
  http?: HTTPOptions;

  @ApiProperty({
    description: 'The name of the function',
    example: 'hello',
  })
  function: string;

  @ApiPropertyOptional({
    description: 'The schedule of the trigger',
    example: '0 * * * *',
  })
  schedule?: string;

  @ApiPropertyOptional({
    description: 'The mq options of the trigger',
    type: MqOptions,
  })
  mq?: MqOptions;
}
