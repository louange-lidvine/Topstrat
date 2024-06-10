// GoogleSignInButton component
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
    buttonText = "Sign In With Google",
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
            toast.success("Signed up successfully");
            router.push("/pages/Payment");
            onSuccess(credentialResponse);
            router.push("../../Pages/signIn/page.tsx");
        } catch (error) {
            console.error("Error during Google login:", error);
            toast.error("Failed to signup!");
            onError();
        }
    };

    return (
        <GoogleOAuthProvider clientId="825803595408-bt5tc0r25fsoll2fdevn9p81hvajrgt8.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    console.log("Google auth failed");
                    toast.error("Failed to signed up!");
                    onError();
                }}
            />
        </GoogleOAuthProvider>
    );
};
export default GoogleSignUpButton;
