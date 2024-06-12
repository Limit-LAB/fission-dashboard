import { Test, TestingModule } from '@nestjs/testing';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { KubernetesModule } from '../kubernetes/kubernetes.module';

describe('PackageController', () => {
  let controller: PackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageController],
      providers: [PackageService],
      imports: [KubernetesModule]
    }).compile();

    controller = module.get<PackageController>(PackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
