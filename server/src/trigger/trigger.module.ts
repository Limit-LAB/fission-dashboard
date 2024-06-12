import { Module } from '@nestjs/common';
import { TriggerService } from './trigger.service';
import { TriggerController } from './trigger.controller';
import { KubernetesModule } from '../kubernetes/kubernetes.module';

@Module({
  controllers: [TriggerController],
  providers: [TriggerService],
  imports: [KubernetesModule]
})
export class TriggerModule {}
