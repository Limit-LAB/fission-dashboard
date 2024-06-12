# detemine if observability namespace exists
kubectl get namespaces | grep observability >/dev/null
if [ $? -ne 0 ]; then
  kubectl create namespace observability
  kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.39.0/jaeger-operator.yaml -n observability
fi

# deploy jaeger
kubectl apply -n observability -f ./observability.yaml
