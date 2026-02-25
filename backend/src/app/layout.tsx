import "@/app/globals.css";

export const metadata = {
  title: "Form Builder API",
  description: "Form Builder Backend API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
