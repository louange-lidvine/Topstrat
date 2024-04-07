import React from "react";
import Link from "next/link";
import Image from "next/image";
import Background from "../../../../public/assets/bg.png";
function page() {
    return (
        <div>
            <nav className="flex justify-between p-4  text-black items-center ">
                <Image
                    src={Background}
                    className="w-full h-full fixed left-0 top-0 -z-10"
                    alt="background-img"
                />
                <div></div>
                <div className="flex items-center">
                    <div className="flex space-x-4 font-bold">
                        <Link href="/" className="hover:text-gray-300 border-">
                            Home
                            <div className="flex-grow border-t border-blue-default "></div>
                        </Link>
                        <Link href="/Pages/services" className="hover:text-gray-300">
                            Services
                        </Link>
                        <Link href="/Pages/About" className="hover:text-gray-300">
                            About
                        </Link>
                        <Link href="/Pages/Contacts" className="hover:text-gray-300">
                            Contacts
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="flex flex-col p-10">
                <div className="font-bold text-blue-default text-3xl">Our Services</div>
                <div className="flex flex-col gap-28 ">
                    <div className="flex gap-48
                       justify-center">
                        <div className=" border-2 border-blue-default  rounded-md p-6 max-w-[350px]">
                            A strategic plan is a comprehensive document that
                            outlines an organization's long-term goals and the
                            actions necessary to achieve those goals.
                        </div>
                        <div className="border-2 border-blue-default  rounded-md p-6 max-w-[350px]">
                            A strategic plan is a comprehensive document that
                            outlines an organization's long-term goals and the
                            actions necessary to achieve those goals.
                        </div>
                    </div>
                    <div className="flex gap-14  border px-4 justify-center">
                        <div className="border-2 border-blue-default rounded-md p-6 max-w-[350px] shadow-md">
                            A strategic plan is a comprehensive document that
                            outlines an organization's long-term goals and the
                            actions necessary to achieve those goals.
                        </div>
                        <div className="border-2 border-blue-default  rounded-md p-6 max-w-[350px]">
                            A strategic plan is a comprehensive document that
                            outlines an organization's long-term goals and the
                            actions necessary to achieve those goals.
                        </div>
                        <div className="border-2 border-blue-default  rounded-md p-6 max-w-[350px]">
                            A strategic plan is a comprehensive document that
                            outlines an organization's long-term goals and the
                            actions necessary to achieve those goals.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;
