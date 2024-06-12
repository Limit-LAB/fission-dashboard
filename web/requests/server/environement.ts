import { CreateEnvironmentDto } from "@/api/server";
import { useApiClient } from "@/hooks/use-api-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useGetEnvironments() {
  const client = useApiClient();
  return useQuery({
    queryKey: ["environments"],
    queryFn: () => client.environment.environmentControllerFindAll(),
  });
}

export function useGetOneEnvironment(name: string) {
  const client = useApiClient();
  return useQuery({
    queryKey: ["environment", name],
    queryFn: () => client.environment.environmentControllerFindOne(name),
  });
}

export function useCreateEnvironment() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: CreateEnvironmentDto) =>
      client.environment.environmentControllerCreate(body),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["environements"],
      });
    },
  });
}

export function useDeleteEnvironment() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) =>
      client.environment.environmentControllerRemove(name),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["environements"],
      });
    },
  });
}
