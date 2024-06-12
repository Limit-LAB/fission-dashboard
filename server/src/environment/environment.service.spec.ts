import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentService } from './environment.service';
import { KubernetesModule } from '../kubernetes/kubernetes.module';

describe('EnvironmentService', () => {
  let service: EnvironmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvironmentService],
      imports: [KubernetesModule]
    }).compile();

    service = module.get<EnvironmentService>(EnvironmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
