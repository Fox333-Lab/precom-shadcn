import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { H1 } from "@/components/ui/textui";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import DashboardTilesSkeleton from "./dashboardtilesskeleton";

type SummaryTilesPropsTypes = {
  userProfileImage: string | undefined;
  userId: string | undefined;
};

const SummaryTiles = ({ userProfileImage, userId }: SummaryTilesPropsTypes) => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/user/dashboard/overview/${userId}`
  );
  if (isLoading) return <DashboardTilesSkeleton />;
  if (error) return <div>error</div>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="min-h-full">
        <Link href="/user/dashboard/account">
          <Card className="min-h-full">
            <CardHeader className="text-center">
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={userProfileImage} alt="avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
      <div className="min-h-full">
        <Link href="/user/dashboard/orders">
          <Card className="min-h-full">
            <CardHeader className="text-center">
              <CardTitle>Orders</CardTitle>
              <CardDescription>Order Details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <H1>{data.orderCount}</H1>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
      <div className="min-h-full">
        <Link href="/user/dashboard/addresses">
          <Card className="min-h-full">
            <CardHeader className="text-center">
              <CardTitle>Addresses</CardTitle>
              <CardDescription>Manage Addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <H1>{data.addressCount}</H1>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default SummaryTiles;
