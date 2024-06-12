import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { KubernetesService } from '../kubernetes/kubernetes.service';
import { IPackage } from '@kubernetes-models/fission/fission.io/v1';
import { PackageDto } from './dto/package.dto';

@Injectable()
export class PackageService {
  constructor(private readonly kubernetes: KubernetesService) {}

  async create(createPackageDto: CreatePackageDto) {
    return await this.kubernetes.crd.createNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'packages',
      {
        apiVersion: 'fission.io/v1',
        kind: 'Package',
        metadata: {
          name: createPackageDto.name,
        },
        spec: {
          environment: {
            name: createPackageDto.environment,
          },
          source: {
            type: 'url',
            url: createPackageDto.codeUrl,
          },
        },
      } as IPackage,
    );
  }

  async findAll() {
    const res = await this.kubernetes.crd.listNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'packages',
    );
    const data = res.body as { items: IPackage[] };
    return data.items.map((item) => ({
      name: item.metadata.name,
      environment: item.spec.environment.name,
      codeUrl: item.spec.source.url,
    })) as PackageDto[];
  }

  async findOne(name: string) {
    const res = await this.kubernetes.crd.getNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'packages',
      name,
    );
    const data = res.body as IPackage;
    return {
      name: data.metadata.name,
      environment: data.spec.environment.name,
      codeUrl: data.spec.source.url,
    } as PackageDto;
  }

  async remove(name: string) {
    await this.kubernetes.crd.deleteNamespacedCustomObject(
      'fission.io',
      'v1',
      'default',
      'packages',
      name,
    );
  }
}
