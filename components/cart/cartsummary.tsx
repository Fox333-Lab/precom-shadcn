import { cn } from "@/lib/utils";
import ICart, { ICartProduct } from "@/types/db/cart";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const CartSummary = ({
  subTotal,
  shippingFee,
  selected,
  saveCartToDBHandler,
}: {
  subTotal: string;
  shippingFee: number;
  selected: ICartProduct[];
  saveCartToDBHandler: () => Promise<void>;
}) => {
  console.log("cartsummary : shipping : ", shippingFee);
  console.log("cartsummary : subTotal : ", subTotal);
  let total = Number(subTotal) + Number(shippingFee);
  console.log("cartsummary : total : ", total);
  return (
    <Card className="">
      {/* <div className="flex flex-col h-full gap-4"> */}
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      {/* <Heading size="6" weight="regular">
          Order Summary
        </Heading> */}
      <CardContent className="flex flex-col gap-3">
        <Separator />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shippingFee.toFixed(2)}</span>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          {/* <div className="flex-col"> */}
          <span className="font-bold">{total.toFixed(2)}</span>
          {/* <p className="text-sm text-gray-700">including VAT</p>
          </div> */}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          disabled={selected.length == 0}
          className={cn("w-full py-1.5 font-medium", {
            "cursor-not-allowed": selected.length == 0,
          })}
          onClick={() => saveCartToDBHandler()}
        >
          Check out
        </Button>
      </CardFooter>
      {/* </div> */}
    </Card>
  );
};

export default CartSummary;
