import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FilterIcon } from "lucide-react";
import CategoryFilter from "./categoryfilter";
import SizesFilter from "./sizefilter";
import ColorsFilter from "./colorsfilter";
import BrandsFilter from "./brandsfilter";
import StylesFilter from "./stylesfilter";
import PriceFilter from "./pricefilter";
import { useRouter } from "next/navigation";

type FilterProps = {
  categories: any;
  subCategories: any;
  sizes: any;
  colors: any;
  brands: any;
  styles: any;
  categoryFilterHandler: (category: string) => void;
  brandFilterHandler: (brand: string) => void;
  sizeFilterHandler: (size: string) => void;
  priceFilterHandler: (min: string, max: string) => void;
  colorFilterHandler: (color: string) => void;
  checkChecked: (queryName: string, value: string) => boolean;
  params: URLSearchParams;
};

const Filter = ({
  categories,
  subCategories,
  sizes,
  colors,
  brands,
  styles,
  categoryFilterHandler,
  brandFilterHandler,
  sizeFilterHandler,
  priceFilterHandler,
  colorFilterHandler,
  checkChecked,
  params,
}: FilterProps) => {
  const router = useRouter();
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant={"ghost"}>
            <FilterIcon strokeWidth={0.7} className="text-primary" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>
              Filter {params.size == 0 ? "" : `(${params.size.toString()})`}
            </SheetTitle>
            {/* <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription> */}
          </SheetHeader>
          {categories && (
            <CategoryFilter
              categories={categories}
              subCategories={subCategories}
              categoryFilterHandler={categoryFilterHandler}
              checkChecked={checkChecked}
            />
          )}
          {sizes && sizes.length > 0 && (
            <SizesFilter
              sizes={sizes}
              sizeFilterHandler={sizeFilterHandler}
              checkChecked={checkChecked}
            />
          )}
          {colors && colors.length > 0 && (
            <ColorsFilter
              colors={colors}
              colorFilterHandler={colorFilterHandler}
            />
          )}
          {brands && brands.length > 0 && (
            <BrandsFilter
              brands={brands}
              brandFilterHandler={brandFilterHandler}
              checkChecked={checkChecked}
            />
          )}
          {styles && styles.length > 0 && <StylesFilter styles={styles} />}
          <PriceFilter priceFilterHandler={priceFilterHandler} />
          <SheetFooter>
            <div className="mt-8 flex w-full justify-between gap-2">
              <Button className="flex-1">Apply</Button>
              <Button
                className="flex-1"
                onClick={() => router.push("/products")}
              >
                Clear
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Filter;
