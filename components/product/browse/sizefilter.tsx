import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SizeFilterItem from "./sizefilteritem";

type SizesFilterProps = {
  sizes: any;
  sizeFilterHandler: (size: string) => void;
  checkChecked: (queryName: string, value: string) => boolean;
};

const SizesFilter = ({
  sizes,
  sizeFilterHandler,
  checkChecked,
}: SizesFilterProps) => {
  return (
    <div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Sizes</AccordionTrigger>
          <AccordionContent>
            <ul>
              {sizes.map((size: any, i: number) => {
                return (
                  <SizeFilterItem
                    size={size}
                    key={i}
                    sizeFilterHandler={sizeFilterHandler}
                    checkChecked={checkChecked}
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

export default SizesFilter;
