import { Injectable } from '@nestjs/common';
import { CreateTriggerDto } from './dto/create-trigger.dto';
import { KubernetesService } from '../kubernetes/kubernetes.service';
import {
  IHTTPTrigger,
  IMessageQueueTrigger,
  ITimeTrigger,
} from '@kubernetes-models/fission/fission.io/v1';
import { TriggerDto } from './dto/trigger.dto';
import { match, P } from 'ts-pattern';

@Injectable()
export class TriggerService {
  constructor(private readonly kubernetes: KubernetesService) {}

  async createHttpTrigger(createTriggerDto: CreateTriggerDto) {
    return await this.kubernetes.crd.createNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'httptriggers',
      {
        apiVersion: 'fission.io/v1',
        kind: 'HTTPTrigger',
        metadata: {
          name: createTriggerDto.name,
        },
        spec: {
          createingress: false,
          functionref: {
            name: createTriggerDto.function,
            type: 'name',
          },
          ingressconfig: {
            host: '*',
            path: createTriggerDto.http.endpoint,
          },
          methods: [createTriggerDto.http.method],
          relativeurl: createTriggerDto.http.endpoint,
        },
      } as IHTTPTrigger,
    );
  }

  async createMessageQueueTrigger(createTriggerDto: CreateTriggerDto) {
    return await this.kubernetes.crd.createNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'messagequeuetriggers',
      {
        apiVersion: 'fission.io/v1',
        kind: 'MessageQueueTrigger',
        metadata: {
          name: createTriggerDto.name,
        },
        spec: {
          contentType: 'application/json',
          cooldownPeriod: createTriggerDto.mq.coldDownPeriod,
          errorTopic: createTriggerDto.mq.errorTopic,
          functionref: {
            name: createTriggerDto.function,
            type: 'name',
          },
          maxReplicaCount: 100,
          maxRetries: createTriggerDto.mq.maxRetry,
          messageQueueType: createTriggerDto.mq.type,
          metadata: {
            bootstrapServers: createTriggerDto.mq.bootstrapServer,
            cosumerGroup: createTriggerDto.mq.groupId,
            topic: createTriggerDto.mq.requestTopic,
          },
          minReplicaCount: 0,
          mqtkind: createTriggerDto.mq.kind,
          pollingInterval: createTriggerDto.mq.pollingInterval,
          secret: createTriggerDto.mq.secret,
          topic: createTriggerDto.mq.requestTopic,
        },
      } as IMessageQueueTrigger,
    );
  }

  async createTimeTrigger(createTriggerDto: CreateTriggerDto) {
    await this.kubernetes.crd.createNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'timetriggers',
      {
        apiVersion: 'fission.io/v1',
        kind: 'TimeTrigger',
        metadata: {
          name: createTriggerDto.name,
        },
        spec: {
          functionref: {
            name: createTriggerDto.function,
            type: 'name',
          },
          cron: createTriggerDto.schedule,
        },
      } as ITimeTrigger,
    );
  }

  async create(createTriggerDto: CreateTriggerDto) {
    return await match(createTriggerDto)
      .with({ type: 'httptrigger', http: P.nonNullable }, () =>
        this.createHttpTrigger(createTriggerDto),
      )
      .with({ type: 'messagequeuetrigger', mq: P.nonNullable }, () =>
        this.createMessageQueueTrigger(createTriggerDto),
      )
      .with({ type: 'timetrigger', schedule: P.nonNullable }, () =>
        this.createTimeTrigger(createTriggerDto),
      )
      .otherwise(() => {
        throw new Error('Invalid trigger type');
      });
  }

  private async findAllTimeTriggers() {
    const res = await this.kubernetes.crd.listNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'timetriggers',
    );
    const data = res.body as {
      items: ITimeTrigger[];
    };
    return data.items.map((item) => {
      return {
        type: 'timetrigger' as const,
        name: item.metadata.name,
        schedule: item.spec.cron,
        function: item.spec.functionref.name,
      };
    });
  }

  private async findAllMessageQueueTriggers() {
    const res = await this.kubernetes.crd.listNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'messagequeuetriggers',
    );
    const data = res.body as {
      items: IMessageQueueTrigger[];
    };
    return data.items.map((item) => {
      return {
        type: 'messagequeuetrigger' as const,
        name: item.metadata.name,
        mq: {
          coldDownPeriod: item.spec.cooldownPeriod,
          errorTopic: item.spec.errorTopic,
          maxRetry: item.spec.maxRetries,
          type: item.spec.messageQueueType,
          kind: item.spec.mqtkind,
          requestTopic: item.spec.topic,
          bootstrapServer: item.spec.metadata.bootstrapServers,
          groupId: item.spec.metadata.cosumerGroup,
          pollingInterval: item.spec.pollingInterval,
          secret: item.spec.secret,
        },
        function: item.spec.functionref.name,
      };
    });
  }

  private async findAllHTTPTriggers() {
    const res = await this.kubernetes.crd.listNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'httptriggers',
    );
    const data = res.body as {
      items: IHTTPTrigger[];
    };
    return data.items.map((item) => {
      return {
        type: 'httptrigger' as const,
        name: item.metadata.name,
        function: item.spec.functionref.name,
        http: {
          method: item.spec.methods[0],
          endpoint: item.spec.relativeurl,
        },
      } as TriggerDto;
    });
  }

  async findAll() {
    const all = await Promise.all([
      this.findAllTimeTriggers(),
      this.findAllMessageQueueTriggers(),
      this.findAllHTTPTriggers(),
    ]);
    return all.flat() as TriggerDto[];
  }

  async findOne(name: string) {
    const all = await this.findAll();
    const res = all.find((item) => {
      return item.name === name;
    });
    if (!res) throw new Error('Trigger not found');
    return res;
  }

  async remove(name: string) {
    console.log(name);
    const item = await this.findOne(name);
    switch (item.type) {
      case 'httptrigger': {
        await this.kubernetes.crd.deleteNamespacedCustomObject(
          'fission.io',
          'v1',
          'default',
          'httptriggers',
          name,
        );
        break;
      }
      case 'messagequeuetrigger': {
        await this.kubernetes.crd.deleteNamespacedCustomObject(
          'fission.io',
          'v1',
          'default',
          'messagequeuetriggers',
          name,
        );
        break;
      }
      case 'timetrigger': {
        await this.kubernetes.crd.deleteNamespacedCustomObject(
          'fission.io',
          'v1',
          'default',
          'timetriggers',
          name,
        );
        break;
      }
    }
  }
}
