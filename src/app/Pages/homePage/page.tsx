import React from "react";
import Link from "next/link";
import Image from "next/image";
import Office from "../../../../public/assets/At the office.png";
import Background from "../../../../public/assets/bg.png";
function Page() {
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
                        <Link href="../services/page.tsx" className="hover:text-gray-300 ">
                            Services
                        </Link>
                        <Link href="../About/page.tsx" className="hover:text-gray-300">
                            About
                        </Link>
                        <Link href="../Contacts/page.tsx" className="hover:text-gray-300">
                            Contacts
                        </Link>
                    </div>
                </div>
                <div className="flex space-x-4 items-center">
                    <Link href="/Pages/signIn" className="hover:text-gray-300 font-bold">
                        Sign In
                    </Link>
                    <div className="bg-blue-default text-white  font-bold p-3 rounded-md">
     <Link href="/Pages/signup" >
                        Sign Up
                    </Link>
                    </div>
                    
                </div>
            </nav>

            <div className="flex flex-col  md:flex-row w-[100%] justify-between p-9">
                {/* Your content goes here */}
                <Image
                    src={Office}
                    alt="Office"
                    width={500}
                    height={300}
                    className="md:w-1/2"
                />
                <div className="flex flex-col gap-12  md:w-1/2 justify-center items-center">
                    <div className="text-blue-default  text-6xl  font-bold ">
                        <h1>Strategic </h1>
                        <h1>planning</h1>
                    </div>
                    <div className="px-20    ">
                        A strategic plan is a comprehensive document that
                        outlines an organization's long-term goals and the
                        actions necessary to achieve those goals.
                    </div>
                    <div
                        className="bg-blue-default text-white rounded-full px-20  py-3 font-bold  shadow-[10px,4px,4px,0px,rgba(11,108,121,0.5)]  p-6 "
                    >
                        Get Started
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
