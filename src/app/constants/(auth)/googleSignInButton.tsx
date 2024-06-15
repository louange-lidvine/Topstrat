// GoogleSignInButton component
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import axios from "axios";
import { redirect } from "next/navigation";

interface GoogleButtonProps {
    onSuccess: (credentialResponse: any) => void;
    onError: () => void;
    buttonText?: string;
}

const GoogleSignInButton: React.FC<GoogleButtonProps> = ({
    onSuccess,
    onError,
    buttonText = "Sign In With Google",
}) => {
    const router = useRouter();

    const handleSuccess = async (credentialResponse: any) => {
        try {
            // Call your API endpoint with the token as a query parameter
            const response = await axios.get(
                `http://157.245.121.185:5000/auth/login_with_google?token=${credentialResponse.credential}`
            );
            console.log(response);
            setCookie("token", response.data);
            console.log(response.data);
            toast.success("logged in successfully");
            // router.push("/Pages/Payment");
            onSuccess(credentialResponse);
        } catch (error) {
            console.error("Error during Google login:", error);
            toast.error("Failed to login!");
            onError();
        }
    };

    return (
        <GoogleOAuthProvider clientId="825803595408-bt5tc0r25fsoll2fdevn9p81hvajrgt8.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    console.log("Google login failed");
                    toast.error("Failed to login!");
                    onError();
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleSignInButton;
