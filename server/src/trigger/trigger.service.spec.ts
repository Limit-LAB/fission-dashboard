import { Test, TestingModule } from '@nestjs/testing';
import { TriggerService } from './trigger.service';
import { KubernetesModule } from '../kubernetes/kubernetes.module';

describe('TriggerService', () => {
  let service: TriggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TriggerService],
      imports: [KubernetesModule]
    }).compile();

    service = module.get<TriggerService>(TriggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
