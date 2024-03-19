"use client";
import { Users } from "@/components/admin/dashboard/users";
import { Separator } from "@/components/ui/separator";
import { H3 } from "@/components/ui/textui";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import React from "react";

const UsersPage = () => {
  const { data, error, isLoading } = useSWRFetch(`/api/admin/dashboard/users`);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  console.log("users page : ", data.users);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <H3>User List</H3>
        <Separator />
      </div>
      <Users users={data.users} />
    </div>
  );
};

export default UsersPage;
