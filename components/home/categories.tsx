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

const Categories = () => {
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
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/5"
              >
                <div className="p-1">
                  <Card className="border-gray-150 border bg-gray-100/60 shadow-none">
                    <CardContent className="flex items-center justify-between gap-2 px-4 py-4">
                      <span className="text-base font-semibold md:text-lg">
                        Category {index + 1}
                      </span>
                      <Avatar className="size-14">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
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
