import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

type PriceFilterProps = {
  priceFilterHandler: (min: string, max: string) => void;
};

const PriceFilter = ({ priceFilterHandler }: PriceFilterProps) => {
  const searchParams = useSearchParams();
  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");
  return (
    <div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-2 pt-2 pl-2">
              <Input
                type="number"
                name="min"
                id="min"
                min="0"
                placeholder="Min"
                value={min}
                onChange={(e) => setMin(e.target.value)}
              />
              <Input
                type="number"
                name="max"
                id="max"
                min="0"
                value={max}
                placeholder="Max"
                onChange={(e) => setMax(e.target.value)}
              />
              <Button onClick={() => priceFilterHandler(min, max)}>GO</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PriceFilter;
