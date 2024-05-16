import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardTilesSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <Card>
              <CardHeader className="flex flex-col items-center">
                <CardTitle>
                  <Skeleton className="w-30 h-5 rounded-full" />
                </CardTitle>
                <Skeleton className="w-55 h-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Skeleton className="w-12 h-12 rounded-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardTilesSkeleton;
