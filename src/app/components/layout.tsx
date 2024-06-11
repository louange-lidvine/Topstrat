"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar/page";
import Background from "../../../public/assets/bg.png";
import Image from "next/image";
import { MantineProvider } from "@mantine/core";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <MantineProvider>
        <html lang="en">
            <body className="grid-flow-col h-screen w-screen overflow-hidden">
             <div className="hidden lg:block lg:absolute z-[-9999]">
                    <Image src={Background} alt="background" />
                </div> 
                <div className="flex flex-col lg:flex-row h-full">
                    <Sidebar isOpen={isSidebarOpen} />
                    <div className="flex-grow overflow-y-auto overflow-x-hidden h-full ">{children}</div>
                </div>
            </body>
        </html>
        </MantineProvider>

    );
}
