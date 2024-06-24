import { Card } from "../ui/card";
import winter1 from "@/public/images/winter1.jpg";
import winter2 from "@/public/images/winter2.jpg";
import winter3 from "@/public/images/winter3.jpg";
import "./style.css";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
const Hero = () => {
  return (
    // done with flex - commented
    // <div className="" id="hero" style={{ height: "600px" }}>
    //   <div className="flex flex-col lg:flex-row gap-6 h-full">
    //     <Card
    //       id="hero1Container"
    //       className="relative shadow-none bg-gray-100 border-none"
    //     >
    //       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt
    //       repellendus qui animi est dolore! Quidem quas quos, cupiditate itaque
    //       accusantium ipsa possimus commodi labore eveniet quia dolore, iusto
    //       sit exercitationem?
    //     </Card>
    //     <div className="flex flex-col gap-6" id="hero2Container">
    //       <Card className="flex-1 shadow-none bg-gray-100 border-none">
    //         hhhd
    //       </Card>
    //       <Card className="flex-1 shadow-none bg-gray-100 border-none">
    //         hhhd2
    //       </Card>
    //     </div>
    //   </div>
    // </div>

    // doing with grid
    <div className="text-white">
      <div className="grid gap-8 xl:grid-cols-3 xl:grid-rows-2">
        <div className="relative xl:col-span-2 xl:row-start-1 xl:row-end-[-1]">
          <Image
            src={winter1}
            className="h-full w-full rounded-lg object-cover saturate-100 filter"
            alt=""
          />
          {/* max-w-[470px] removed from below line as it was causing text to wrap */}
          <div className="absolute top-[50%] ml-8 -translate-y-[50%] sm:ml-16 sm:space-y-4">
            <p className="hidden text-2xl sm:block">100% original product</p>
            <p className="text-2xl font-bold sm:text-4xl md:text-6xl">
              Our Product One
            </p>
            <p className="pt-4 text-xl sm:pt-8">Start At</p>
            <div className="pb-3 text-2xl font-medium text-red-600 sm:pb-8 sm:text-4xl">
              20.23
            </div>
            {/* <div className="flex w-fit cursor-pointer items-center gap-4 rounded-full px-4 py-2 text-[14px] sm:px-6 sm:py-3">
              Shop Now
            </div> */}
            <Link
              href="/"
              className={cn(`${buttonVariants({ rounded: "full" })}`)}
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative">
          <Image
            src={winter2}
            className="h-full w-full rounded-lg object-cover"
            alt=""
          />
          <div className="absolute top-[50%] ml-8 max-w-[470px] -translate-y-[50%] sm:ml-16 sm:space-y-2">
            {/* <p className="hidden text-2xl sm:block">100% original product</p> */}
            <h2 className="text-2xl font-bold sm:text-3xl">Our Product Two</h2>
            <p className="pt-4 text-xl">Start At</p>
            <div className="pb-3 text-2xl font-medium text-red-600 sm:text-4xl">
              20.23
            </div>
            {/* <div className="flex w-fit cursor-pointer items-center gap-4 rounded-full px-4 py-2 text-[14px]">
              Shop Now
            </div> */}
            <Link
              href="/"
              className={cn(`${buttonVariants({ rounded: "full" })}`)}
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative">
          <Image
            src={winter3}
            className="h-full w-full rounded-lg object-cover"
            alt=""
          />
          <div className="absolute top-[50%] ml-8 max-w-[470px] -translate-y-[50%] sm:ml-16 sm:space-y-2">
            {/* <p className="hidden text-2xl sm:block">100% original product</p> */}
            <h2 className="text-2xl font-bold sm:text-3xl">
              Our Product Three
            </h2>
            <p className="pt-4 text-xl">Start At</p>
            <div className="pb-3 text-2xl font-medium text-red-600 sm:text-4xl">
              20.23
            </div>
            {/* <div className="flex w-fit cursor-pointer items-center gap-4 rounded-full px-4 py-2 text-[14px]">
              Shop Now
            </div> */}
            <Link
              href="/"
              className={cn(`${buttonVariants({ rounded: "full" })}`)}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
