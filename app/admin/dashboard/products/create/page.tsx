import { CreateProduct } from "@/components/admin/dashboard/products";
import { Separator } from "@/components/ui/separator";
import { H3 } from "@/components/ui/textui";

const CreateProductPage = () => {
  console.log("create page");
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <H3>Add Product</H3>
        <Separator />
      </div>
      <CreateProduct />
    </div>
  );
};

export default CreateProductPage;
