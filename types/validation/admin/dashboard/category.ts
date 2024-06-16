// input type for coupon
export type AddCategoryInputTypes = {
  name: string;
};

export type AddSubCategoryInputTypes = AddCategoryInputTypes & {
  parent: string;
};
