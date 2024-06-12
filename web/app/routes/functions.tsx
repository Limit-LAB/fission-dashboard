import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, OctagonX, Plus } from "lucide-react";
import {
  useCreateFunction,
  useDeleteFunction,
  useGetFunctions,
} from "@/requests/server";
import { TableSkeleton } from "@/components/data-table/skeleton";
import { FunctionDto } from "@/api/server";
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

export const columns: ColumnDef<FunctionDto>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "pkg",
    header: "Package",
  },
  {
    accessorKey: "env",
    header: "Environment",
  },
  {
    accessorKey: "entry",
    header: "Entry",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const fn = row.original;
      const copy = useCopy();
      const remove = useDeleteFunction();
      const { toast } = useToast();
      const toastError = useToastError();
      return (
        <Dropdown
          trigger={<IconButton icon={MoreHorizontal}>Actions</IconButton>}
          label="Actions"
          items={[
            {
              children: "Copy Name",
              onClick: () => copy(fn.name),
            },
            {
              children: "Delete",
              className: "text-red-600",
              onClick() {
                remove.mutate(fn.name, {
                  onSuccess() {
                    toast({
                      title: `Delete ${fn.name} successfully.`,
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
  env: z.string().min(1),
  pkg: z.string().min(1),
  name: z.string().min(1),
  entry: z.string().optional(),
});

const CreateFunction: FC = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
  });
  const { mutate } = useCreateFunction();
  const { toast } = useToast();
  const toastError = useToastError();
  const onSubmit = (values: z.infer<typeof createFormSchema>) => {
    mutate(values, {
      onSuccess(_, data) {
        toast({
          title: `Create function ${data.name} successfully.`,
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
      title="Create Function"
      description="Create a new function."
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
                <FormDescription>This is your function name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="env"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Env</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>This is your function name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pkg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Package</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>This is your function name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="entry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entry</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>This is your function name.</FormDescription>
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

export default function Functions() {
  const { data, isLoading, isError, error } = useGetFunctions();

  return (
    <div className="w-full">
      <Title>Functions</Title>
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
            placeholder: "Search functions...",
            column: "name",
          }}
          extra={
            <>
              <CreateFunction />
            </>
          }
        />
      )}
    </div>
  );
}
