import "../styles/globals.css";

export const metadata = {
  title: "QbAir Booking",
  description: "Book your flight with QbAir",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
