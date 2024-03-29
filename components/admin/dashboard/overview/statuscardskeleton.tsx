import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StatusCardSkeleton = () => {
  return (
    <div className="flex-1">
      <Card>
        <CardHeader className="pb-2 pt-5">
          <CardTitle className="">
            <span className="">
              <Skeleton className="w-30 h-5 rounded-full" />
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <span className="flex items-center gap-1 pt-2">
                  <Skeleton className="w-6 h-5 rounded-full" />
                  <Skeleton className="w-10 h-8 rounded-full" />
                </span>
              </div>
              <div className="flex items-center justify-center">
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <Skeleton className="w-25 h-4 rounded-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusCardSkeleton;
