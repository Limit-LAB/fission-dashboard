import { Module } from '@nestjs/common';
import { FunctionService } from './function.service';
import { FunctionController } from './function.controller';
import { KubernetesModule } from '../kubernetes/kubernetes.module';

@Module({
  controllers: [FunctionController],
  providers: [FunctionService],
  imports: [KubernetesModule]
})
export class FunctionModule {}
