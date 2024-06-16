import DataTable from "@/components/ui/datatable";
import IUser, { TUser } from "@/types/db/user";
import React from "react";
import { userColumnDefs } from "@/columndefs/user";
import { Card, CardContent } from "@/components/ui/card";

const Users = ({ users }: { users: IUser[] }) => {
  const pusers = users as unknown as TUser[];
  // console.log("users component : ", pusers);
  //console.log("users : ", pusers[0]);
  return (
    <>
      <Card>
        <CardContent>
          <DataTable columns={userColumnDefs} data={pusers} filterBy="email" />
        </CardContent>
      </Card>
    </>
  );
};

export default Users;
