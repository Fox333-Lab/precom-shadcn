import { useField } from "formik";
import React, { useEffect, useState } from "react";
import { extractColors } from "extract-colors";
import { FinalColor } from "extract-colors/lib/types/Color";

const Colors = ({ product, setProduct, colorImage, ...props }: any) => {
  const [toggle, setToggle] = useState(false);
  const [colors, setColors] = useState([] as string[]);
  const [finalColors, setFinalColors] = useState([] as FinalColor[]);
  const [field, meta] = useField(props);

  useEffect(() => {
    if (colorImage) {
      extractColors(colorImage).then((allcolors) => {
        console.log("useeffect allcolors : ", allcolors);

        setFinalColors(allcolors);
        console.log("useeffect finalColors : ", finalColors);
      });
    }
  }, [colorImage]);

  const renderSwatches = async () => {
    if (colorImage) {
      //   extractColors(colorImage).then((allcolors) => {
      //     allcolors.map((color: any) => colorsArr.push(color.hex.toString()));

      //     console.log("colorsArr : ", colorsArr);

      //   });
      const colorsArr = await extractColors(colorImage);
      //   console.log("ress : ", colorsArr);

      return colorsArr.map((color, index) => {
        console.log("render swatches color : ", color.hex.toString());
        return (
          <div
            key={index}
            className="w-4 h-4 rounded-full cursor-pointer"
            style={{ backgroundColor: color.hex.toString() }}
            onClick={() => {
              setProduct({
                ...product,
                color: {
                  color: color.hex.toString(),
                  image: product.color.image,
                },
              });
            }}
          ></div>
        );
      });
    }
  };
  return (
    <div>
      {/* <input
        type="text"
        name={field.name}
        hidden
        value={product.color.color}
        {...props}
      /> */}

      {finalColors && (
        <div className="flex gap-1 items-center justify-center mt-4">
          {finalColors.map((color, i) => {
            return (
              <div
                key={i}
                className="w-4 h-4 rounded-full cursor-pointer border border-gray-400"
                style={{ backgroundColor: color.hex.toString() }}
                onClick={() => {
                  setProduct({
                    ...product,
                    color: {
                      color: color.hex.toString(),
                      image: product.color.image,
                    },
                  });
                }}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Colors;
