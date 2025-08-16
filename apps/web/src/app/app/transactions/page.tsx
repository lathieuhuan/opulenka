// export { TransactionsPage as default } from "@/features/transactions-page";
import { TransactionsPage } from "@/features/transactions-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ locale: string }>;
}) {
  // TODO: get initial transactions from server
  // const params = await searchParams;

  return <TransactionsPage />;
}
