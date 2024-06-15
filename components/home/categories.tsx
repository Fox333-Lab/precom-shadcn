import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { H3 } from "../ui/textui";

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
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <div className="p-1">
                  <Card className="border-none bg-gray-100 shadow-none">
                    <CardContent className="flex items-center justify-center p-6">
                      <span className="text-base font-semibold md:text-lg">
                        Category {index + 1}
                      </span>
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
