// GoogleSignUpButton component
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import axios from "axios";

interface GoogleButtonProps {
    onSuccess: (credentialResponse: any) => void;
    onError: () => void;
    buttonText?: string;
}

const GoogleSignUpButton: React.FC<GoogleButtonProps> = ({
    onSuccess,
    onError,
    buttonText = "Sign up With Google",
}) => {
    const router = useRouter();

    const handleSuccess = async (credentialResponse: any) => {
        try {
            // Call your API endpoint with the token as a query parameter
            const response = await axios.get(
                `http://157.245.121.185:5000/auth/register_with_google?token=${credentialResponse.credential}`
            );

            // Store the access token in a cookie or local storage
            setCookie("token", response.data.token);
            console.log(response.data.token);

            // Redirect to the landing page
            router.push("/components/Landingpage");

            // Call the onSuccess callback if needed
            onSuccess(credentialResponse);
        } catch (error) {
            console.error("Error during Google signup:", error);
            toast.error("Failed to sign up!");
            onError();
        }
    };

    return (
        <GoogleOAuthProvider clientId="825803595408-bt5tc0r25fsoll2fdevn9p81hvajrgt8.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    console.log("Google signup failed");
                    toast.error("Failed to sign up!");
                    onError();
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleSignUpButton;
// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import GoogleButton from "@/app/constants/(auth)/googleButton";
// import Background from "../../../../public/assets/bg.png";
// import Graphics from "../../../../public/assets/Login-amico (1) 2.png";
// import Link from "next/link";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import Loader from "@/app/shared/loader/page";
// import "react-toastify/dist/ReactToastify.css";
// import { toast, ToastContainer } from "react-toastify";
// import SbLoad from "@/app/shared/loader/sbload";
// import notifications from "@mantine/notifications";

// function Page() {
//     const router = useRouter();
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const togglePasswordVisibility = () => {
//         setShowPassword((prevState) => !prevState);
//     };

//     const [formData, setFormData] = useState({
//         firstname: "",
//         lastname: "",
//         email: "",
//         password: "",
//     });

//     const handleChange = (e: any) => {
//         const { name, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const response = await axios.post(
//                 "http://157.245.121.185:5000/auth/signup",
//                 formData,
//                 {
//                     headers: {
//                         Accept: "application/json",
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );
//             console.log(response.data);
//             toast.success("Created account successfully");
//             router.push("/Pages/signIn");
//         } catch (error) {
//             console.error("Error:", error);
//             toast.error("Failed to create account, please try again");
//             router.push("/Pages/signup");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center px-16 lg:px-32">
//             <Image
//                 src={Background}
//                 className="w-full h-full fixed left-0 top-0 -z-10"
//                 alt="background-img"
//             />
//             <div className="flex flex-col items-center lg:flex-row w-[100%]">
//                 <div className="w-[60%] lg:flex items-center hidden">
//                     <Image
//                         src={Graphics}
//                         alt="graphics-image"
//                         width={618}
//                         height={689}
//                     />
//                 </div>
//                 <div className="p-4 rounded w-full lg:w-[40%]">
//                     <h1 className="text-2xl font-bold mb-4">
//                         Create an account
//                     </h1>
//                     <form
//                         className="flex flex-col space-y-4"
//                         onSubmit={handleSubmit}
//                     >
//                         <div className="flex flex-col">
//                             <label htmlFor="firstname" className="mb-1">
//                                 First Name:
//                             </label>
//                             <input
//                                 type="text"
//                                 id="firstname"
//                                 name="firstname"
//                                 value={formData.firstname}
//                                 onChange={handleChange}
//                                 className="border border-black p-3 rounded-md outline-none placeholder-transparent bg-opacity-0"
//                                 required
//                             />
//                         </div>

//                         <div className="flex flex-col">
//                             <label htmlFor="lastname" className="mb-1">
//                                 Last Name:
//                             </label>
//                             <input
//                                 type="text"
//                                 id="lastname"
//                                 name="lastname"
//                                 value={formData.lastname}
//                                 onChange={handleChange}
//                                 className="border border-black outline-none p-3 rounded-md placeholder-transparent bg-opacity-0"
//                                 required
//                             />
//                         </div>

//                         <div className="flex flex-col">
//                             <label htmlFor="email" className="mb-1">
//                                 Email:
//                             </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className="border p-3 border-black outline-none rounded-md placeholder-transparent bg-opacity-0"
//                                 required
//                             />
//                         </div>

//                         <div className="flex flex-col">
//                             <label htmlFor="password" className="mb-1">
//                                 Password:
//                             </label>
//                             <div className="flex space-between border p-3 outline-none rounded-md placeholder-transparent bg-opacity-0 border-black">
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     id="password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     className="outline-none w-full bg-transparent"
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={togglePasswordVisibility}
//                                 >
//                                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </button>
//                             </div>
//                         </div>
//                         <button
//                             type="submit"
//                             className={`bg-blue-default text-white  py-4 px-10 rounded-lg ${
//                                 loading ? " cursor-not-allowed" : ""
//                             }`}
//                             disabled={loading}
//                         >
//                             {loading ? (
//                                 <div className="w-full flex items-center justify-center">
//                                     <SbLoad />
//                                 </div>
//                             ) : (
//                                 "Login"
//                             )}
//                         </button>

//                         <div className="flex items-center space-x-4">
//                             <div className="flex-grow border-t border-gray-400"></div>
//                             <span className="text-gray-500">or</span>
//                             <div className="flex-grow border-t border-gray-400"></div>
//                         </div>

//                         <GoogleButton
//                             onSuccess={function (
//                                 credentialResponse: any
//                             ): void {
//                                 throw new Error("Function not implemented.");
//                             }}
//                             onError={function (): void {
//                                 throw new Error("Function not implemented.");
//                             }}
//                         />

//                         <div className="flex-row">
//                             <p>
//                                 Already have an account?{" "}
//                                 <Link href="signIn">
//                                     <span className="text-blue-default  ">
//                                         Sign in
//                                     </span>
//                                 </Link>
//                             </p>
//                         </div>
//                     </form>
//                     <ToastContainer
//                         position="top-center"
//                         autoClose={3000}
//                         hideProgressBar={false}
//                         newestOnTop
//                         closeOnClick
//                         rtl
//                         pauseOnFocusLoss
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Page;