import React from "react";
import { Card } from "@/components/ui/card";
import { H2, Para, H3, H1 } from "../ui/textui";

const NewArrivals = () => {
  return (
    <section className="flex flex-col gap-6">
      <H3 className="font-bold text-lg md:text-2xl">New Arrivals</H3>
      <div className="grid gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            className="group box-border overflow-hidden flex cursor-pointer flex-col gap-4 transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5"
            key={index}
          >
            <Card className="h-auto overflow-hidden bg-gray-100 border-none shadow-none">
              {/* <CardContent className="p-0 "> */}
              <img
                //   src="https://picsum.photos/id/1/200/300"
                src="/images/gabchanelHD.png"
                alt="Photo by Drew Beamer"
                className="w-1/2 h-auto inset-0 box-border border-none mx-auto"
              />
              {/* </CardContent> */}
            </Card>
            <div className="flex flex-col gap-1 px-2 pb-5">
              <H2 className="text-sm md:text-base lg:text-lg xl:text-xl">
                lorem
              </H2>
              <Para className="line-clamp-1 text-sm md:text-base text-muted-foreground">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Provident aliquam doloremque explicabo nostrum temporibus
              </Para>
              <div className="flex flex-wrap gap-2 mt-1">
                <H3 className="text-sm md:text-base">$100</H3>
                <span className="text-sm md:text-base text-muted-foreground line-through">
                  $100
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
