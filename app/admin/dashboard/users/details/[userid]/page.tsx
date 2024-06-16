import { UserDetails } from "@/components/admin/dashboard/users";
import { Separator } from "@/components/ui/separator";
import { H3 } from "@/components/ui/textui";

const UserDetailsPage = ({ params }: { params: { userid: string } }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <H3>Customer Details</H3>
        <Separator />
      </div>
      <UserDetails userid={params.userid} />
    </div>
  );
};

export default UserDetailsPage;
