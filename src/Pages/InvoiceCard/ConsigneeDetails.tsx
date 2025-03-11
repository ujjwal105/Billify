import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SimpleFormField from "@/components/elements/SimpleFormField";
import Accordion from "@/components/elements/Accordion";
import { Label } from "@radix-ui/react-label";
import { useCountries, useStates } from "./CountryStateApi";
import { buyerFormSchema } from "@/lib/schema";

interface CountryDetail {
  code: string;
  label: string;
}

type BuyerFormType = z.infer<typeof buyerFormSchema>;

function ConsigneeDetails({ activeState, setActiveState }: any) {
  const [addressSame, setAddressSame] = useState(true);
  const { countries } = useCountries();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedBillingCountry, setSelectedBillingCountry] = useState("");
  const shippingStates = useStates(selectedCountry);
  const billingStates = useStates(selectedBillingCountry);

  const initialConsigneeDetails = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    address1: "",
    address2: "",
    pinCode: "",
    city: "",
    landmark: "",
    country: "",
    alternateMobileNumber: "",
    state: "",
    addressSame: true,
    billingFirstName: "",
    billingLastName: "",
    billingMobileNumber: "",
    billingPinCode: "",
    billingCity: "",
    billingCountry: "",
    billingAddress2: "",
    billingAddress1: "",
    billingState: "",
    billingLandmark: "",
  };

  const buyersDetailsForm = useForm<BuyerFormType>({
    resolver: zodResolver(buyerFormSchema),
    defaultValues: initialConsigneeDetails,
  });

  const [countryDetails, setCountryDetails] = useState<{
    shipping: CountryDetail | null;
    billing: CountryDetail | null;
  }>({
    shipping: null,
    billing: null,
  });

  const handleBuyerDetails = (data: BuyerFormType) => {
    if (countryDetails.shipping) {
      localStorage.setItem(
        "shippingCountry",
        JSON.stringify(countryDetails.shipping)
      );
    }
    if (countryDetails.billing) {
      localStorage.setItem(
        "billingCountry",
        JSON.stringify(countryDetails.billing)
      );
    }
    console.log(data);
    localStorage.setItem("consigneeData", JSON.stringify(data));
    setActiveState(3);
  };

  const handleAddressCheckbox = () => {
    setAddressSame(!addressSame);
    console.log(addressSame);
    localStorage.setItem("addressSame", JSON.stringify(addressSame));
  };

  useEffect(() => {
    if (addressSame) {
      const fieldsToUpdate = [
        "firstName",
        "lastName",
        "mobileNumber",
        "address1",
        "address2",
        "landmark",
        "pinCode",
        "city",
        "country",
        "state",
      ];
      fieldsToUpdate.forEach((field) => {
        buyersDetailsForm.setValue(
          `billing${field.charAt(0).toUpperCase() + field.slice(1)}` as any,
          buyersDetailsForm.getValues(field as any)
        );
      });
    }
  }, [addressSame, buyersDetailsForm]);

  useEffect(() => {
    const countryState = buyersDetailsForm.watch((value, { name }) => {
      if (name === "country") {
        setSelectedCountry(value.country || "");
        buyersDetailsForm.setValue("state", "");
        const selectedCountryDetails = countries.find(
          (country) => country.code === value.country
        );
        if (selectedCountryDetails) {
          setCountryDetails((prev) => ({
            ...prev,
            shipping: {
              code: selectedCountryDetails.code,
              label: selectedCountryDetails.name,
            },
          }));
        }
      }
      if (name === "billingCountry") {
        setSelectedBillingCountry(value.billingCountry || "");
        buyersDetailsForm.setValue("billingState", "");
        const selectedBillingCountryDetails = countries.find(
          (country) => country.code === value.billingCountry
        );
        if (selectedBillingCountryDetails) {
          setCountryDetails((prev) => ({
            ...prev,
            billing: {
              code: selectedBillingCountryDetails.code,
              label: selectedBillingCountryDetails.name,
            },
          }));
        }
      }
    });
    return () => countryState.unsubscribe();
  }, [buyersDetailsForm, countries]);

  return (
    <Accordion
      title="Consignee Details"
      stepNum={2}
      activeState={activeState}
      setActiveState={setActiveState}
    >
      <div className="w-full p-4">
        <Form {...buyersDetailsForm}>
          <form
            onSubmit={buyersDetailsForm.handleSubmit(handleBuyerDetails)}
            noValidate
          >
            <h1 className="font-bold">Buyer's Personal Details</h1>
            <div className="text-sm">
              <div className="gap-4 mt-2 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="First name"
                  type="text"
                  required
                  name="firstName"
                  placeholder="First name . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Last name"
                  type="text"
                  required
                  name="lastName"
                  placeholder="Last name . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Mobile No."
                  type="text"
                  required
                  name="mobileNumber"
                  placeholder="Type number . . ."
                />

                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Alternate Mobile No."
                  type="text"
                  name="alternateMobileNumber"
                  placeholder="Type number . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Email Id"
                  type="text"
                  required
                  name="email"
                  placeholder="Type mail id . . ."
                />
              </div>
              <h1 className="pt-6 text-sm font-bold">Buyer Shipping Details</h1>
              <div className="gap-4 mt-2 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3">
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Address 1"
                  type="text"
                  required
                  name="address1"
                  placeholder="Type address . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Address 2"
                  type="text"
                  required
                  name="address2"
                  placeholder="Type address . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Landmark"
                  type="text"
                  name="landmark"
                  placeholder="Type landmark . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Country"
                  type="popover-select"
                  required
                  name="country"
                  framework={countries.map(
                    (country: { name: string; code: string }) => ({
                      label: country.name,
                      value: country.code,
                    })
                  )}
                  placeholder="Select country . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="State"
                  type="popover-select"
                  required
                  name="state"
                  placeholder="Select state . . ."
                  framework={shippingStates.states.map(
                    (state: { name: string; code: string }) => ({
                      label: state.name,
                      value: state.code,
                    })
                  )}
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="City"
                  type="text"
                  required
                  name="city"
                  placeholder="Type city . . ."
                />
                <SimpleFormField
                  form={buyersDetailsForm}
                  label="Pincode"
                  type="text"
                  required
                  name="pinCode"
                  className="lg:mt-2"
                  placeholder="Type pincode . . ."
                />
              </div>
              <Label
                htmlFor="addressSame"
                className="flex items-center gap-2 pt-6 space-x-2 text-sm cursor-pointer"
              >
                <Checkbox
                  id="addressSame"
                  checked={addressSame}
                  onCheckedChange={handleAddressCheckbox}
                />
                <span className="text-sm cursor-pointer">
                  Shipping & Billing Address are same.
                </span>
              </Label>

              {!addressSame && (
                <div>
                  <h1 className="mt-6 text-sm font-bold">
                    Buyer Billing Details
                  </h1>
                  <div className="gap-4 mt-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3">
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="First name"
                      type="text"
                      required
                      name="billingFirstName"
                      placeholder="Enter last name . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Last name"
                      type="text"
                      required
                      name="billingLastName"
                      placeholder="Enter first name . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Mobile No."
                      type="text"
                      required
                      name="billingMobileNumber"
                      placeholder="Enter mobile number . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Address 1"
                      type="text"
                      required
                      name="billingAddress1"
                      placeholder="Enter house number . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Address 2"
                      type="text"
                      name="billingAddress2"
                      placeholder="Enter Address 2 . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Landmark"
                      type="text"
                      required
                      name="billingLandmark"
                      placeholder="Enter Landmark . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Country"
                      type="popover-select"
                      required
                      name="billingCountry"
                      placeholder="Select country . . ."
                      framework={countries.map(
                        (country: { name: string; code: string }) => ({
                          label: country.name,
                          value: country.code,
                        })
                      )}
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="State"
                      type="popover-select"
                      required
                      name="billingState"
                      placeholder="Select state . . ."
                      framework={billingStates.states.map(
                        (state: { name: string; code: string }) => ({
                          label: state.name,
                          value: state.code,
                        })
                      )}
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="City"
                      type="text"
                      required
                      name="billingCity"
                      placeholder="Enter city . . ."
                    />
                    <SimpleFormField
                      form={buyersDetailsForm}
                      label="Pincode"
                      type="text"
                      required
                      name="billingPinCode"
                      placeholder="Enter pincode . . ."
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-end pt-4">
                <Button
                  // variant={"secondaryShipping"}
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Accordion>
  );
}

export default ConsigneeDetails;
