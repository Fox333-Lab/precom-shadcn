import React from "react";
import { Card } from "@/components/ui/card";
import { H2, Para, H3 } from "../ui/textui";
import { GridListWrapper } from "../shared/layouts";
import Link from "next/link";

const BestSellers = () => {
  return (
    <section className="flex flex-col gap-6">
      <H3 className="text-lg font-bold md:text-2xl">Best Sellers</H3>
      {/* <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-3 md:gap-x-5 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-7 xl:gap-y-5 2xl:grid-cols-5 2xl:gap-y-8"> */}
      <GridListWrapper>
        {Array.from({ length: 10 }).map((_, index) => (
          <Link href={`/products/details/product-1?style=0`}>
            <div
              className="group box-border flex transform flex-col gap-4 overflow-hidden transition duration-200 ease-in-out hover:-translate-y-1 md:hover:-translate-y-1.5"
              key={index}
            >
              <Card className="h-auto overflow-hidden border-none bg-gray-100 shadow-none">
                {/* <CardContent className="p-0 "> */}
                <img
                  //   src="https://picsum.photos/id/1/200/300"
                  src="/images/gabchanelHD.png"
                  alt="Photo by Drew Beamer"
                  className="inset-0 mx-auto box-border h-auto w-1/2 border-none"
                />
                {/* </CardContent> */}
              </Card>
              <div className="flex flex-col gap-1 px-2 pb-5">
                <H2 className="text-sm md:text-base lg:text-lg xl:text-xl">
                  lorem
                </H2>
                <Para className="line-clamp-1 text-sm text-muted-foreground md:text-base">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Provident aliquam doloremque explicabo nostrum temporibus
                </Para>
                <div className="mt-1 flex flex-wrap gap-2">
                  <H3 className="text-sm md:text-base">$100</H3>
                  <span className="text-sm text-muted-foreground line-through md:text-base">
                    $100
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </GridListWrapper>
      {/* </div> */}
    </section>
  );
};

export default BestSellers;
