import { SidebarInset, SidebarProvider } from "@/lib/components/sidebar";
import { UserInfo } from "@/types/global";
import { AppSidebar } from "./components/app-sidebar";
import { Header } from "./components/header";

type AppLayoutProps = {
  children: React.ReactNode;
  user: UserInfo;
};

export function AppLayout({ children, user }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header user={user} />
        <div className="p-4">{children}</div>
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
