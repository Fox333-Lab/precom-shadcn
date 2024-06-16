"use client";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import { StatusCard, StatusCardSkeleton } from ".";

const UserCountCard = () => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/admin/dashboard/users/user`
  );

  if (isLoading) return <StatusCardSkeleton />;
  if (error) return <div>error</div>;
  // await new Promise((resolve) => setTimeout(resolve, 1000000));
  return (
    <div className="flex-1">
      <StatusCard
        className=""
        label="Total Users"
        value={data?.users?.length.toString()}
        // value="12"
        description="sample description"
        icon="users"
      />
    </div>
  );
};

export default UserCountCard;
