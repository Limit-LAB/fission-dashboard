import { CreateFunctionDto } from "@/api/server";
import { useApiClient } from "@/hooks/use-api-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useGetFunctions() {
  const client = useApiClient();
  return useQuery({
    queryKey: ["functions"],
    queryFn: () => client.function.functionControllerFindAll(),
  });
}

export function useGetOneFunction(name: string) {
  const client = useApiClient();
  return useQuery({
    queryKey: ["function", name],
    queryFn: () => client.function.functionControllerFindOne(name),
  });
}

export function useCreateFunction() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: CreateFunctionDto) =>
      client.function.functionControllerCreate(body),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["functions"],
      });
    },
  });
}

export function useDeleteFunction() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) =>
      client.function.functionControllerRemove(name),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["functions"],
      });
    },
  });
}
