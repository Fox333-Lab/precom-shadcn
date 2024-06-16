import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BrandFilterItem from "./brandfilteritem";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

type BrandsFilterProps = {
  brands: any;
  brandFilterHandler: (brand: string) => void;
  checkChecked: (queryName: string, value: string) => boolean;
};

const BrandsFilter = ({
  brands,
  brandFilterHandler,
  checkChecked,
}: BrandsFilterProps) => {
  // const [selectedBrand, setSelectedBrand] = useState<string[]>([]);
  const searchParams = useSearchParams();
  let existingBrand = searchParams.get("brand");
  let selectedBrand: string[] = existingBrand?.split("_") ?? [];
  const togchange = (values: string[]) => {
    console.log("value : ", values);
    let searchBrands = values.join("_");
    brandFilterHandler(searchBrands);
  };
  return (
    <div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            {/* <ul className="flex gap-2.5 flex-wrap ml-1"> */}
            <ToggleGroup
              type="multiple"
              value={selectedBrand}
              onValueChange={(brands) => togchange(brands)}
              variant="outline"
            >
              {brands.map((brand: any, i: number) => {
                return (
                  <BrandFilterItem
                    brand={brand}
                    key={i}
                    brandFilterHandler={brandFilterHandler}
                  />
                );
              })}
            </ToggleGroup>
            {/* </ul> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BrandsFilter;
