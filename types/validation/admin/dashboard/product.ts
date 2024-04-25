export type CreateProductInputTypes = {
  name: string;
  description: string;
  brand: string;
  sku: string;
  discount: number;
  parent: string;
  category: string;
  subCategories: Array<string>;
  color: string;
  imageInputFile: string;
  styleInput: string;
};
