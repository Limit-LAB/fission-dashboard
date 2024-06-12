import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC, PropsWithChildren, ReactNode } from "react";

export interface ITab {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
}

export interface ITabControlProps extends PropsWithChildren {
  tabs: ITab[];
  defaultTabValue?: string;
}

export const TabControl: FC<ITabControlProps> = (props) => {
  const { tabs, defaultTabValue, children } = props;
  return (
    <Tabs defaultValue={defaultTabValue} className="w-[400px]">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.trigger}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
