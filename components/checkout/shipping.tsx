"use client";
import React from "react";
import { countries } from "@/data/countries";
import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import "yup-phone-lite";
import { SingularSelect, TextBox } from "../inputs";
import {
  ShippingInitialValueTypes,
  ShippingInputTypes,
} from "@/types/validation/shipping";
import { Button } from "../ui/button";
import IUser, { IAddress } from "@/types/db/user";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { Para } from "../ui/textui";
import {
  changeActiveAddress,
  deleteAddress,
  saveAddressToDB,
} from "@/lib/functions/shipping";

const initialValues: ShippingInputTypes = {
  firstname: "",
  lastname: "",
  phoneNumber: "",
  state: "",
  city: "",
  zipcode: "",
  address1: "",
  address2: "",
  country: "",
};

type ShippingPropsTypes = {
  // selectedAddress: IAddress;
  // setSelectedAddress: React.Dispatch<React.SetStateAction<IAddress>>;
  user: IUser;
  addresses: IAddress[];
  setAddresses: React.Dispatch<React.SetStateAction<IAddress[]>>;
};

const Shipping = ({
  // selectedAddress,
  // setSelectedAddress,
  user,
  addresses,
  setAddresses,
}: ShippingPropsTypes) => {
  const [shipping, setShipping] = useState(initialValues);
  const [isVisible, setIsVisible] = useState(false);
  const {
    firstname,
    lastname,
    phoneNumber,
    state,
    city,
    zipcode,
    address1,
    address2,
    country,
  } = shipping;
  const validate = Yup.object({
    firstname: Yup.string()
      .required("firstname required")
      .min(3, "required 3 charcaters minimum")
      .max(20, "cannot be more than 20 chars"),
    lastname: Yup.string()
      .required("lastname required")
      .min(3, "required 3 charcaters minimum")
      .max(20, "cannot be more than 20 chars"),
    phoneNumber: Yup.string()
      .required("phonenumber required")
      .phone()
      .min(3, "required 3 charcaters minimum")
      .max(20, "cannot be more than 20 chars"),
    state: Yup.string()
      .required("state required")
      .min(3, "required 3 charcaters minimum")
      .max(20, "cannot be more than 20 chars"),
    city: Yup.string()
      .required("city required")
      .min(3, "required 3 charcaters minimum")
      .max(20, "cannot be more than 20 chars"),
    zipcode: Yup.string()
      .required("zipcode required")
      .min(2, "required 2 charcaters minimum")
      .max(30, "must be less than 30 chars"),
    address1: Yup.string()
      .required("address1 required")
      .min(5, "required 5 charcaters minimum")
      .max(100, "cannot be more than 100 chars"),
    address2: Yup.string()
      .required("address2 required")
      .min(5, "required 5 charcaters minimum")
      .max(100, "cannot be more than 100 chars"),
    country: Yup.string().required("country required"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };
  const handleSelectChange = (value: string) => {
    console.log(value);
    setShipping({ ...shipping, country: value });
  };

  const saveShippingHandler = async () => {
    console.log("In saveShippingHandler");
    const res = await saveAddressToDB(shipping, user?._id.toString());
    //setAddresses([...addresses, res.address]);
    setAddresses(res.addresses);
    setShipping(initialValues);
    setIsVisible(false);
    //setSelectedAddress(res.address);
  };
  const handleActiveClick = () => {
    console.log("clicked");
    setIsVisible(true);
  };
  // const handleSelectedAddr = (e: any) => {
  //   let addr = addresses.find(
  //     (address) => address._id.toString() == e
  //   ) as IAddress;
  //   setSelectedAddress(addr);
  // };
  const changeActiveHandler = async (id: string) => {
    console.log("changeActiveHandler : ", id);
    const res = await changeActiveAddress(id);
    console.log("active res : ", res.addresses);
    setAddresses(res.addresses);
  };

  const deleteAddressHandler = async (id: string) => {
    console.log("deleteAddressHandler : ", id);
    const res = await deleteAddress(id);
    console.log("delete res : ", res.addresses);
    setAddresses(res.addresses);
  };
  return (
    <div>
      <div className="">
        <RadioGroup defaultValue="" onValueChange={changeActiveHandler}>
          {addresses.map((address, i) => {
            if (address?._id) {
              return (
                <Card
                  key={i}
                  className={cn("shadow-none", {
                    "border-green-300": address.active == true,
                  })}
                >
                  <CardHeader className="pb-1">
                    <CardTitle className="flex gap-2 items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <RadioGroupItem
                          value={address._id.toString()}
                          id={i.toString()}
                          checked={address.active ? true : false}
                          className={cn("", {
                            "animate-c-pulse2": address.active == true,
                          })}
                        />
                        <Label
                          htmlFor={i.toString()}
                          className="tracking-normal"
                        >
                          {address.firstname} {address.lastname}
                        </Label>
                      </div>
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="rounded-full"
                        title="delete"
                        onClick={() =>
                          deleteAddressHandler(address._id.toString())
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="ml-6 tracking-wide text-md text-muted-foreground">
                    <Para>
                      {address.address1}, {address.address2}, {address.city},
                      {address.state}, ${address.zipcode?.toString()},
                      {address.country}
                    </Para>
                  </CardContent>
                  {address.active && (
                    <CardFooter>
                      <div className="animate-c-pulse2 text-xs px-2 py-0.5 font-medium text-white tracking-wide bg-green-500 inline-block rounded-full shadow-[0_0_1px_1px_rgba(0, 0, 0, 0.1)]">
                        active
                      </div>
                    </CardFooter>
                  )}
                </Card>
              );
            }
          })}
        </RadioGroup>
      </div>
      <div className={cn("hidden", { block: isVisible == true })}>
        <Formik
          enableReinitialize
          initialValues={{
            firstname,
            lastname,
            phoneNumber,
            state,
            city,
            zipcode,
            address1,
            address2,
            country,
          }}
          validationSchema={validate}
          onSubmit={() => {
            saveShippingHandler();
          }}
        >
          {(props: FormikProps<ShippingInputTypes>) => (
            <Form>
              <div className="flex flex-col gap-4 mt-7">
                <SingularSelect
                  name="country"
                  // value={country}
                  placeholder="country"
                  handleChange={handleSelectChange}
                  data={countries}
                />
                <TextBox
                  type="text"
                  label="First Name"
                  name="firstname"
                  placeholder="First Name"
                  onChange={handleChange}
                  iconName="User"
                />
                <TextBox
                  type="text"
                  label="Last Name"
                  name="lastname"
                  placeholder="Last Name"
                  onChange={handleChange}
                  iconName="User"
                />
                <TextBox
                  type="text"
                  label="State"
                  name="state"
                  placeholder="State"
                  onChange={handleChange}
                  iconName="User"
                />
                <TextBox
                  type="text"
                  label="City"
                  name="city"
                  placeholder="City"
                  onChange={handleChange}
                  iconName="User"
                />
                <TextBox
                  type="text"
                  label="Phonenumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  iconName="User"
                />
                <TextBox
                  type="text"
                  label="Zipcode"
                  name="zipcode"
                  placeholder="Zip Code"
                  onChange={handleChange}
                  iconName="User"
                />
                <TextBox
                  type="text"
                  label="Address1"
                  name="address1"
                  placeholder="Address1"
                  onChange={handleChange}
                  iconName="User"
                />
                <TextBox
                  type="text"
                  label="Address2"
                  name="address2"
                  placeholder="Address2"
                  onChange={handleChange}
                  iconName="User"
                />
                <Button type="submit">Save Address</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Button
        variant="outline"
        className="mt-5 flex gap-1"
        onClick={handleActiveClick}
      >
        <Plus />
        <span>Add Address</span>
      </Button>
    </div>
  );
};

export default Shipping;
