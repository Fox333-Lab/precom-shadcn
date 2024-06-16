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
};

const Payment = ({ paymentMethod, setPaymentMethod }: PaymentPropsTypes) => {
  console.log("paymentMethod : ", paymentMethod);
  const changePaymentMethod = async (name: string) => {
    console.log("In changePaymentMethod : ", name);
    setPaymentMethod(name);
  };

  return (
    <div>
      <RadioGroup
        defaultValue={paymentMethod}
        onValueChange={changePaymentMethod}
      >
        {paymentMethods.map((method) => (
          <Card key={method.id} className={cn("shadow-none p-2")}>
            <div className="flex gap-2 items-center">
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
