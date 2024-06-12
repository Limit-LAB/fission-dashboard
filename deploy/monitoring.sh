export METRICS_NAMESPACE=monitoring

# detemine if monitoring namespace exists
kubectl get namespaces | grep $METRICS_NAMESPACE >/dev/null
if [ $? -ne 0 ]; then
    echo "Creating namespace $METRICS_NAMESPACE"
    kubectl create namespace $METRICS_NAMESPACE
fi

helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring
