export const addressFrameworks = [
  {
    value:
      "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045-8392328932",
    label:
      "Head OFFICE, mahipalpur, Indira Park, South West Delhi, Delhi-110045-8392328932",
  },
];
export const igstFrameworks = [
  {
    value: "0",
    label: "0%",
  },
  {
    value: "3",
    label: "3%",
  },
  {
    value: "5",
    label: "5%",
  },
  {
    value: "12",
    label: "12%",
  },
  {
    value: "18",
    label: "18%",
  },
  {
    value: "28",
    label: "28%",
  },
];

export const currencyFrameworks = [
  { label: "AED", value: "AED" },
  { label: "AUD", value: "AUD" },
  { label: "CAD", value: "CAD" },
  { label: "EUR", value: "EUR" },
  { label: "GBP", value: "GBP" },
  { label: "INR", value: "INR" },
  { label: "SAR", value: "SAR" },
  { label: "USD", value: "USD" },
];

export const countryStateFrameWork = [
  {
    value: "Queensland",
    label: "Queensland",
  },
  {
    value: "Sydney",
    label: "Sydney",
  },
  {
    value: "Melbourne",
    label: "Melbourne",
  },
];

interface ShippingPartner {
  id: string;
  name: string;
  price: number;
  transitTime: string;
  hasDuties?: boolean;
  recommended?: boolean;
  document?: boolean;
}

export const shippingPartners: ShippingPartner[] = [
  {
    id: "shipglobal",
    name: "ShipGlobal Direct",
    price: 6000,
    transitTime: "12 - 18 Days",
    recommended: true,
    document: true,
  },
  {
    id: "ups-promotional",
    name: "UPS Promotional",
    price: 12000,
    transitTime: "4 - 7 Days",
    hasDuties: true,
  },
  {
    id: "dhl",
    name: "DHL Express",
    price: 15000,
    transitTime: "4 - 7 Days",
    hasDuties: true,
  },
  {
    id: "ups",
    name: "UPS",
    price: 20000,
    transitTime: "4 - 7 Days",
    hasDuties: true,
  },
];
