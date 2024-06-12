import { Test, TestingModule } from '@nestjs/testing';
import { PackageService } from './package.service';
import { KubernetesModule } from '../kubernetes/kubernetes.module';

describe('PackageService', () => {
  let service: PackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageService],
      imports: [KubernetesModule]
    }).compile();

    service = module.get<PackageService>(PackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
