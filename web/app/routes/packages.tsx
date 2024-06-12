import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, OctagonX, Plus } from "lucide-react";
import {
  useCreatePackage,
  useDeletePackage,
  useGetPackages,
} from "@/requests/server";
import { TableSkeleton } from "@/components/data-table/skeleton";
import { PackageDto } from "@/api/server";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Packages" }, { name: "description", content: "Packages" }];
};

export const columns: ColumnDef<PackageDto>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "environment",
    header: "Environment",
  },
  {
    accessorKey: "codeUrl",
    header: "Code Url",
    cell(props) {
      const codeUrl = props.row.original.codeUrl;
      return (
        <HoverCard>
          <HoverCardTrigger>
            <p className="w-64 truncate">{codeUrl}</p>
          </HoverCardTrigger>
          <HoverCardContent className="break-all">{codeUrl}</HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const fn = row.original;
      const copy = useCopy();
      const remove = useDeletePackage();
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
  environment: z.string().min(1),
  codeUrl: z.string().url(),
  name: z.string().min(1),
});

const CreatePackage: FC = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
  });
  const { mutate } = useCreatePackage();
  const { toast } = useToast();
  const toastError = useToastError();
  const onSubmit = (values: z.infer<typeof createFormSchema>) => {
    mutate(values, {
      onSuccess(_, data) {
        toast({
          title: `Create package ${data.name} successfully.`,
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
      title="Create Package"
      description="Create a new package."
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
                <FormDescription>This is your package name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="environment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Env</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>This is your package name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code Url</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>This is your package name.</FormDescription>
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

export default function Packages() {
  const { data, isLoading, isError, error } = useGetPackages();

  return (
    <div className="w-full">
      <Title>Packages</Title>
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
            placeholder: "Search packages...",
            column: "name",
          }}
          extra={
            <>
              <CreatePackage />
            </>
          }
        />
      )}
    </div>
  );
}
