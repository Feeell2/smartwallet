import { Logo } from "@/components/ui/logo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}