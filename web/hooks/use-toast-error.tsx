import { useToast } from "@/components/ui/use-toast";

export function useToastError() {
  const { toast } = useToast();
  return (error: Error) =>
    toast({
      variant: "destructive",
      title: error.name,
      description: error.message,
    });
}
