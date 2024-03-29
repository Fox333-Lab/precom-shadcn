import { badgeVariants } from "@/components/ui/badge";
import Link from "next/link";

const ViewAllLink = ({ url }: { url: string }) => {
  return (
    <>
      <Link
        href={url}
        className={`${badgeVariants({ variant: "outline" })} tracking-normal`}
      >
        View All
      </Link>
    </>
  );
};

export default ViewAllLink;
