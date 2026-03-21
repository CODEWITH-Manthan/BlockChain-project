import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { RoleGuard } from "@/components/RoleGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 ml-[88px] h-full">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-8 py-4">
          {children}
        </main>
      </div>
    </RoleGuard>
  );
}
