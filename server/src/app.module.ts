import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KubernetesModule } from './kubernetes/kubernetes.module';
import { FunctionModule } from './function/function.module';
import { TriggerModule } from './trigger/trigger.module';
import { PackageModule } from './package/package.module';
import { EnvironmentModule } from './environment/environment.module';

@Module({
  imports: [
    KubernetesModule,
    FunctionModule,
    TriggerModule,
    PackageModule,
    EnvironmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
