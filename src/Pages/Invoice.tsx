import { Card } from "@/components/ui/card";
import Stepper from "./InvoiceCard/Stepper";

function Invoice() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 m-4">
      <div className="w-full lg:w-1/2">
        <Stepper />
      </div>
      <Card className="w-full lg:w-1/2 flex items-center justify-center dark:bg-gray-950">Card2</Card>
    </div>
  );
}

export default Invoice;
