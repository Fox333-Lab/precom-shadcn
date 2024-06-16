import { BestSellers, Categories, Hero, NewArrivals } from "@/components/home";
import { UserLayout } from "@/components/shared/layouts";
export default function Home() {
  return (
    // <div className="flex flex-col min-h-screen">
    //   <main
    //     className="relative grow"
    //     style={{ minHeight: "-webkit-fill-available" }}
    //   >
    // <UserLayout>
    <div className="flex flex-col gap-12">
      <Hero />
      <Categories />
      <NewArrivals />
      <BestSellers />
    </div>
    // </UserLayout>
    //   </main>
    // </div>
  );
}
