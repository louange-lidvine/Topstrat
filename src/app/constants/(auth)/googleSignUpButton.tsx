import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import axios from "axios";
import { baseURL } from "../index";

interface GoogleButtonProps {
    onSuccess: (credentialResponse: any) => void;
    onError: () => void;
    buttonText?: string;
}

const GoogleSignUpButton: React.FC<GoogleButtonProps> = ({
    onSuccess,
    onError,
    buttonText = "Sign Up With Google",
}) => {
    const router = useRouter();

    const handleSuccess = async (credentialResponse: any) => {
        try {
            const response = await axios.get(
                `${baseURL}/auth/register_with_google?token=${credentialResponse.credential}`
            );

            setCookie("token", response.data.token);
            console.log(response.data);
            toast.success("Signed up successfully");
            router.push("/pages/Payment");
            onSuccess(credentialResponse);
        } catch (error: any) {
            console.error("Error during Google signup:", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred during Google signup.");
            }

            onError();
        }
    };

    return (
        <GoogleOAuthProvider clientId="825803595408-bt5tc0r25fsoll2fdevn9p81hvajrgt8.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    console.log("Google auth failed");
                    toast.error("Failed to sign up with Google!");
                    onError();
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleSignUpButton;
