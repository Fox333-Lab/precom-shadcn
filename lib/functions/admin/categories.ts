import axios from "axios";

export const createCategory = async (name: string) => {
  console.log("In functions/admin/createCategory");
  console.log("In functions/admin/createCategory : ", name);
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
