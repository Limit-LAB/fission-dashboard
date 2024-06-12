import { Injectable } from '@nestjs/common';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { KubernetesService } from '../kubernetes/kubernetes.service';
import { EnvironmentDto } from './dto/environment.dto';
import { IEnvironment } from '@kubernetes-models/fission/fission.io/v1';

@Injectable()
export class EnvironmentService {
  constructor(private readonly kubernetes: KubernetesService) {}

  async create(createEnvironmentDto: CreateEnvironmentDto) {
    await this.kubernetes.crd.createNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'environments',
      {
        apiVersion: 'fission.io/v1',
        kind: 'Environment',
        metadata: {
          creationTimestamp: null,
          name: createEnvironmentDto.name,
        },
        spec: {
          builder: {
            command: 'build',
            image: createEnvironmentDto.builder,
          },
          keeparchive: false,
          poolsize: 3,
          runtime: {
            image: createEnvironmentDto.image,
          },
          version: 1,
        },
      } as IEnvironment,
    );
  }

  async findAll() {
    const res = await this.kubernetes.crd.listNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'environments',
    );
    const data = res.body as {
      items: IEnvironment[];
    };
    return data.items.map((item) => {
      return {
        name: item.metadata.name,
        image: item.spec.runtime.image,
        builder: item.spec.builder.image,
      };
    }) as EnvironmentDto[];
  }

  async findOne(name: string) {
    const res = await this.kubernetes.crd.getNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'environments',
      name,
    );
    const data = res.body as IEnvironment;
    return {
      name: data.metadata.name,
      image: data.spec.runtime.image,
      builder: data.spec.builder.image,
    } as EnvironmentDto;
  }

  async remove(name: string) {
    await this.kubernetes.crd.deleteNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'environments',
      name,
    );
  }
}
