import type { Metadata } from "next";
import '@mantine/core/styles.css';
import Sidebar from "./Sidebar/page";
import { MantineProvider } from "@mantine/core";
export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MantineProvider>
        <html lang="en">
            <body className="grid-flow-col">
                <Sidebar/>
              {children}
            </body>
        </html>
        </MantineProvider>
    );
}
