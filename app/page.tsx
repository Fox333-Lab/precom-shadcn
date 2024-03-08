import { BestSellers, Categories, Hero, NewArrivals } from "@/components/home";
export default function Home() {
  return (
    // <div className="flex flex-col min-h-screen">
    //   <main
    //     className="relative grow"
    //     style={{ minHeight: "-webkit-fill-available" }}
    //   >
    //     <div className="container md:px-8 2xl:px-16">
    <div className="flex flex-col gap-12">
      <Hero />
      <Categories />
      <NewArrivals />
      <BestSellers />
    </div>
    //     </div>
    //   </main>
    // </div>
  );
}
