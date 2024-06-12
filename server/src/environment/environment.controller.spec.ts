import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentController } from './environment.controller';
import { EnvironmentService } from './environment.service';
import { KubernetesModule } from '../kubernetes/kubernetes.module';

describe('EnvironmentController', () => {
  let controller: EnvironmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnvironmentController],
      providers: [EnvironmentService],
      imports: [KubernetesModule]
    }).compile();

    controller = module.get<EnvironmentController>(EnvironmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
