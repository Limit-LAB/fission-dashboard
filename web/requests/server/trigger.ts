import { CreateTriggerDto } from "@/api/server";
import { useApiClient } from "@/hooks/use-api-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useGetTriggers() {
  const client = useApiClient();
  return useQuery({
    queryKey: ["triggers"],
    queryFn: () => client.trigger.triggerControllerFindAll(),
  });
}

export function useGetOneTrigger(name: string) {
  const client = useApiClient();
  return useQuery({
    queryKey: ["trigger", name],
    queryFn: () => client.trigger.triggerControllerFindOne(name),
  });
}

export function useCreateTrigger() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: CreateTriggerDto) =>
      client.trigger.triggerControllerCreate(body),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["triggers"],
      });
    },
  });
}

export function useDeleteTrigger() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) =>
      client.trigger.triggerControllerRemove(name),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["triggers"],
      });
    },
  });
}
