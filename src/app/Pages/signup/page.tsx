    "use client"
    import React, { useState } from "react";
    import Image from "next/image";
    import GoogleButton from "@/app/constants/(auth)/googleButton";
    import Google from "../../../../public/assets/Google.png";
    import Background from "../../../../public/assets/bg.png";
    import Graphics from "../../../../public/assets/Login-amico (1) 2.png";
    import Link from "next/link";
    import axios from "axios";
    import { GoogleLogin } from "react-google-login";

    function Page() {
        const handleGoogleSuccess = (response: any) => {
        response.redirect('/Components/LandingPage')
        };

        const handleGoogleFailure = (error: any) => {
            // Handle Google sign-up failure
        };

        const [formData, setFormData] = useState({
            firstname: "",
            lastname:"",
            email: "",
            password: "",
        });

        const handleChange = (e:any) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        // const handleSubmit = async (e:any) => {
        //     e.preventDefault();
        //     try {
        //         const response = await axios.post("https://topstrat-backend.onrender.com/auth/signup", formData)
        //         console.log(response.data);
            
        //     } catch (error) {
        //         console.error("Error:", error);
        //         // Handle error
        //     }
        // };

        const handleSubmit = async (e: any) => {
            e.preventDefault();
            try {
                const response = await axios.post("https://topstrat-backend.onrender.com/auth/signup", formData, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                // Handle successful response
            } catch (error) {
                console.error("Error:", error);
                // Handle error
            }
        };
        
        
        return (
            <div className="min-h-screen flex items-center px-16 lg:px-32 ">
            <Image
                src={Background}
                className="w-full h-full fixed left-0 top-0 -z-10"
                alt="background-img"
            />
            <div className="flex flex-col items-center lg:flex-row   w-[100%] ">
                <div className="w-[60%] lg:flex items-center hidden">
                    <Image
                        src={Graphics}
                        alt="graphics-image"
                        width={618}
                        height={689}
                    />
                </div>

                <div className="p-4 rounded w-full lg:w-[40%]">
                    <h1 className="text-2xl font-bold mb-4">
                        Create an account
                    </h1>
                    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="firstname" className="mb-1">
                                First Name:
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="border border-black p-3 rounded-md placeholder-transparent bg-opacity-0"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="lastname" className="mb-1">
                                Last Name:
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="border border-black p-3 rounded-md placeholder-transparent bg-opacity-0"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border p-3 order-black rounded-md placeholder-transparent bg-opacity-0 border-black"
                                required
                            />
                        </div>

                        {/* <div className="flex flex-col">
                            <label htmlFor="username" className="mb-1">
                                username:
                            </label>
                            <input
                                type="username"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="border p-3 rounded-md placeholder-transparent bg-opacity-0 border-black"
                                required
                            />
                        </div> */}
                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="border p-3 rounded-md placeholder-transparent bg-opacity-0 border-black"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-default text-white p-4 rounded hover:bg-[rgba(11, 108, 121, 1.2)]"
                        >
                            Sign Up
                        </button>

                        <div className="flex items-center space-x-4">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <span className="text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>

                        {/* <div className="flex  p-4 border border-black rounded-md items-center justify-center text-center">
                                <Image
                                    src={Google}
                                    alt="Google"
                                    width={20}
                                    height={20}
                                />
                                <div >Sign up with Google</div>
                            </div> */}
                            <GoogleButton onSuccess={handleGoogleSuccess} onFailure={handleGoogleFailure} />

                        <div className="flex-row">
                            <p>
                                Already have an account?{" "}
                                <Link href='signIn'>
                                <span className="text-blue-default  ">
                                    Sign in
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
