export FISSION_NAMESPACE=fission

# detemine if fission is inuse in helm
helm list -n $FISSION_NAMESPACE | grep fission >/dev/null
if [ $? -eq 0 ]; then
    helm install --namespace $FISSION_NAMESPACE \
        fission fission-charts/fission-all \
        --set openTelemetry.otlpCollectorEndpoint="otel-collector.opentelemetry-operator-system.svc:4317" \
        --set openTelemetry.otlpInsecure=true \
        --set openTelemetry.tracesSampler="parentbased_traceidratio" \
        --set openTelemetry.tracesSamplingRate="1" \
        --set serviceMonitor.enabled=true \
        --set serviceMonitor.namespace="monitoring" \
        --set serviceMonitor.additionalServiceMonitorLabels.release="prometheus" \
        --set podMonitor.enabled=true \
        --set podMonitor.namespace="monitoring" \
        --set podMonitor.additionalPodMonitorLabels.release="prometheus" \
        --set grafana.namespace="monitoring" \
        --set grafana.dashboards.enable=true
else
fi
