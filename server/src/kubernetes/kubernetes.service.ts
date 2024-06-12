import { Injectable } from '@nestjs/common';
import * as k8s from '@kubernetes/client-node';

@Injectable()
export class KubernetesService {
  private config: k8s.KubeConfig;
  public api: k8s.CoreV1Api;
  public crd: k8s.CustomObjectsApi;

  constructor() {
    this.config = new k8s.KubeConfig();
    this.config.loadFromDefault();
    this.api = this.config.makeApiClient(k8s.CoreV1Api);
    this.crd = this.config.makeApiClient(k8s.CustomObjectsApi);
  }
}
