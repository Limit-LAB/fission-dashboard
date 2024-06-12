import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { KubernetesModule } from '../kubernetes/kubernetes.module';

@Module({
  controllers: [PackageController],
  providers: [PackageService],
  imports: [KubernetesModule]
})
export class PackageModule {}
