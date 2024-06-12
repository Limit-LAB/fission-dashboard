import { Injectable } from '@nestjs/common';
import { CreateFunctionDto } from './dto/create-function.dto';
import { KubernetesService } from '../kubernetes/kubernetes.service';
import { IFunction } from '@kubernetes-models/fission/fission.io/v1';
import { FunctionDto } from './dto/function.dto';

@Injectable()
export class FunctionService {
  constructor(private readonly kubernetes: KubernetesService) {}

  async create(createFunctionDto: CreateFunctionDto) {
    return await this.kubernetes.crd.createNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'functions',
      {
        apiVersion: 'fission.io/v1',
        kind: 'Function',
        metadata: {
          name: createFunctionDto.name,
        },
        spec: {
          InvokeStrategy: {
            ExecutionStrategy: {
              ExecutorType: 'poolmgr',
              MaxScale: 0,
              MinScale: 0,
              SpecializationTimeout: 120,
              TargetCPUPercent: 0,
            },
            StrategyType: 'execution',
          },
          concurrency: 500,
          environment: {
            name: createFunctionDto.env,
            namespace: 'default',
          },
          functionTimeout: 60,
          idletimeout: 120,
          package: {
            functionName: createFunctionDto.entry,
            packageref: {
              name: createFunctionDto.pkg,
            },
          },
          requestsPerPod: 1,
        },
      } as IFunction,
    );
  }

  async findAll() {
    const res = await this.kubernetes.crd.listNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'functions',
    );
    const data = res.body as {
      items: IFunction[];
    };
    return data.items.map((item) => ({
      name: item.metadata.name,
      env: item.spec.environment.name,
      pkg: item.spec.package.packageref.name,
      entry: item.spec.package.functionName,
    })) as FunctionDto[];
  }

  async findOne(name: string) {
    const res = await this.kubernetes.crd.getNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'functions',
      name,
    );
    const data = res.body as IFunction;
    return {
      name: data.metadata.name,
      env: data.spec.environment.name,
      pkg: data.spec.package.packageref.name,
      entry: data.spec.package.functionName,
    } as FunctionDto;
  }

  async remove(name: string) {
    await this.kubernetes.crd.deleteNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'functions',
      name,
    );
  }
}
