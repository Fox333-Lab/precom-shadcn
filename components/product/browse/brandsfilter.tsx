import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BrandFilterItem from "./brandfilteritem";

type BrandsFilterProps = {
  brands: any;
  brandFilterHandler: (brand: string) => void;
};

const BrandsFilter = ({ brands, brandFilterHandler }: BrandsFilterProps) => {
  return (
    <div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <ul className="flex gap-2.5 flex-wrap ml-1">
              {brands.map((brand: any, i: number) => {
                return (
                  <BrandFilterItem
                    brand={brand}
                    key={i}
                    brandFilterHandler={brandFilterHandler}
                  />
                );
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BrandsFilter;
