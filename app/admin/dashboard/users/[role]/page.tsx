"use client";
import { Users } from "@/components/admin/dashboard/users";
import { Separator } from "@/components/ui/separator";
import { H3 } from "@/components/ui/textui";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import { susers } from "@/data/MOCK_DATA_USER";
import IUser from "@/types/db/user";

const UsersPage = ({ params }: { params: { role: string } }) => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/admin/dashboard/users/${params.role}`
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  const users = data.users as IUser[];
  // to be removed later - starts
  // const users = susers.filter(
  //   (su) => su.role == params.role
  // ) as unknown as IUser[];
  // ends
  // console.log("users page : ", data.users);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <H3>Customer List</H3>
        {/* <Separator /> */}
      </div>
      <Users users={users} />
    </div>
  );
};

export default UsersPage;
