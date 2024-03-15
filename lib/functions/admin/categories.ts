import axios from "axios";

export const createCategory = async (name: string) => {
  console.log("In functions/admin/categories/createCategory");
  console.log("In functions/admin/categories/createCategory : ", name);
  // try {
  const { data } = await axios.post("/api/admin/dashboard/categories", {
    name,
  });
  return data;
  // } catch (err: any) {
  //   console.log("In functions/admin/createCategory : ", err.message);
  //   return null;
  // }
};

export const deleteCategory = async (categoryID: string) => {
  console.log("In functions/admin/categories/deleteCategory");
  console.log("In functions/admin/categories/deleteCategory : ", categoryID);
  // try {
  const { data } = await axios.delete("/api/admin/dashboard/categories", {
    data: { categoryID },
  });
  return data;
  // } catch (err: any) {
  //   console.log("In functions/admin/createCategory : ", err.message);
  //   return null;
  // }
};

export const updateCategory = async (
  categoryID: string,
  categoryName: string
) => {
  console.log("In functions/admin/categories/updateCategory");
  console.log("In functions/admin/categories/updateCategory : ", categoryID);
  // try {
  const { data } = await axios.put("/api/admin/dashboard/categories", {
    categoryID,
    categoryName,
  });
  return data;
  // } catch (err: any) {
  //   console.log("In functions/admin/createCategory : ", err.message);
  //   return null;
  // }
};
