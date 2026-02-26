import "./globals.css";

export default function app({children}){
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );

}