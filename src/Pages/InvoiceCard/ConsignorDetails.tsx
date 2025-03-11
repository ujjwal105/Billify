import SimpleFormField from "@/components/elements/SimpleFormField";
import { addressFrameworks } from "../../lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Accordion from "@/components/elements/Accordion";
import { ConsignorDetailsSchema } from "../../lib/schema";

function ConsignorDetails({ activeState, setActiveState }: any) {
  type ConsignorFormType = z.infer<typeof ConsignorDetailsSchema>;

  const ConsignorDetailsForm = useForm<ConsignorFormType>({
    resolver: zodResolver(ConsignorDetailsSchema),
    defaultValues: {
      pickupAddress: "",
    },
  });

  const handleConsignorDetails = (data: ConsignorFormType) => {
    localStorage.setItem("ConsignorData", JSON.stringify(data));
    console.log(data);
    setActiveState(2);
  };

  const customerSelected = ConsignorDetailsForm.watch("pickupAddress");

  return (
    <Accordion
      title="Consignor Details"
      stepNum={1}
      activeState={activeState}
      setActiveState={setActiveState}
    >
      <div className="p-4">
        <Form {...ConsignorDetailsForm}>
          <form
            onSubmit={ConsignorDetailsForm.handleSubmit(handleConsignorDetails)}
            noValidate
          >
            <SimpleFormField
              form={ConsignorDetailsForm}
              type="popover-select"
              label="Search Customer"
              name="pickupAddress"
              placeholder="Select address . . ."
              framework={addressFrameworks}
              className="w-4/5"
            />

            <div className="mt-5 lg:justify-between lg:flex">
              <div className="gap-4 text-sm lg:ml-2 lg:justify-around lg:flex">
                {customerSelected && (
                  <div>
                    <h1 className="font-semibold text-black">
                      Selected Customer
                    </h1>
                    <h2 className="text-xs font-medium text-gray-500">
                      {addressFrameworks.find(
                        (opt) => opt.value === customerSelected
                      )?.label || customerSelected}
                    </h2>
                  </div>
                )}
              </div>
              <div className="flex items-end justify-end mt-4">
                <Button
                  type="submit"
                  // variant={"secondaryShipping"}
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

export default ConsignorDetails;
