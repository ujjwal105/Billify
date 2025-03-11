import { z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
//buyer Details Schema
export const buyerFormSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "First name is required" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Please enter alphabetic characters",
    }),
  lastName: z
    .string()
    .nonempty({ message: "Last name is required" })
    .regex(/^[A-Za-z]+$/, {
      message: "Please enter alphabetic characters",
    }),
  mobileNumber: z
    .string()
    .min(4, { message: "Mobile number is required" })
    .max(20, {
      message: "Mobile number should not be longer than 20 characters",
    })
    .regex(/^[0-9()+-]+$/, {
      message: "Only numbers,brackets, hypen and + allowed.",
    }),

  alternateMobileNumber: z
    .string()
    .max(20, {
      message: "Mobile number should not be long than 20 characters",
    })
    .optional(),
  email: z
    .string()
    .nonempty({ message: "Please enter a valid email address" })
    .email({ message: "Please enter a valid email address" }),
  address1: z
    .string()
    .nonempty({ message: "Address 1 is required" })
    .max(100, { message: "String must contain at most 100 character(s)" }),
  address2: z
    .string()
    .nonempty({ message: "Address 2 is required" })
    .max(100, { message: "String must contain at most 100 character(s)" }),
  landmark: z.string(),
  country: z.string().nonempty({ message: "Please select a country" }).max(25),
  addressSame: z.boolean(),
  state: z.string().nonempty({ message: "Please select a state" }),
  pinCode: z
    .string()
    .nonempty({ message: "Pincode is required" })
    .regex(/^[A-Za-z0-9\s]+$/, {
      message: "Pincode can only contain letters, numbers, and spaces",
    }),
  city: z
    .string()
    .nonempty({ message: "City is required" })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Only alphabets and spaces are allowed",
    }),
  billingPinCode: z
    .string()
    .nonempty({ message: "Pincode is required" })
    .regex(/^[A-Za-z0-9\s]+$/, {
      message: "Pincode can only contain letters, numbers, and spaces",
    }),
  billingCity: z
    .string()
    .nonempty({ message: "The customer billing city is required." })
    .regex(/^[A-Za-z\s]+$/, {
      message: "Only alphabets and spaces are allowed",
    }),
  billingFirstName: z
    .string()
    .nonempty({ message: "The customer shipping first name is required." })
    .max(25),
  billingLastName: z
    .string()
    .nonempty({ message: "The customer shipping first name is required." })
    .max(25),
  billingMobileNumber: z
    .string()
    .min(4, { message: "Mobile number is required" })
    .max(20, {
      message: "Mobile number should not be longer than 20 characters",
    })
    .regex(/^[0-9()+-]+$/, {
      message: "Only numbers,brackets, hypen and + allowed.",
    }),
  billingAddress1: z
    .string()
    .nonempty({ message: "Address 1 is required" })
    .max(100, { message: "String must contain at most 100 character(s)" }),
  billingAddress2: z
    .string()
    .nonempty({ message: "Address 2 is required" })
    .max(100, { message: "String must contain at most 100 character(s)" }),
  billingCountry: z.string().nonempty({ message: "Please select a country" }),
  billingState: z.string().nonempty({ message: "Please select a state" }),
  billingLandmark: z.string(),
});

//Order Details Schema
export const orderDetailsSchema = z.object({
  weight: z.coerce
    .string()
    .regex(/^(0\.[1-9]\d?|[1-9]\d{0,2}(\.\d{1,2})?|300(\.0{1,2})?)$/, {
      message: "Weight must be between 0.1 to 300 KG",
    }),
  length: z.coerce
    .string()
    .nonempty("Length must be at least 1 cm")
    .regex(
      /^(0[1-9]|[1-9][0-9]?|1[01][0-9]|120)$/,
      "Dimension must be between 1 and 120 cm"
    ),
  height: z.coerce
    .string()
    .nonempty("Height must be at least 1 cm.")
    .regex(
      /^(0[1-9]|[1-9][0-9]?|1[01][0-9]|120)$/,
      "Dimension must be between 1 and 120 cm"
    ),
  breath: z.coerce
    .string()
    .nonempty("Breadth must be at least 1 cm.")
    .regex(
      /^(0[1-9]|[1-9][0-9]?|1[01][0-9]|120)$/,
      "Dimension must be between 1 and 120 cm"
    ),
  invoiceNumber: z
    .string()
    .nonempty("Please enter invoice number")
    .max(30, "String must contain at most 30 character(s)")
    .regex(/^[A-Za-z0-9]+$/, {
      message: "Only alphabets and numbers are allowed",
    }),
  invoiceDate: z.coerce.date(),
  invoiceCurrency: z.string().min(1, "Invoice currency is required"),
  orderId: z.string(),
  IOSS: z.string(),
  logo: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  itemDetails: z.array(
    z.object({
      productName: z.string().nonempty("Product name is required"),
      SKU: z.string(),
      HSN: z
        .string()
        .max(8, { message: "HSN must be 8 digits long" })
        .min(8, { message: "HSN must be 8 digits long" })
        .regex(/^\d+$/, { message: "Please enter numeric values only" }),
      Qty: z
        .string()
        .nonempty("Quantity must not be zero")
        .regex(/^([1-9][0-9]*|0[1-9][0-9]*)$/, "Quantity must not be zero"),
      unitPrice: z
        .string()
        .nonempty("Unit Price must not be zero")
        .regex(/^([1-9][0-9]*|0[1-9][0-9]*)$/, "Unit Price must not be zero"),
      IGST: z.string(),
    })
  ),
});

//consignor Details Schema

export const ConsignorDetailsSchema = z.object({
  pickupAddress: z.string().nonempty({ message: "Please select a customer" }),
});

export type ConsignorFormType = z.infer<typeof ConsignorDetailsSchema>;

export type BuyerFormType = z.infer<typeof buyerFormSchema>;

export type OrderDetailsType = z.infer<typeof orderDetailsSchema>;

export type PaymentInfoType = z.infer<typeof PaymentInfoSchema>;

export const PaymentInfoSchema = z.object({
  bankName: z.string().nonempty({ message: "Bank name is required" }),
  accountName: z.string().nonempty({ message: "Account name is required" }),
  accountNumber: z.string().nonempty({ message: "Account number is required" }),
});
