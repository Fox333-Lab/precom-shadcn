import db from "@/lib/db";
import { filterArray, randomizeArray, removeDuplicates } from "@/lib/utils";
import Category from "@/models/db/category";
import Product from "@/models/db/product";
import SubCategory from "@/models/db/subcategory";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("In api/products/details/browse GET");
  // search query starts here
  let searchQuery = req.nextUrl.searchParams.get("search");
  console.log("first searchQuery : ", searchQuery);
  searchQuery = searchQuery == "null" || searchQuery == null ? "" : searchQuery;
  console.log("first searchQuery : ", searchQuery);
  // category query starts here
  let categoryQuery = req.nextUrl.searchParams.get("category");
  console.log("first categoryQuery : ", categoryQuery);
  categoryQuery =
    categoryQuery == "null" || categoryQuery == null ? "" : categoryQuery;
  console.log("first categoryQuery : ", categoryQuery);
  // brand query starts here
  let brandQuery = req.nextUrl.searchParams.get("brand");
  console.log("first brandQuery : ", brandQuery);
  brandQuery = brandQuery == "null" || brandQuery == null ? "" : brandQuery;
  console.log("first brandQuery : ", brandQuery);
  let selectedBrandsList = brandQuery != "" ? brandQuery?.split("_") : null;
  console.log("first selectedBrandsList : ", selectedBrandsList);
  brandQuery = "";
  selectedBrandsList?.forEach((brand: string) => {
    brandQuery += `^${brand}|`;
  });
  brandQuery = brandQuery.slice(0, -1);
  console.log("first brandSearchRegex : ", brandQuery);
  // color query starts here
  let colorQuery = req.nextUrl.searchParams.get("color");
  console.log("first colorQuery : ", colorQuery);
  colorQuery = colorQuery == "null" || colorQuery == null ? "" : colorQuery;
  console.log("first colorQuery : ", colorQuery);
  let selectedColorsList = colorQuery != "" ? colorQuery?.split("_") : null;
  console.log("first selectedColorsList : ", selectedColorsList);
  colorQuery = "";
  selectedColorsList?.forEach((color: string) => {
    colorQuery += `^${color}|`;
  });
  colorQuery = colorQuery.slice(0, -1);
  console.log("first colorSearchRegex : ", colorQuery);
  // size query starts here
  let sizeQuery = req.nextUrl.searchParams.get("size");
  console.log("first sizeQuery : ", sizeQuery);
  sizeQuery = sizeQuery == "null" || sizeQuery == null ? "" : sizeQuery;
  console.log("first sizeQuery : ", sizeQuery);
  let selectedSizesList = sizeQuery != "" ? sizeQuery?.split("_") : null;
  console.log("first selectedSizesList : ", selectedSizesList);
  sizeQuery = "";
  selectedSizesList?.forEach((size: string) => {
    sizeQuery += `^${size}|`;
  });
  sizeQuery = sizeQuery.slice(0, -1);
  console.log("first sizeSearchRegex : ", sizeQuery);
  // price query starts here
  let minPriceQuery = req.nextUrl.searchParams.get("min");
  let maxPriceQuery = req.nextUrl.searchParams.get("max");
  // console.log("first priceQuery : ", priceQuery);
  minPriceQuery =
    minPriceQuery == "null" || minPriceQuery == null ? "0" : minPriceQuery;
  maxPriceQuery =
    maxPriceQuery == "null" || maxPriceQuery == null ? "0" : maxPriceQuery;
  // console.log("first priceQuery : ", priceQuery);
  // let priceRange = priceQuery != "" ? priceQuery?.split("_") : null;
  // console.log("first priceRange : ", priceRange);
  // let minPrice = priceRange != null ? priceRange[0] : "0";
  // let maxPrice = priceRange != null ? priceRange[1] : "0";
  let minPrice = minPriceQuery;
  let maxPrice = maxPriceQuery;
  console.log("first minPrice : ", minPrice);
  console.log("first maxPrice : ", Number(maxPrice));
  // sort query starts here
  let sortQuery = req.nextUrl.searchParams.get("sort");
  console.log("first sortQuery : ", sortQuery);
  sortQuery = sortQuery == "null" || sortQuery == null ? "" : sortQuery;
  console.log("first sortQuery : ", sortQuery);
  // building search criterias
  const search = searchQuery
    ? {
        name: { $regex: searchQuery, $options: "i" },
      }
    : {};
  console.log("first search : ", search);
  const category = categoryQuery
    ? {
        category: categoryQuery,
      }
    : {};
  console.log("first category : ", category);
  const brand = brandQuery
    ? {
        brand: { $regex: brandQuery, $options: "i" },
      }
    : {};
  console.log("first brand : ", brand);
  const color = colorQuery
    ? {
        "subProducts.color.color": { $regex: colorQuery, $options: "i" },
      }
    : {};
  console.log("first color : ", color);
  const size = sizeQuery
    ? {
        "subProducts.sizes.size": { $regex: sizeQuery, $options: "i" },
      }
    : {};
  console.log("first size : ", size);
  const price =
    minPrice && maxPrice
      ? {
          "subProducts.sizes.price": {
            $gte: Number(minPrice) || 0,
            $lte: Number(maxPrice) || Infinity,
          },
        }
      : {};
  console.log("first price : ", price);
  const sort: any =
    sortQuery == ""
      ? {}
      : sortQuery == "popular"
      ? { "subProducts.sold": -1, rating: -1 }
      : sortQuery == "newest"
      ? { createdAt: -1 }
      : sortQuery == "topSelling"
      ? { "subProducts.sold": -1 }
      : sortQuery == "topReviewed"
      ? { rating: -1 }
      : sortQuery == "priceLowToHigh"
      ? { "subProducts.sizes.price": 1 }
      : sortQuery == "priceHighToLow"
      ? { "subProducts.sizes.price": -1 }
      : {};
  console.log("first sort : ", sort);
  try {
    await db.ConnectDB();
    let productsDb = await Product.find({
      ...search,
      ...category,
      ...brand,
      ...size,
      ...price,
      ...color,
    })
      .sort(sort)
      .lean();
    if (!productsDb) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "products not found" },
        { status: 404 }
      );
    }
    let products =
      sortQuery && sortQuery != "" ? productsDb : randomizeArray(productsDb);
    let categories = await Category.find().lean();
    let subCategories = await SubCategory.find()
      .populate({ path: "parent", model: Category })
      .lean();
    let colors = await Product.find({ ...category }).distinct(
      "subProducts.color.color"
    );
    let brandsDb = await Product.find({ ...category }).distinct("brand");
    let sizes = await Product.find({ ...category }).distinct(
      "subProducts.sizes.size"
    );
    let details = await Product.find({ ...category }).distinct("details");
    let stylesDb = filterArray(details, "Style");
    let patternsDb = filterArray(details, "Pattern type");
    let materialsDb = filterArray(details, "Material");
    let styles = removeDuplicates(stylesDb);
    let patterns = removeDuplicates(patternsDb);
    let materials = removeDuplicates(materialsDb);
    let brands = removeDuplicates(brandsDb);
    console.log(styles);
    await db.DisconnectDB();
    return NextResponse.json(
      { products, categories, subCategories, sizes, colors, brands, styles },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("catch : api/products/details/browse failed : ", err.message);
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
