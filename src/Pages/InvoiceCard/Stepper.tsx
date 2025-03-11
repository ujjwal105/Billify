import {  useState } from "react";
import ConsigneeDetails from "./ConsigneeDetails";
import ConsignorDetails from "./ConsignorDetails";
import ShipmentInformation from "./ShipmentInformation";
import ShippingPartner from "./ShippingPartner";
import InvoiceCardLayout from "./InvoiceCardLayout";

const Stepper = () => {
  const [activeState, setActiveState] = useState(() => {
    const storeActiveState = localStorage.getItem("currentActiveStep");
    return storeActiveState ? JSON.parse(storeActiveState) : 1;
  });
  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem("formdata");
    return storedData
      ? JSON.parse(storedData)
      : {
          ConsignorDetails: {
            pickupAddress: "",
          },
          ConsigneeDetails: {
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
          },
          ShipmentInformation: {
            weight: "",
            length: "",
            height: "",
            breath: "",
            invoiceNumber: "",
            invoiceDate: undefined,
            invoiceCurrency: "INR",
            orderId: "",
            IOSS: "",
            logo: "",
            itemDetails: [
              {
                productName: "",
                SKU: "",
                HSN: "",
                Qty: "",
                unitPrice: "",
                IGST: "",
              },
            ],
          },
          ShippingPartner: {

          },
        };
  });

  //   useEffect(() => {
  //     const storeConsignorData = localStorage.getItem("ConsignorData");
  //     const storeConsigneeData = localStorage.getItem("consigneeData");
  //     const storeShipmentInfo = localStorage.getItem("ShipmentInfo");
  //     const storeShippingPartner = localStorage.getItem("shippingPartner");
  //     // console.log("Data saved to localStorage", formData);
  //     setFormData((prevFormData: any) => ({
  //       ...prevFormData,
  //       ConsignorDetails: storeConsignorData
  //         ? JSON.parse(storeConsignorData)
  //         : prevFormData.ConsignorDetails,
  //       ConsigneeDetails: storeConsigneeData
  //         ? JSON.parse(storeConsigneeData)
  //         : prevFormData.ConsigneeDetails,
  //       ShipmentInformation: storeShipmentInfo
  //         ? JSON.parse(storeShipmentInfo)
  //         : prevFormData.ShipmentInformation,
  //       ShippingPartner: storeShippingPartner
  //         ? JSON.parse(storeShippingPartner)
  //         : prevFormData.ShippingPartner,
  //     }));
  //   }, [formData]);

  return (
    <InvoiceCardLayout>
      <div className="flex justify-between gap-4">
        <div className="w-full max-h-screen space-y-2 overflow-y-auto">
          <ConsignorDetails
            setActiveState={setActiveState}
            activeState={activeState}
            formData={formData}
            setFormData={setFormData}
          />
          <ConsigneeDetails
            setActiveState={setActiveState}
            activeState={activeState}
            formData={formData}
            setFormData={setFormData}
          />
          <ShipmentInformation
            setActiveState={setActiveState}
            activeState={activeState}
            formData={formData}
            setFormData={setFormData}
          />
          <ShippingPartner
            setActiveState={setActiveState}
            activeState={activeState}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      </div>
    </InvoiceCardLayout>
  );
};

export default Stepper;
