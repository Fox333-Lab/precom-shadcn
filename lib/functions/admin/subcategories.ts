import axios from "axios";

export const createSubCategory = async (name: string, parent: string) => {
  console.log("In functions/admin/subcategories/createCategory");
  console.log("In functions/admin/subcategories/createCategory : ", name);
  // try {
  const { data } = await axios.post("/api/admin/dashboard/subcategories", {
    name,
    parent,
  });
  return data;
  // } catch (err: any) {
  //   console.log("In functions/admin/createCategory : ", err.message);
  //   return null;
  // }
};

export const deleteSubCategory = async (subCategoryID: string) => {
  console.log("In functions/admin/subcategories/deleteSubCategory");
  console.log(
    "In functions/admin/subcategories/deleteSubCategory : ",
    subCategoryID
  );
  // try {
  const { data } = await axios.delete("/api/admin/dashboard/subcategories", {
    data: { subCategoryID },
  });
  return data;
  // } catch (err: any) {
  //   console.log("In functions/admin/createCategory : ", err.message);
  //   return null;
  // }
};

export const updateSubCategory = async (
  subCategoryID: string,
  subCategoryName: string,
  subCategoryParent: string
) => {
  console.log("In functions/admin/subcategories/updateCategory");
  console.log(
    "In functions/admin/subcategories/updateCategory : ",
    subCategoryID
  );
  // try {
  const { data } = await axios.put("/api/admin/dashboard/subcategories", {
    subCategoryID,
    subCategoryName,
    subCategoryParent,
  });
  return data;
  // } catch (err: any) {
  //   console.log("In functions/admin/createCategory : ", err.message);
  //   return null;
  // }
};
