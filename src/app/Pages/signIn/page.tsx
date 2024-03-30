import React from "react";
import Image from "next/image";
import Google from "../../../../public/assets/Google.png";
import Background from "../../../../public/assets/bg.png";
import Graphics from "../../../../public/assets/Login-amico (1) 2.png";
import Link from "next/link";

function Page() {
    return (
        <div className="min-h-screen flex items-center px-10 md:px-16  lg:px-32">
            <Image
                src={Background}
                className="w-full h-full fixed left-0 top-0 -z-10"
                alt="background-img"
            />
            <div className="flex flex-col items-center  lg:flex-row  w-[100%]">
                <div className="w-[60%] lg:flex items-center hidden ">
                    <Image
                        src={Graphics}
                        alt="graphics-image"
                        width={618}
                        height={689}
                    />
                </div>

                <div className="max-w-md p-4 rounded w-full  lg:w-[40%] flex flex-col justify-center">
                    <h1 className="text-2xl font-bold mb-4">
                        Create an account
                    </h1>
                    <form className="flex flex-col space-y-4">
                    

                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="border p-3 order-black rounded-md placeholder-transparent bg-opacity-0 border-black"
                                required
                            />
                        </div>

                      
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="border p-3 rounded-md placeholder-transparent bg-opacity-0 border-black"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-default text-white p-4 rounded hover:bg-[rgba(11, 108, 121, 1.2)]"
                        >
                            Sign in
                        </button>

                        <div className="flex items-center space-x-4">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <span className="text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span>Remember me</span>
                            <span>Forgot Password?</span>
                        </div>

                        <div className="flex  p-4 border border-black rounded-md items-center justify-center text-center">
                            <Image
                                src={Google}
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            <div >Sign up with Google</div>
                        </div>

                        <div className="flex-row">
                            <p>
                                Don't  have an account?{" "}
                                <Link href='/Pages/signup'>
                                     <span className="text-blue-default ">
                                    Sign up
                                </span>
                                </Link>
                           
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;
