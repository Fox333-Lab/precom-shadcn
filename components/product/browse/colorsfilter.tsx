import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SizeFilterItem from "./sizefilteritem";
import ColorFilterItem from "./colorfilteritem";

type ColorsFilterProps = {
  colors: any;
};

const ColorsFilter = ({ colors }: ColorsFilterProps) => {
  return (
    <div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            <ul className="flex gap-2.5 flex-wrap ml-1">
              {colors.map((color: any, i: number) => {
                return <ColorFilterItem color={color} key={i} />;
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ColorsFilter;
