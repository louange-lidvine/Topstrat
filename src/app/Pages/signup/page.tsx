"use client";
import React, { useState } from "react";
import Image from "next/image";
import GoogleSignUpButton from "@/app/constants/(auth)/googleSignUpButton";
import Background from "../../../../public/assets/bg.png";
import Graphics from "../../../../public/assets/Login-amico (1) 2.png";
import Link from "next/link";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Loader from "@/app/shared/loader/page";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import SbLoad from "@/app/shared/loader/sbload";
import { baseURL } from "../../constants/index"; 

function Page() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false); // State to track checkbox
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isChecked) {
            toast.error("You must accept the terms and policies before signing up.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${baseURL}/auth/signup`,
                formData,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response.data);
            toast.success("Account created successfully");

            router.push("https://topstrat-payment-portal.vercel.app/");
        } catch (error: any) {
            console.error("Error:", error);
            if (error.response && error.response.data) {
                const msg =
                    error.response.data.message || error.response.data.error;
                if (msg) {
                    toast.error(msg);
                } else {
                    toast.error("Failed to create account, please try again.");
                }
            } else {
                toast.error("Failed to create account, please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center px-16 lg:px-32">
            <Image
                src={Background}
                className="w-full h-full fixed left-0 top-0 -z-10"
                alt="background-img"
            />
            <div className="flex flex-col items-center lg:flex-row w-[100%]">
                <div className="w-[55%] lg:flex items-center hidden">
                    <Image
                        src={Graphics}
                        alt="graphics-image"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="p-4 rounded w-full lg:w-[40%]">
                    <h1 className="text-2xl font-bold mb-4">
                        Create an account
                    </h1>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
    <div className="flex space-x-4">
        <div className="flex flex-col w-full">
            <label htmlFor="firstname" className="mb-1">
                First Name:
            </label>
            <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="border border-black p-2 rounded-md outline-none bg-opacity-0 w-full"
                required
            />
        </div>

        <div className="flex flex-col w-full">
            <label htmlFor="lastname" className="mb-1">
                Last Name:
            </label>
            <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="border border-black p-2 rounded-md outline-none bg-opacity-0 w-full"
                required
            />
        </div>
    </div>

    {/* Email */}
    <div className="flex flex-col w-full">
        <label htmlFor="email" className="mb-1">
            Email:
        </label>
        <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 border-black outline-none rounded-md bg-opacity-0 w-full"
            required
        />
    </div>

    {/* Password */}
    <div className="flex flex-col w-full">
        <label htmlFor="password" className="mb-1">
            Password:
        </label>
        <div className="flex items-center border p-2 rounded-md bg-opacity-0 border-black">
            <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="outline-none w-full bg-transparent"
                required
            />
            <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    </div>

    <div className="flex items-center">
        <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2"
            // required
        />
        <label htmlFor="terms" className="text-gray-600">
            I agree to the{" "}
            <Link
                href="https://acrobat.adobe.com/id/urn:aaid:sc:EU:02f8bcc9-0062-4a47-8fb4-d43664dccf55"
                className="text-blue-default underline"
            >
                Terms and Conditions
            </Link>
            ,{" "}
            <Link
                href="https://acrobat.adobe.com/id/urn:aaid:sc:EU:37ac33dd-809a-4234-baff-c7d9b944fb19"
                className="text-blue-default underline"
            >
                Privacy and data management policy
            </Link>
        </label>
    </div>

    <button
        type="submit"
        className={`bg-blue-default text-white py-3 px-10 rounded-lg ${
            loading ? "cursor-not-allowed" : ""
        }`}
        disabled={loading}
    >
        {loading ? (
            <div className="w-full flex items-center justify-center">
                <SbLoad />
            </div>
        ) : (
            "Sign Up"
        )}
    </button>

    <div className="flex items-center space-x-4">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
    </div>

    <GoogleSignUpButton
        onSuccess={(credentialResponse: any) => {
            console.log("Google sign success:", credentialResponse);
        }}
        onError={() => {
            console.log("Google login failed");
        }}
    />

    <div className="flex-row">
        <p>
            Already have an account?{" "}
            <Link href="signIn">
                <span className="text-blue-default">Sign in</span>
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
                        theme="light"
                        pauseOnFocusLoss
                    />
                </div>
            </div>
        </div>
    );
}

export default Page;
