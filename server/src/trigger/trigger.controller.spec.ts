import { Test, TestingModule } from '@nestjs/testing';
import { TriggerController } from './trigger.controller';
import { TriggerService } from './trigger.service';
import { KubernetesModule } from '../kubernetes/kubernetes.module';

describe('TriggerController', () => {
  let controller: TriggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TriggerController],
      providers: [TriggerService],
      imports: [KubernetesModule]
    }).compile();

    controller = module.get<TriggerController>(TriggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
