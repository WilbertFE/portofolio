import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spaceGrotesk = Space_Grotesk({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wilbert Bernardi - Web Developer Portfolio",
  description: "Website portofolio Wilbert Bernardi",
  openGraph: {
    title: "Wilbert Bernardi - Web Developer Portfolio",
    description: "Explore my projects and tech stack",
    url: "https://wilbertbernardi.vercel.app",
    siteName: "Wilbert Bernardi Portfolio",
    images: [
      {
        url: "https://wilbertbernardi.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wilbert Bernardi Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <main className="min-h-screen w-full overflow-hidden">
              <SidebarTrigger />
              {children}
              <SpeedInsights />
            </main>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
