import { redirect } from "next/navigation";

import { AppLayout } from "@/features/app-layout";
import { getUserSession } from "@/utils/auth-utils";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  return <AppLayout user={user}>{children}</AppLayout>;
}
