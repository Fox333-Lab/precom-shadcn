import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SizeFilterItem from "./sizefilteritem";
import ColorFilterItem from "./colorfilteritem";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { useSearchParams } from "next/navigation";

type ColorsFilterProps = {
  colors: any;
  colorFilterHandler: (color: string) => void;
};

const ColorsFilter = ({ colors, colorFilterHandler }: ColorsFilterProps) => {
  const searchParams = useSearchParams();
  let existingColor = searchParams.get("color");
  let selectedColor: string[] = existingColor?.split("_") ?? [];
  const togchange = (values: string[]) => {
    console.log("value : ", values);
    let searchColors = values.join("_");
    colorFilterHandler(searchColors);
  };
  return (
    <div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent>
            {/* <ul className="flex gap-2.5 flex-wrap ml-1"> */}
            <ToggleGroup
              type="multiple"
              value={selectedColor}
              onValueChange={(colors) => togchange(colors)}
            >
              {colors.map((color: any, i: number) => {
                return (
                  <ColorFilterItem
                    color={color}
                    key={i}
                    colorFilterHandler={colorFilterHandler}
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

export default ColorsFilter;
