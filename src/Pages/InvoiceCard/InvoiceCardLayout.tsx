import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function InvoiceCardLayout() {
  return (
    <Card className="p-4">
      <div>
        <h1 className="font-semibold text-lg gap-3 flex items-center">
          INVOICE
          <Badge variant="outline">New Invoice</Badge>
        </h1>
        <h2 className="text-xs font-medium text-gray-400">Generate Invoice</h2>
      </div>
    </Card>
  );
}

export default InvoiceCardLayout;
