"use client";
import { H2, Para } from "@/components/ui/textui";
import { signOut, useSession } from "next-auth/react";
import SummaryTiles from "./summarytiles";
import { Button } from "@/components/ui/button";
import { Power } from "lucide-react";

const UserDashboard = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  return (
    <div className="flex flex-col items-center gap-10 py-5">
      <div className="flex flex-col items-center gap-4">
        <Para className="font-semibold">PROFILE</Para>
        <H2 className="font-bold">Welcome, {user?.name?.toString()}</H2>
        <Para className="text-center text-lg">
          View, update and manage order and other information
        </Para>
      </div>
      <div className="w-4/5">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <Link href="/user/dashboard/account">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Manage account information</CardDescription>
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
          <div>
            <Link href="/user/dashboard/orders">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>Order Details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <H1>{totalOrders}</H1>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div>
            <Link href="/user/dashboard/address">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle>Addresses</CardTitle>
                  <CardDescription>Manage Addresses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <H1>{totalAddresses}</H1>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div> */}
        {user && user?.uid && (
          <SummaryTiles
            userId={user?.uid?.toString()}
            userProfileImage={user?.image?.toString()}
          />
        )}
      </div>
      <div>
        <Button
          variant="outline"
          className="flex gap-2"
          onClick={() => signOut()}
        >
          <Power size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default UserDashboard;
