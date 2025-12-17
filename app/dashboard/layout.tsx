import { Sidebar } from "@/components/shared/layout/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
}
