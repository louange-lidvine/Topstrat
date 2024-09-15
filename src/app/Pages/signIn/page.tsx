"use client";
import React, { useState } from "react";
import Image from "next/image";
import GoogleButton from "../../constants/(auth)/googleSignUpButton";
import Background from "/public/assets/bg.png";
import Graphics from "/public/assets/Login-amico (1) 2.png";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { setCookie } from "cookies-next";
import SbLoad from "@/app/shared/loader/sbload";
import { jwtDecode } from "jwt-decode";
import GoogleSignInButton from "@/app/constants/(auth)/googleSignInButton";
import { redirect } from "next/navigation";
import { baseURL, ApiURL } from "../../constants/index"; 
import logo from '../../../../public/assets/logo.png'


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

    try {
        const response = await axios.post(`${baseURL}/auth/signin`, formData);
        setLoading(false);
        console.log(response.data);

        const token = response.data.access_token;
        const userInfo = response.data.userInfo;

        setCookie("token", token);
        localStorage.setItem("userId", userInfo._id);

        const decoded = jwtDecode(token) as { role: string };

        if (decoded.role === "admin") {
            router.push("/components/LandiangPage");
            toast.success("Admin Logged in successfully");
        } else if (decoded.role === "user") {
            router.push("/components/Landingpage");
            toast.success("User Logged in successfully");
        } else {
            toast.error("Role Not valid!");
        }

    } catch (err: any) {
        setLoading(false);
        console.error("Error occurred:", err);

        if (err.response && err.response.data) {
     
            const msg = err.response.data.message || err.response.data.error;
            if (msg) {
                toast.error(msg); 
            } else {
                toast.error("An error occurred on the server."); 
            }
        } else {
            toast.error("An unexpected error occurred."); 
        }
    }
};



    return (
        <div className="min-h-screen flex items-center px-10 md:px-16 lg:px-32">
            <Image
                src={Background}
                className="w-full h-full fixed left-0 top-0 -z-10"
                alt="background-img"
            />
            <div className="flex flex-col items-center justify-center lg:flex-row w-[100%]">
                <div className="max-w-md p-4 rounded bg-white shadow-lg w-full lg:w-[40%] flex flex-col justify-center">
                      <div className="flex items-center justify-center">
    <a href="#home" className="text-2xl font-bold text-blue-default">
      <Image src={logo} alt="alt" width={50} height={50} />
    </a>
        <h1 className="font-bold text-xl text-blue-default">TOPSTRAT</h1>
  </div>
                    <h1 className="text-xl font-bold mb-4 text-center">Sign In</h1>
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
                                className="border p-3 order-black rounded-md placeholder-transparent bg-opacity-0 border-black outline-none"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-1">
                                Password:
                            </label>
                            <div className="flex space-between border p-3 rounded-md bg-transparent bg-opacity-0 border-black">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-transparent outline-none"
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
                            className={`bg-blue-default text-white  py-4 px-10 rounded-lg ${
                                loading ? " cursor-not-allowed" : ""
                            }`}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="w-full flex items-center justify-center">
                                    <SbLoad />
                                </div>
                            ) : (
                                "Login"
                            )}
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

                        <GoogleSignInButton
                            onSuccess={(credentialResponse: any) => {
                                console.log(
                                    "Google login success: fsdsdfasdfasd",
                                    credentialResponse
                                );
                                router.refresh();
                                router.push("/components/Landingpage");
                                console.log("Made router push");
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
