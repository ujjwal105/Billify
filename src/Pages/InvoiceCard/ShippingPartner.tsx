import Accordion from "@/components/elements/Accordion";
import SimpleFormField from "@/components/elements/SimpleFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PaymentInfoSchema, PaymentInfoType } from "@/lib/schema";
import { Form } from "@/components/ui/form";

function ShippingPartner({ activeState }: any) {
  const handleSubmit = () => {
    console.log("Form submitted");
  };
  const PaymentInfoForm = useForm<PaymentInfoType>({
    resolver: zodResolver(PaymentInfoSchema),
    defaultValues: {
      bankName: "",
      accountName: "",
      accountNumber: "",
    },
  });
  return (
    <Accordion
      title="Payment Information & Additional"
      stepNum={4}
      activeState={activeState}
    >
      <Form {...PaymentInfoForm}>
        <form onSubmit={PaymentInfoForm.handleSubmit(handleSubmit)} noValidate>
          <div>
            <h1 className="text-base font-bold">Payment Information</h1>
            <div className="grid grid-cols-3 mt-2 gap-4">
              <SimpleFormField
                form={PaymentInfoForm}
                label="Bank Name"
                type="text"
                required
                name="bankName"
                placeholder="Enter Bank Name . . ."
              />
              <SimpleFormField
                form={PaymentInfoForm}
                label="Account Name"
                type="text"
                required
                name="accountName"
                placeholder="Enter Account Name . . ."
                className="mb-2"
              />
              <SimpleFormField
                form={PaymentInfoForm}
                label="Account Number"
                type="text"
                name="accountNumber"
                required
                placeholder="Enter Account Number . . ."
                className="mb-2"
              />
            </div>
            <h1 className="text-base font-bold mt-4">Summary</h1>
          </div>
        </form>
      </Form>
    </Accordion>
  );
}

export default ShippingPartner;

