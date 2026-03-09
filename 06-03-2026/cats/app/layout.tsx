// export const dynamic = "force-dynamic"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><h1>Facts 😼</h1>
        {children}
      </body>
    </html>
  );
}
