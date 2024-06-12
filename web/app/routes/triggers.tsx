import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, OctagonX, Plus } from "lucide-react";
import {
  useCreateTrigger,
  useDeleteTrigger,
  useGetTriggers,
} from "@/requests/server";
import { TableSkeleton } from "@/components/data-table/skeleton";
import {
  CreateTriggerDto,
  HTTPOptions,
  MqOptions,
  TriggerDto,
} from "@/api/server";
import { DataTable } from "@/components/data-table";
import { Title } from "@/components/title";
import { Alert } from "@/components/alert";
import { IconButton } from "@/components/button";
import { Dropdown } from "@/components/dropdown";
import { Dialog } from "@/components/dialog";
import { FC, useState } from "react";
import { z } from "zod";
import { UseFormReturn, useForm } from "react-hook-form";
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
import { Select } from "@/components/select";
import { TabControl } from "@/components/tab";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Triggers" }, { name: "description", content: "Triggers" }];
};

export const columns: ColumnDef<TriggerDto>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "function",
    header: "Function",
  },
  {
    id: "options",
    header: "Options",
    cell(props) {
      const original = props.row.original;
      return (
        <HoverCard>
          <HoverCardTrigger>
            {
              {
                [TriggerDto.type.HTTPTRIGGER]: "HTTP Trigger",
                [TriggerDto.type.MESSAGEQUEUETRIGGER]: "Message Queue Trigger",
                [TriggerDto.type.TIMETRIGGER]: "Time Trigger",
              }[original.type]
            }
          </HoverCardTrigger>
          <HoverCardContent>
            {original.type === TriggerDto.type.HTTPTRIGGER ? (
              <div>
                <p>Method: {original.http?.method}</p>
                <p>Endpoint: {original.http?.endpoint}</p>
              </div>
            ) : original.type === TriggerDto.type.MESSAGEQUEUETRIGGER ? (
              <div>
                <p>Type: {original.mq?.type}</p>
                <p>Kind: {original.mq?.kind}</p>
                <p>Request Topic: {original.mq?.requestTopic}</p>
                <p>Response Topic: {original.mq?.responseTopic}</p>
                <p>Error Topic: {original.mq?.errorTopic}</p>
                <p>Max Retry: {original.mq?.maxRetry}</p>
                <p>Bootstrap Server: {original.mq?.bootstrapServer}</p>
                <p>Group ID: {original.mq?.groupId}</p>
                <p>Cold Down Period: {original.mq?.coldDownPeriod}</p>
                <p>Polling Interval: {original.mq?.pollingInterval}</p>
                <p>Secret: {original.mq?.secret}</p>
              </div>
            ) : (
              <div>
                <p>Schedule: {original.schedule}</p>
              </div>
            )}
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const trigger = row.original;
      const copy = useCopy();
      const remove = useDeleteTrigger();
      const { toast } = useToast();
      const toastError = useToastError();
      return (
        <Dropdown
          trigger={<IconButton icon={MoreHorizontal}>Actions</IconButton>}
          label="Actions"
          items={[
            {
              children: "Copy Name",
              onClick: () => copy(trigger.name),
            },
            {
              children: "Delete",
              className: "text-red-600",
              onClick() {
                remove.mutate(trigger.name, {
                  onSuccess() {
                    toast({
                      title: `Delete ${trigger.name} successfully.`,
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

interface ISharedTriggerFormProps {
  form: UseFormReturn;
}

const SharedTriggerForm: FC<ISharedTriggerFormProps> = (props) => {
  const { form } = props;
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>This is your trigger name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="function"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Function</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>This is your trigger name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const createHttpTriggerSchema = z.object({
  name: z.string().min(1),
  function: z.string().min(1),
  method: z.enum(Object.values(HTTPOptions.method) as any),
  endpoint: z.string().min(1),
});

const CreateHttpTrigger: FC<ICreateTabProps> = (props) => {
  const createTrigger = useCreateTrigger();
  const form = useForm<z.infer<typeof createHttpTriggerSchema>>({
    resolver: zodResolver(createHttpTriggerSchema),
  });
  const onSubmit = (values: z.infer<typeof createHttpTriggerSchema>) => {
    createTrigger.mutate(
      {
        type: CreateTriggerDto.type.HTTPTRIGGER,
        http: {
          method: values.method as HTTPOptions.method,
          endpoint: values.endpoint,
        },
        name: values.name,
        function: values.function,
      },
      {
        onSuccess() {
          props.onSuccess();
        },
        onError(error) {
          props.onError(error);
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <SharedTriggerForm form={form as any} />
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Method</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  options={Object.values(HTTPOptions.method).map((t) => ({
                    label: t,
                    value: t,
                  }))}
                />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endpoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endpoint</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

const createMessageQueueTriggerSchema = z.object({
  name: z.string().min(1),
  function: z.string().min(1),
  type: z.enum(Object.values(MqOptions.type) as any),
  kind: z.enum(Object.values(MqOptions.kind) as any),
  requestTopic: z.string().min(1),
  responseTopic: z.string().min(1),
  errorTopic: z.string().min(1),
  maxRetry: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().min(0)
  ),
  bootstrapServer: z.string().min(1),
  groupId: z.string().min(1),
  coldDownPeriod: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().min(0)
  ),
  pollingInterval: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().min(0)
  ),
  secret: z.string().min(1),
});

const CreateMessageQueueTrigger: FC<ICreateTabProps> = (props) => {
  const createTrigger = useCreateTrigger();
  const form = useForm<z.infer<typeof createMessageQueueTriggerSchema>>({
    resolver: zodResolver(createMessageQueueTriggerSchema),
  });
  const onSubmit = (
    values: z.infer<typeof createMessageQueueTriggerSchema>
  ) => {
    createTrigger.mutate(
      {
        type: CreateTriggerDto.type.MESSAGEQUEUETRIGGER,
        mq: {
          type: values.type,
          kind: values.kind,
          requestTopic: values.requestTopic,
          responseTopic: values.responseTopic,
          errorTopic: values.errorTopic,
          maxRetry: values.maxRetry,
          bootstrapServer: values.bootstrapServer,
          groupId: values.groupId,
          coldDownPeriod: values.coldDownPeriod,
          pollingInterval: values.pollingInterval,
          secret: values.secret,
        },
        name: values.name,
        function: values.function,
      },
      {
        onSuccess() {
          props.onSuccess();
        },
        onError(error) {
          props.onError(error);
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form
        className="space-y-4 h-[400px] overflow-y-scroll"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <SharedTriggerForm form={form as any} />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  options={Object.values(MqOptions.type).map((t) => ({
                    label: t,
                    value: t,
                  }))}
                />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kind"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kind</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  options={Object.values(MqOptions.kind).map((t) => ({
                    label: t,
                    value: t,
                  }))}
                />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requestTopic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request topic</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responseTopic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Response topic</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="errorTopic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Error topic</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="maxRetry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Max Retry</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bootstrapServer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bootstrap Server</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="groupId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group ID</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coldDownPeriod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cold Down Period</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pollingInterval"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Polling Interval</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

const createScheduleTriggerSchema = z.object({
  name: z.string().min(1),
  function: z.string().min(1),
  schedule: z.string().min(1),
});

const CreateScheduleTrigger: FC<ICreateTabProps> = (props) => {
  const createTrigger = useCreateTrigger();
  const form = useForm<z.infer<typeof createScheduleTriggerSchema>>({
    resolver: zodResolver(createScheduleTriggerSchema),
  });
  const onSubmit = (values: z.infer<typeof createScheduleTriggerSchema>) => {
    createTrigger.mutate(
      {
        type: CreateTriggerDto.type.TIMETRIGGER,
        schedule: values.schedule,
        name: values.name,
        function: values.function,
      },
      {
        onSuccess() {
          props.onSuccess();
        },
        onError(error) {
          props.onError(error);
        },
      }
    );
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <SharedTriggerForm form={form as any} />
        <FormField
          control={form.control}
          name="schedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schedule</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your trigger name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

interface ICreateTabProps {
  onSuccess(): void;
  onError(error: Error): void;
}

const CreateTrigger: FC = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const toastError = useToastError();
  const onSuccess = () => {
    toast({
      title: "Create trigger successfully.",
    });
    setOpen(false);
  };
  const onError = (error: Error) => {
    toastError(error);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      trigger={<IconButton icon={Plus}>Create</IconButton>}
      title="Create Trigger"
      description="Create a new trigger."
    >
      <TabControl
        defaultTabValue="http"
        tabs={[
          {
            value: "http",
            trigger: "HTTP Trigger",
            content: (
              <CreateHttpTrigger onSuccess={onSuccess} onError={onError} />
            ),
          },
          {
            value: "messagequeue",
            trigger: "Message Queue Trigger",
            content: (
              <CreateMessageQueueTrigger
                onSuccess={onSuccess}
                onError={onError}
              />
            ),
          },
          {
            value: "timetrigger",
            trigger: "Time Trigger",
            content: (
              <CreateScheduleTrigger onSuccess={onSuccess} onError={onError} />
            ),
          },
        ]}
      ></TabControl>
    </Dialog>
  );
};

export default function Triggers() {
  const { data, isLoading, isError, error } = useGetTriggers();

  return (
    <div className="w-full">
      <Title>Triggers</Title>
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
            placeholder: "Search triggers...",
            column: "name",
          }}
          extra={
            <>
              <CreateTrigger />
            </>
          }
        />
      )}
    </div>
  );
}
