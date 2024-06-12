import { Skeleton } from "../ui/skeleton";

export function TableSkeleton() {
    return (
      <div className="flex flex-col gap-5">
        <Skeleton className="h-[60px] w-full rounded-xl" />
        {[...Array(3)]
          .map((_, index) => (
            <div
              className="w-full flex gap-10"
              style={{ opacity: index / 3 }}
              key={index}
            >
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[50px]" />
              <Skeleton className="h-4 w-[200px]" />
              <div className="flex-1" />
              <Skeleton className="h-4 w-[50px] justify-self-end" />
            </div>
          ))
          .reverse()}
      </div>
    );
}
