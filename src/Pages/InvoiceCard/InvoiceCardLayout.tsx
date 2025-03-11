import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function InvoiceCardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Card className="p-4 dark:bg-gray-950">
      <div>
        <h1 className="font-semibold text-lg gap-3 flex items-center">
          INVOICE
          <Badge variant="outline">New Invoice</Badge>
        </h1>
        <h2 className="text-xs font-medium text-gray-400">Generate Invoice</h2>
      </div>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </Card>
  );
}

export default InvoiceCardLayout;
