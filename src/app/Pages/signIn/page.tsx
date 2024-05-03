"use client";
import React, { useState } from "react";
import Image from "next/image";
import GoogleButton from "../../constants/(auth)/googleButton";
import Background from "/public/assets/bg.png";
import Graphics from "public/assets/Login-amico (1) 2.png";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../../shared/loader/page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

function Page() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post("https://topstrat-backend.onrender.com/auth/signin", formData)
            .then((res) => {
                setLoading(false);
                console.log(res.data);
                const token = res.data.access_token;
                console.log(token);
                setCookie("token", JSON.stringify(token));
                // Decode the token to extract user information
                const decodedToken: any = jwtDecode(token);
                console.log("Decoded token:", decodedToken);

                // Store the user's ID in localStorage
                const userId = decodedToken.userId || decodedToken.sub; // Modify this based on the actual key
                console.log("User ID:", userId);
                localStorage.setItem("userId", userId);
                const decoded = jwtDecode(token) as { role: string };
                console.log(decoded);
                if (decoded.role == "admin") {
                    router.push("/components/Dashboard");
                    setLoading(false);
                    toast.success("Admin Logged in successfully");
                } else if (decoded.role == "user") {
                    router.push("/components/Landingpage");
                    setLoading(false);
                    toast.success("User Logged in successfully");
                    router.push("/components/Landingpage");
                } else {
                    toast.error("Role Not valid!");
                }
                setCookie("token", res?.data);
                setLoading(false);
            })
            .catch((err: any) => {
                console.log("Error occured: ", err.message);
                if (err?.response?.data?.success) {
                    if (
                        String(err?.response?.data?.error) ==
                        "Network error occurred"
                    ) 
                    return toast.error("Invalid credentials");
                    setLoading(false)
                } else {
                    setLoading(false)
                    return toast.error("Invalid credentials");
                
                }
            });
    };

    return (
        <div className="min-h-screen flex items-center px-10 md:px-16 lg:px-32">
            <Image
                src={Background}
                className="w-full h-full fixed left-0 top-0 -z-10"
                alt="background-img"
            />
            <div className="flex flex-col items-center lg:flex-row w-[100%]">
                <div className="w-[60%] lg:flex items-center hidden ">
                    <Image
                        src={Graphics}
                        alt="graphics-image"
                        width={618}
                        height={689}
                    />
                </div>

                <div className="max-w-md p-4 rounded w-full lg:w-[40%] flex flex-col justify-center">
                    <h1 className="text-2xl font-bold mb-4">Sign In</h1>
                    <form
                        className="flex flex-col space-y-4"
                        onSubmit={handleSubmit}
                    >
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

                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-1">
                                Password:
                            </label>
                            <div className="flex space-between border p-3 rounded-md placeholder-transparent bg-opacity-0 border-black">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="outline-none w-full bg-transparent"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-default text-white p-4 rounded hover:bg-[rgba(11, 108, 121, 1.2)]"
                        >
                            Sign in
                        </button>
                        <div className="">
                            {loading && <Loader />}
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <span className="text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                        <div className="flex flex-row justify-between">
                            <span>Remember me</span>
                            <span>Forgot Password?</span>
                        </div>

                        <GoogleButton
                            onSuccess={(credentialResponse: any) => {
                                console.log(
                                    "Google login success:",
                                    credentialResponse
                                );
                            }}
                            onError={() => {
                                console.log("Google login failed");
                            }}
                        />

                        <div className="flex-row">
                            <p>
                                Don't have an account?{" "}
                                <Link href="/Pages/signup">
                                    <span className="text-blue-default">
                                        Sign up
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </form>
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        rtl
                        pauseOnFocusLoss
                    />
                </div>
            </div>
        </div>
    );
}

export default Page;
