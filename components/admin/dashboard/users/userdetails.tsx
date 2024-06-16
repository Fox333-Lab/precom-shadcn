"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IAddress, TUser } from "@/types/db/user";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H3, H6, Para } from "@/components/ui/textui";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/ui/datatable";
import { OrderColumnDefs } from "@/columndefs/order";
import { susers } from "@/data/MOCK_DATA_USER";

const UserDeatils = ({ userid }: { userid: string }) => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/admin/dashboard/users/details/${userid}`
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  // console.log("userdetails user : ", data.user);
  // console.log("userdetails userOrders : ", data.userOrders);
  const user = data.user as TUser;
  // const user = susers.filter(
  //   (su) => su._id.toString() == userid.toString()
  // )[0] as unknown as TUser; // to be removed later
  return (
    <div className="grid grid-cols-1 gap-6 mt-3 md:grid-cols-3">
      <div className="">
        <Card>
          <CardHeader>
            <div className="flex flex-col items-center">
              <Avatar className={cn("w-32 h-32")}>
                <AvatarImage src={user.image.toString()} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 items-center">
              <H3>{user.name}</H3>
              <Para className="">ID: #{user._id.toString()}</Para>
            </div>
            <Separator />

            <Para className="font-medium text-sm">DETAILS</Para>
            <div className="flex flex-col gap-2 justify-center">
              <H6 className="font-normal flex gap-2 items-center">
                <span>Email: </span>
                <span>{user.email}</span>
              </H6>
              <H6 className="font-normal flex gap-2 items-center">
                <span>Status: </span>
                <Badge
                  className={cn("tracking-normal", {
                    "bg-delivered/20 text-green-500 border-border-delivered/30":
                      user.emailVerified,
                    "bg-cancelled/20 text-red-500 border-border-cancelled/30":
                      !user.emailVerified,
                  })}
                  variant={"hoverless"}
                >
                  {user.emailVerified ? "Active" : "Dormant"}
                </Badge>
              </H6>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <div className="flex flex-col gap-6">
          <Card className="">
            <CardHeader>
              {/* <H3>Address Book</H3> */}
              <CardTitle>Address Book</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {user.address.map((address, i) => {
                  return (
                    <AccordionItem
                      value={i.toString()}
                      key={i.toString()}
                      className="border-none"
                    >
                      <AccordionTrigger>
                        {address.firstname} {address.lastname}
                      </AccordionTrigger>
                      <AccordionContent>
                        <span className="mt-2">
                          <H6>{address.address1}</H6>
                          <H6>{address.address2}</H6>
                          <H6>{address.city}</H6>
                          <H6> {address.state}</H6>
                          <H6>{address.country}</H6>
                        </span>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={OrderColumnDefs}
                data={data.userOrders}
                filterBy="_id"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDeatils;
