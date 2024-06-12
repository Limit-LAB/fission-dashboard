import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, OctagonX, Plus } from "lucide-react";
import {
  useCreateEnvironment,
  useDeleteEnvironemnt,
  useGetEnvironments,
} from "@/requests/server";
import { TableSkeleton } from "@/components/data-table/skeleton";
import { EnvironmentDto } from "@/api/server";
import { DataTable } from "@/components/data-table";
import { Title } from "@/components/title";
import { Alert } from "@/components/alert";
import { IconButton } from "@/components/button";
import { Dropdown } from "@/components/dropdown";
import { Dialog } from "@/components/dialog";
import { FC, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useCopy } from "@/hooks/use-copy";
import { useToastError } from "@/hooks/use-toast-error";

export const columns: ColumnDef<EnvironmentDto>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "builder",
    header: "Builder",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const environment = row.original;
      const copy = useCopy();
      const remove = useDeleteEnvironemnt();
      const { toast } = useToast();
      const toastError = useToastError();
      return (
        <Dropdown
          trigger={<IconButton icon={MoreHorizontal}>Actions</IconButton>}
          label="Actions"
          items={[
            {
              children: "Copy Name",
              onClick: () => copy(environment.name),
            },
            {
              children: "Delete",
              className: "text-red-600",
              onClick() {
                remove.mutate(environment.name, {
                  onSuccess() {
                    toast({
                      title: `Delete ${environment.name} successfully.`,
                    });
                  },
                  onError(error) {
                    toastError(error);
                  },
                });
              },
            },
          ]}
        />
      );
    },
  },
];

const createFormSchema = z.object({
  name: z.string().min(1),
  image: z.string().min(1),
  builder: z.string().min(1),
});

const CreateEnvironment: FC = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
  });
  const { mutate } = useCreateEnvironment();
  const { toast } = useToast();
  const toastError = useToastError();
  const onSubmit = (values: z.infer<typeof createFormSchema>) => {
    mutate(values, {
      onSuccess(_, data) {
        toast({
          title: `Create environment ${data.name} successfully.`,
        });
        setOpen(false);
        form.reset();
      },
      onError(error) {
        toastError(error);
      },
    });
  };
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<IconButton icon={Plus}>Create</IconButton>}
      title="Create Environment"
      description="Create a new environment."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your environment name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your environment name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="builder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Builder</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This is your environment name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Dialog>
  );
};

export default function Environments() {
  const { data, isLoading, isError, error } = useGetEnvironments();

  return (
    <div className="w-full">
      <Title>Environments</Title>
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <Alert
          className="!text-red-500"
          title={`Error: ${error.name}`}
          icon={<OctagonX className="h-4 w-4 !text-red-500" />}
        >
          {error.message}
        </Alert>
      ) : (
        <DataTable
          columns={columns}
          data={data!}
          search={{
            placeholder: "Search environments...",
            column: "name",
          }}
          extra={
            <>
              <CreateEnvironment />
            </>
          }
        />
      )}
    </div>
  );
}
