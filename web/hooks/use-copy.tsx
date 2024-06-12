import { useToast } from "@/components/ui/use-toast";
import { useClipboard } from "foxact/use-clipboard";

export const useCopy = () => {
  const { toast } = useToast();
  const { copy } = useClipboard({
    onCopyError(error) {
      toast({
        variant: "destructive",
        description: error.message,
        title: error.name,
      });
    },
  });
  return copy;
};
