import { Card } from "@/components/ui/card";
import InvoiceCardLayout from "./InvoiceCard/InvoiceCardLayout";

function Invoice() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 m-4">
      <div className="w-full lg:w-1/2">
        <InvoiceCardLayout />
      </div>
      <Card className="w-full lg:w-1/2">Card2</Card>
    </div>
  );
}

export default Invoice;
