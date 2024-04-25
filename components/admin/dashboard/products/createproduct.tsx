"use client";
import {
  Colors,
  DetailsSetter,
  ImagePicker,
  MultiSelect,
  QuestionSetter,
  SingularSelect,
  SingularSelectForCreateProduct,
  SizePicker,
  StylePicker,
  TextBox,
} from "@/components/inputs";
import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { dataURLtoBlob } from "@/lib/utils";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import ISubCategory from "@/types/db/subcategory";
import { CreateProductInputTypes } from "@/types/validation/admin/dashboard/product";
import axios from "axios";
import { Form, Formik, FormikProps } from "formik";
import { Plus } from "lucide-react";
import { set } from "mongoose";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const initialState = {
  name: "",
  description: "",
  brand: "",
  sku: "",
  discount: 0,
  images: [],
  description_images: [],
  parent: "",
  category: "",
  subCategories: [],
  color: { color: "", image: "" },
  sizes: [{ size: "", qty: "", price: "" }],
  details: [{ name: "", value: "" }],
  questions: [{ question: "", answer: "" }],
  shippingFee: "",
};

// let multiSelectOptions: Option[] = [];

const CreateProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [subs, setSubs] = useState([]);
  const [colorImage, setColorImage] = useState("");
  const [styleImage, setStyleImage] = useState("");
  const [images, setImages] = useState([] as string[]);
  const [descriptionImages, setDescriptionImages] = useState("");
  const [loading, setLoading] = useState(false);
  const [multiSelectOptions, setMultiSelectOptions] = useState([] as Option[]);
  const [multiSelectionValues, setMultiSelectionValues] = useState(
    [] as Option[]
  );
  const { data, error, isLoading } = useSWRFetch(
    `/api/admin/dashboard/products/parents`
  );

  //   console.log("parents:", data.parents);
  useEffect(() => {
    const gerParentData = async () => {
      console.log("parent 22 : ", product.parent || "0");
      const { data } = await axios.get(
        `/api/products/id/${product.parent || "0"}`
      );
      if (data) {
        console.log("subCat 22 : ", data.subCategories);
        console.log("Cat 22 : ", data.category);
        setProduct({
          ...product,
          name: data.name,
          description: data.description,
          brand: data.brand,
          category: data.category,
          subCategories: data.subCategories,
          questions: [],
          details: [],
        });
        const multiOptions: Option[] = [];
        data?.subCategories.map((sub: ISubCategory) => {
          multiOptions.push({
            label: sub.name.toString(),
            value: sub._id.toString(),
          });
        });
        setMultiSelectionValues(multiOptions);
      }
    };
    gerParentData();
  }, [product.parent]);
  useEffect(() => {
    const getSubs = async () => {
      try {
        const { data } = await axios.get(
          `/api/admin/dashboard/subcategories/bycategory`,
          {
            params: { category: product.category },
          }
        );
        if (data?.message) {
          console.log("data.message : ", data.message);
        }

        // store array of subcategories in multiSelectOptions
        const multiOptions: Option[] = [];
        data?.subCategoryByParent?.map((sub: ISubCategory) => {
          multiOptions.push({
            label: sub.name.toString(),
            value: sub._id.toString(),
          });
        });
        setSubs(data);
        setMultiSelectOptions(multiOptions);
      } catch (error) {
        console.log("error : ", error);
      }
    };
    getSubs();
  }, [product.category]);
  const validate = Yup.object({
    name: Yup.string()
      .required("Product name is required")
      .min(10, "min 10 characters required")
      .max(100, "max 100 characters allowed"),
    brand: Yup.string().required("Product brand is required"),
    category: Yup.string().required("Product category is required"),
    // subCategories: Yup.array().min(
    //   1,
    //   "Please select at-least one sub-category"
    // ),
    sku: Yup.string().required("Product SKU is required"),
    color: Yup.string().required("Product color is required"),
    description: Yup.string().required("Product description is required"),
    // imageDescInputFile: Yup.array().max(5, "max 5 images allowed"),
    imageInputFile: Yup.array().max(5, "max 5 images allowed"),
  });
  const handleSelectChange = (value: string, name: string) => {
    console.log("value ee : ", value);
    console.log("name ee : ", name);
    setProduct({ ...product, [name]: value });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const validateCreateProduct = (product: any, images: any) => {
    console.log("inside validateCreateProduct");
    let sizes = product.sizes;
    let details = product.details;
    let questions = product.questions;
    const checks = [
      {
        msg: "Name, Description, Brand added successfully",
        type: "success",
      },
    ];
    if (images.length < 2) {
      checks.push({ msg: "Minimum 2 images required", type: "error" });
    }
    if (!product.color.color) {
      checks.push({ msg: "Select a main product color", type: "error" });
    }
    if (!product.color.image) {
      checks.push({ msg: "Select a main product style image", type: "error" });
    }
    for (var i = 0; i < sizes.length; i++) {
      if (sizes[i].size == "" || sizes[i].qty == "" || sizes[i].price == "") {
        checks.push({ msg: "Please fill size information", type: "error" });
        break;
      }
    }
    for (var i = 0; i < details.length; i++) {
      if (details[i].name == "" || details[i].value == "") {
        checks.push({ msg: "Please fill details information", type: "error" });
        break;
      }
    }
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].question == "" || questions[i].answer == "") {
        checks.push({
          msg: "Please fill questions information",
          type: "error",
        });
        break;
      }
    }
    var isInValid = checks.find((check) => check.type == "error");
    console.log("isInValid : ", isInValid);
    if (isInValid) {
      console.log("create product checks : ", checks);
      return "invalid";
    }
    console.log("valid");
    return "valid";
  };
  let uploaded_images: any[] = [];
  let style_img = "";
  const CreateProduct = async () => {
    setLoading(true);
    if (images) {
      let temp = images.map((img) => {
        return dataURLtoBlob(img);
      });
      const path = "product images";
      let formData = new FormData();
      formData.append("path", path);
      temp.forEach((image) => {
        formData.append("file", image);
      });
      // uploaded_images = await uploadImages(formData);        // uncomment later to upload images to cloudinary

      uploaded_images = images; // remove later
      console.log("uploaded_images : ", uploaded_images);
    }
    if (product.color.image) {
      let temp = dataURLtoBlob(product.color.image);
      const path = "product style images";
      let formData = new FormData();
      formData.append("path", path);
      formData.append("file", temp);
      // let cloud_style_img = await uploadImages(formData);    // uncomment later to upload images to cloudinary
      // style_img = cloud_style_img[0].url;                    // uncomment later
      style_img = product.color.image; // remove later
      console.log("style_img : ", style_img);
    }
    try {
      const { data } = await axios.post(
        "/api/admin/dashboard/products/create",
        {
          ...product,
          images: uploaded_images,
          color: { color: product.color.color, image: style_img },
        }
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const CreateProductHandler = async () => {
    let test = validateCreateProduct(product, images);
    if (test == "valid") {
      console.log("valid");
      CreateProduct();
    } else {
      console.log("Invalid");
    }
  };
  const uploadImages = async (formData: FormData) => {
    const { data } = await axios.post("/api/cloudinary/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  const parents = data?.parents;
  const categories = data?.categories;
  //console.log("parents pp :", parents);
  // console.log("parents pp :", parents);
  // console.log("categories pp :", categories);
  // console.log("product pp :", product);
  // console.log("subs pp :", subs);
  // console.log("multiSelectOptions pp :", multiSelectOptions);
  // console.log("product?.subCategories pp :", product?.subCategories);
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          name: product.name,
          description: product.description,
          brand: product.brand,
          sku: product.sku,
          discount: product.discount,
          //   images: product.images,
          //   description_images: product.description_images,
          parent: product.parent,
          category: product.category,
          subCategories: product.subCategories,
          color: product.color.color,
          imageInputFile: "",
          styleInput: "",
          //   sizes: product.sizes,
          //   details: product.details,
          //   questions: product.questions,
          //   shippingFee: product.shippingFee,
        }}
        validationSchema={validate}
        onSubmit={CreateProductHandler}
      >
        {/* {(props: FormikProps<CreateProductInputTypes>) => ( */}
        {() => (
          <Form>
            <div className="flex flex-col gap-5">
              <ImagePicker
                name="imageInputFile"
                header="Product Carousel Images"
                label="Add Images"
                images={images}
                setImages={setImages}
                setColorImage={setColorImage}
                product={product}
                setProduct={setProduct}
                colorImage={colorImage}
              />
              {/* <Images
                name="imageInputFile"
                header="Product Carousel Images"
                text="Add Images"
                images={images}
                setImages={setImages}
                setColorImage={setColorImage}
              /> */}
              {/* <div>
                {product.color.image && (
                  <img
                    src={product.color.image}
                    alt="color"
                    className="w-10 h-10"
                  />
                )}
              </div>
              <div>
                {product.color.color && (
                  <span
                    className="w-10 h-10"
                    style={{ background: `${product.color.color}` }}
                  ></span>
                )}
              </div> */}

              <SingularSelectForCreateProduct
                name="parent"
                value={product.parent}
                label="Parent"
                placeholder="select parent category"
                handleChange={(e: any) => handleSelectChange(e, "parent")}
                data={parents}
              />
              <SingularSelectForCreateProduct
                name="category"
                value={product.category}
                label="Category"
                placeholder="select category"
                handleChange={(e: any) => handleSelectChange(e, "category")}
                data={categories}
                disabled={product.parent}
              />

              {/* {multiSelectOptions && multiSelectOptions.length > 0 && (
                // <SingularSelect
                //   name="subCategories"
                //   value={product.subCategories}
                //   label="Sub Category"
                //   placeholder="sub category"
                //   data={subs}
                //   disabled={product.parent}
                // />

                
              )} */}

              <div className="flex w-full flex-col gap-5">
                <MultipleSelector
                  // defaultOptions={multiSelectOptions}
                  value={multiSelectionValues}
                  options={multiSelectOptions} // is = to subs
                  onChange={(selected) => {
                    console.log("selected multi-opt : ", selected);
                  }}
                  placeholder="Select sub-categories you like..."
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </div>
              <div className="flex flex-col gap-5">
                <TextBox
                  type="text"
                  label="Name"
                  placeholder="enter product name"
                  iconName="AtSign"
                  name="name"
                  onChange={handleChange}
                />
                <TextBox
                  type="text"
                  label="Description"
                  placeholder="enter product description"
                  iconName="AtSign"
                  name="description"
                  onChange={handleChange}
                />
                <TextBox
                  type="text"
                  label="Brand"
                  placeholder="enter brand name"
                  iconName="AtSign"
                  name="brand"
                  onChange={handleChange}
                />
                <TextBox
                  type="text"
                  label="SKU"
                  placeholder="enter product SKU/number"
                  iconName="AtSign"
                  name="sku"
                  onChange={handleChange}
                />
                <TextBox
                  type="number"
                  label="Discount"
                  min="0"
                  max="99"
                  placeholder="Discount"
                  iconName="AtSign"
                  name="discount"
                  onChange={handleChange}
                />

                {/* <Colors
                  name="color"
                  product={product}
                  setProduct={setProduct}
                  colorImage={colorImage}
                /> */}
                <StylePicker
                  name="styleInput"
                  product={product}
                  setProduct={setProduct}
                  styleImage={styleImage}
                  setStyleImage={setStyleImage}
                />

                <SizePicker
                  sizes={product.sizes}
                  product={product}
                  setProduct={setProduct}
                />
                <DetailsSetter
                  details={product.details}
                  product={product}
                  setProduct={setProduct}
                />
                <QuestionSetter
                  questions={product.questions}
                  product={product}
                  setProduct={setProduct}
                />
              </div>
              <div className="flex items-center justify-end mt-4">
                <Button
                  type="submit"
                  variant="default"
                  className="cursor-pointer flex gap-1 fixed right-12 bottom-4 shadow-lg"
                >
                  <Plus size={20} />
                  <span>Create Product</span>
                </Button>
              </div>

              {/* <TextBox
                type="password"
                // label="New Password"
                placeholder="enter new password"
                iconName="Lock"
                name="new_password"
                onChange={handleChange}
              />
              <TextBox
                type="password"
                // label="Confirm Password"
                placeholder="confirm new password"
                iconName="Lock"
                name="conf_password"
                onChange={handleChange}
              />
              <Button type="submit" className="w-full cursor-pointer">
                Reset
              </Button>
              <div>
                {error && <span className="text-red-600">{error}</span>}
                {success && <span className="text-green-600">{success}</span>}
              </div> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProduct;
