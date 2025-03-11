import React from "react";
import { Card } from "@/components/ui/card";

function ActionCardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Card className="p-4 dark:bg-gray-950">
      <div>
        <h1 className="font-semibold text-lg ">Actions</h1>
        <h2 className="text-xs font-medium text-gray-400">
          Operations and preview
        </h2>
      </div>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </Card>
  );
}

export default ActionCardLayout;
