"use client";
import { DATE_FORMAT_DDMMYYYY } from "@/lib/constants/date";
import IOrder, { IOrderProduct, TOrder } from "@/types/db/order";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { H2, H3, H4, H5, Para } from "@/components/ui/textui";
import { PaymentStatus, ShippingStatus } from "@/lib/constants/order";
import { cn } from "@/lib/utils";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import IUser from "@/types/db/user";
import { Mail, MapPin, User } from "lucide-react";

const Details = ({ orderid }: { orderid: string }) => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/admin/dashboard/order/details/${orderid}`
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  const { order }: { order: TOrder } = data;
  const user = order.user as unknown as IUser;
  const productsOrdered = order.products as unknown as IOrderProduct[];
  console.log("order details : ", order);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 flex-col sm:flex-row">
          <H5>Order ID: #{order._id.toString()}</H5>
          <div className="flex gap-1.5">
            <Badge
              className={cn("tracking-normal", {
                "bg-delivered/20 text-green-500 border-border-delivered/30":
                  order.status === ShippingStatus.DELIVERED,
                "bg-processing/20 text-yellow-500 border-border-processing/30":
                  order.status === ShippingStatus.PROCESSING,
                "bg-cancelled/20 text-red-500 border-border-cancelled/30":
                  order.status === ShippingStatus.CANCELLED,
                "bg-shipped/20 text-blue-500 border-border-shipped/30":
                  order.status === ShippingStatus.SHIPPED,
                "bg-pending/20 text-orange-500 border-border-pending/30":
                  order.status === ShippingStatus.PENDING,
              })}
              variant={"hoverless"}
            >
              {order.status}
            </Badge>
            <Badge
              className={cn("tracking-normal", {
                "bg-delivered/20 text-green-500 border-border-delivered/30":
                  order.isPaid,
                "bg-cancelled/20 text-red-500 border-border-cancelled/30":
                  !order.isPaid,
                hidden: order.status === ShippingStatus.CANCELLED,
              })}
              variant={"hoverless"}
            >
              {order.isPaid
                ? "Paid"
                : order.status !== ShippingStatus.CANCELLED
                ? "Not Paid"
                : ""}
            </Badge>
          </div>
        </div>
        <span>{format(order.createdAt.toString(), "MMM dd, yyyy HH:MM")}</span>
      </div>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="text-lg">
                Items Ordered ( {productsOrdered.length.toString()} )
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productsOrdered.map((product: IOrderProduct) => (
                  <TableRow key={product.product.toString()}>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span>{product.name}</span>
                        <span>
                          Size: <strong>{product.size}</strong>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="w-20 h-20 overflow-hidden rounded-md">
                        <img
                          src={product.image.toString()}
                          className="object-cover h-full w-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{product.qty.toString()}</TableCell>
                    <TableCell>{Number(product.price).toFixed(2)}</TableCell>
                    <TableCell>
                      {(Number(product.price) * Number(product.qty)).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell colSpan={2}>Shipping:</TableCell>
                  <TableCell>
                    {Number(order.shippingPrice).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell colSpan={2}>Tax:</TableCell>
                  <TableCell>{Number(order.taxPrice).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell colSpan={2}>Discount: (-)</TableCell>
                  <TableCell>
                    {(
                      Number(order.totalBeforeDiscount) - Number(order.total)
                    ).toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell colSpan={2}>
                    <H5>Total:</H5>
                  </TableCell>
                  <TableCell>
                    <H5>{Number(order.total).toFixed(2)}</H5>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-1 justify-between">
                <span className="text-lg">Ordered By</span>
                <User className="text-muted-foreground" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex gap-2 items-center">
                <Avatar className={cn("w-16 h-16")}>
                  <AvatarImage src={user.image.toString()} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <H5>{user.name}</H5>
                  <Para>ID : {user._id.toString()}</Para>
                </div>
              </div>
              <div>
                <Para className="flex items-center gap-2">
                  <Mail size={18} /> {user.email}
                </Para>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-1 justify-between">
                <span className="text-lg">Shipping Details</span>
                <MapPin className="text-muted-foreground" />
              </div>
            </CardTitle>
          </CardHeader>
          {/* <Separator /> */}
          <CardContent>
            <div>
              <Para>{order.shippingAddress.address1}</Para>
              <Para>{order.shippingAddress.address2}</Para>
              <Para>{order.shippingAddress.city}</Para>
              <Para>
                {order.shippingAddress.country} -{" "}
                {order.shippingAddress.zipcode}
              </Para>
              <Para>{order.shippingAddress.phoneNumber.toString()}</Para>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Details;
