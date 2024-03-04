import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "../forms/stripepayment";

type StripePropsTypes = {
  total: number;
  orderId: string;
  stripePublicKey: string;
};
const stripePromise = loadStripe(
  "pk_test_51OoOyfSCNDS3BJgKa9ZO5ofvMtBUWXlRlqqfpevFAFApKQh3XT5R6V94o5nLULC2iHVSLEFy3KZwmCXbO395xZ5n00ZeZPOs7p"
);
// const options: StripeElementsOptions = {
//   mode: "setup",
//   currency: "USD",
// };
// console.log("stripePromise : ", stripePromise);
const StripePay = ({ total, orderId, stripePublicKey }: StripePropsTypes) => {
  console.log("In components/payment/stripepay.tsx");
  return (
    <Elements stripe={stripePromise}>
      <StripePaymentForm total={total} orderId={orderId} />
    </Elements>
  );
};

export default StripePay;
