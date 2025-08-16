import { ArrowDownToLine, ArrowUpDown, ArrowUpFromLine } from "lucide-react";

import { cn } from "@/lib/utils/functions";
import { ETransactionType } from "@opulenka/service";

const ICON_MAP = {
  [ETransactionType.INCOME]: ArrowDownToLine,
  [ETransactionType.EXPENSE]: ArrowUpFromLine,
  [ETransactionType.TRANSFER]: ArrowUpDown,
};

const BG_CLASS_MAP = {
  [ETransactionType.INCOME]: "bg-success/10",
  [ETransactionType.EXPENSE]: "bg-destructive/10",
  [ETransactionType.TRANSFER]: "bg-chart-3/10",
};

const TEXT_CLASS_MAP = {
  [ETransactionType.INCOME]: "text-success",
  [ETransactionType.EXPENSE]: "text-destructive",
  [ETransactionType.TRANSFER]: "text-chart-3",
};

interface TransactionItemProps {
  type: ETransactionType;
  amount: string;
  date: string;
}

export function TransactionItem({ type, amount, date }: TransactionItemProps) {
  const Icon = ICON_MAP[type];
  const textClass = TEXT_CLASS_MAP[type];

  return (
    <div className="flex justify-between items-center p-4 bg-card rounded-lg border hover:bg-accent/50 transition-colors break-inside-avoid">
      <div className="flex items-center space-x-3">
        <div className={cn("p-2 rounded-full", BG_CLASS_MAP[type], textClass)}>
          <Icon className="size-5" />
        </div>
        {/* <div>
          <p className="font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div> */}
      </div>
      <div className="text-right">
        <p className={cn("font-medium", textClass)}>
          {type === ETransactionType.INCOME ? "+" : "-"}
          {amount}
        </p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}
