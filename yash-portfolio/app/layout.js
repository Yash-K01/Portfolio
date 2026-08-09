import "./globals.css";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Yash Khartode — AI/ML Engineer & Software Engineer",
  description:
    "Portfolio of Yash Khartode — AI/ML Engineer, Software Engineer, MERN Stack Developer, and Cloud & Agentic AI enthusiast.",
  openGraph: {
    title: "Yash Khartode — AI/ML Engineer & Software Engineer",
    description:
      "Expanding skills in Artificial Intelligence, Machine Learning, and Agentic AI while developing practical projects in web development and data-driven solutions.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
