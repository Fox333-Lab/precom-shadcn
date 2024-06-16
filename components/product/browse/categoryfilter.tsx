import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CategoryFilterItem from "./categoryfilteritem";
import { RadioGroup } from "@/components/ui/radio-group";

type CategoryFilterProps = {
  categories: any;
  subCategories: any;
  categoryFilterHandler: (category: string) => void;
  checkChecked: (queryName: string, value: string) => boolean;
};

const CategoryFilter = ({
  categories,
  subCategories,
  categoryFilterHandler,
  checkChecked,
}: CategoryFilterProps) => {
  return (
    <div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <RadioGroup>
              {categories.map((category: any, i: number) => {
                return (
                  <CategoryFilterItem
                    category={category}
                    subcategories={subCategories}
                    key={i}
                    categoryFilterHandler={categoryFilterHandler}
                    checkChecked={checkChecked}
                  />
                );
              })}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CategoryFilter;
