"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { H3 } from "../ui/textui";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useSWRFetch } from "@/lib/hooks/usefetch";

const Categories = () => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/admin/dashboard/categories`,
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  console.log("first category : ", data.categories);
  return (
    <section className="flex flex-col gap-6">
      <H3 className="text-lg font-bold md:text-2xl">Shop By Category</H3>
      <div className="w-full px-12">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {/* {Array.from({ length: 10 }).map((_, index) => ( */}
            {data.categories.map((category: any) => (
              <CarouselItem
                key={category._id.toString()}
                className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/5"
              >
                <div className="p-1">
                  <Card className="border-gray-150 border bg-gray-100/60 shadow-none">
                    <CardContent className="flex items-center justify-between gap-2 px-4 py-4">
                      <Link
                        href={`/products?category=${category._id.toString()}`}
                        className="flex w-full items-center justify-between gap-2"
                      >
                        <span className="text-base font-semibold md:text-lg">
                          {category.name}
                        </span>
                        <Avatar className="size-14">
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Categories;
