"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { H6 } from "@/components/ui/textui";

type AccordionProps = {
  name: string;
  value: string;
};

const AccordionDemo = ({ details }: { details: AccordionProps[] }) => (
  <Accordion className="w-full" type="single" collapsible>
    {details.map((detail: AccordionProps, i: number) => (
      <AccordionItem value={`detail-${i + 1}`} key={i}>
        <AccordionTrigger>
          <H6 className="font-normal">{`detail-${i + 1}`}</H6>
        </AccordionTrigger>
        <AccordionContent>
          <div className="py-4 px-4">
            <div className="flex flex-col gap-1 items-start">
              <span className="font-medium">{detail.name}:</span>
              <span>{detail.value}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
export default AccordionDemo;
