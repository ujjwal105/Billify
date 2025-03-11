import Accordion from "@/components/elements/Accordion";
import SimpleFormField from "@/components/elements/SimpleFormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PaymentInfoSchema, PaymentInfoType } from "@/lib/schema";
import { Form } from "@/components/ui/form";
import SignatureCanvas from "react-signature-canvas";
import { FilePen } from "lucide-react";
import { Eraser } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Input } from "@/components/ui/input";

function ShippingPartner({ activeState }: any) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [color, setColor] = useState("black");
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
  const clearSignature = () => {
    sigCanvas?.current?.clear();
  };

  const handleColorChange = (e: any) => {
    setColor(e.target.value);
  };
  const colors = ["black", "red", "green", "blue"];
  const handleSnapShot = () => {
    const data = sigCanvas?.current?.toDataURL();
    console.log(data);
  };

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
            <div>
              <Dialog>
                <DialogTrigger className="flex flex-col border-2 rounded-md p-6 items-center text-sm font-medium gap-2 cursor-pointer hover:border-blue-400 mt-4">
                  <FilePen />
                  Click to add signature
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Signature</DialogTitle>
                    <DialogDescription className="bg-gray-200 rounded-lg mt-3">
                      <SignatureCanvas
                        ref={sigCanvas}
                        penColor={color}
                        minWidth={2}
                        canvasProps={{
                          width: 460,
                          height: 300,
                          className: "sigCanvas",
                        }}
                      />
                    </DialogDescription>
                    <div className="flex justify-between items-center mt-4">
                      <Button onClick={clearSignature} variant={"outline"}>
                        <Eraser />
                        Erase
                      </Button>
                      <div onClick={handleColorChange} className="flex gap-2">
                        {colors.map((color) => {
                          return (
                            <div>
                              <Input
                                type="radio"
                                value={color}
                                name="color"
                                onChange={handleColorChange}
                                className={clsx(
                                  "border-0 rounded-full h-5 w-5",
                                  color === "red" && "text-red-500",
                                  color === "blue" && "accent-blue-700",
                                  color === "green" && "accent-green-600",
                                  color === "black" && "accent-black"
                                )}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <Button onClick={handleSnapShot}>Done</Button>
                    </div>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </form>
      </Form>
    </Accordion>
  );
}

export default ShippingPartner;
