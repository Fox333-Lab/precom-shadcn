import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StyleFilterItem from "./stylefilteritem";

type StylesFilterProps = {
  styles: any;
};

const StylesFilter = ({ styles }: StylesFilterProps) => {
  return (
    <div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Styles</AccordionTrigger>
          <AccordionContent>
            <ul>
              {styles.map((style: any, i: number) => {
                return <StyleFilterItem style={style} key={i} />;
              })}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StylesFilter;
