import { paymentMethods } from "@/data/paymentmethod";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { LIcon } from "../shared/icons";
import { H4 } from "../ui/textui";

type PaymentPropsTypes = {
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
};

const Payment = ({
  paymentMethod,
  setPaymentMethod,
  className,
}: PaymentPropsTypes) => {
  console.log("paymentMethod : ", paymentMethod);
  const changePaymentMethod = async (name: string) => {
    console.log("In changePaymentMethod : ", name);
    setPaymentMethod(name);
  };

  return (
    <div className={cn("", className)}>
      <RadioGroup
        defaultValue={paymentMethod}
        onValueChange={changePaymentMethod}
        className="flex gap-4"
      >
        {paymentMethods.map((method) => (
          <Card key={method.id} className={cn("p-2 shadow-none")}>
            <div className="flex items-center gap-2">
              <RadioGroupItem
                value={method.name.toString()}
                id={method.id.toString()}
              />
              <LIcon
                name={method.image}
                size={64}
                color="red"
                strokeWidth={1}
              />
              <Label htmlFor={method.id.toString()} className="tracking-normal">
                <H4>{method.name}</H4>
              </Label>
            </div>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );
};

export default Payment;
