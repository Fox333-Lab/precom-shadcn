import BasicDataTable from "@/components/ui/basicdatatable";
import IUser from "@/types/db/user";
import React from "react";
import { susers } from "../../../../data/MOCK_DATA";

const Users = ({ users }: { users: IUser[] }) => {
  const pusers = susers as unknown as IUser[];
  console.log("users compoennet : ", users);
  //console.log("users : ", susers[0]);
  return (
    <>
      <BasicDataTable users={users} />
    </>
  );
};

export default Users;
