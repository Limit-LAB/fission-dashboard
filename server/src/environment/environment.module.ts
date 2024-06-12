import { Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';
import { EnvironmentController } from './environment.controller';
import { KubernetesModule } from '../kubernetes/kubernetes.module';

@Module({
  controllers: [EnvironmentController],
  providers: [EnvironmentService],
  imports: [KubernetesModule]
})
export class EnvironmentModule {}
