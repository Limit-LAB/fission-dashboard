import { CreatePackageDto } from "@/api/server";
import { useApiClient } from "@/hooks/use-api-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useGetPackages() {
  const client = useApiClient();
  return useQuery({
    queryKey: ["packages"],
    queryFn: () => client.package.packageControllerFindAll(),
  });
}

export function useGetOnePackage(name: string) {
  const client = useApiClient();
  return useQuery({
    queryKey: ["package", name],
    queryFn: () => client.package.packageControllerFindOne(name),
  });
}

export function useCreatePackage() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: CreatePackageDto) =>
      client.package.packageControllerCreate(body),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["packages"],
      });
    },
  });
}

export function useDeletePackage() {
  const client = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) =>
      client.package.packageControllerRemove(name),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["packages"],
      });
    },
  });
}
