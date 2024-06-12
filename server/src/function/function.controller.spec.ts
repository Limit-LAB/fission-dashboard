import { Test, TestingModule } from '@nestjs/testing';
import { FunctionController } from './function.controller';
import { FunctionService } from './function.service';
import { KubernetesModule } from '../kubernetes/kubernetes.module';

describe('FunctionController', () => {
  let controller: FunctionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FunctionController],
      providers: [FunctionService],
      imports: [KubernetesModule]
    }).compile();

    controller = module.get<FunctionController>(FunctionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
