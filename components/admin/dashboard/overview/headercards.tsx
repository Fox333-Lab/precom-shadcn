import React from "react";
import {
  OrderCountCard,
  ProductCountCard,
  TotalEarningsCard,
  UserCountCard,
} from ".";

const HeaderCards = () => {
  return (
    <div className="grid gap-3 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <UserCountCard />
      <ProductCountCard />
      <OrderCountCard />
      <TotalEarningsCard />
    </div>
  );
};

export default HeaderCards;
