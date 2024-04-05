import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SessionProviders } from '@/providers/session-provider'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sistema Banclima Moeda social",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <AuthProvider>
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
