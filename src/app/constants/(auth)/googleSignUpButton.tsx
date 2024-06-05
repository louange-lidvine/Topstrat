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
            // Call your API endpoint with the token
            const response = await axios.get(
                "http://157.245.121.185:5000/auth/register_with_google",
                {
                    headers: {
                        Authorization: `Bearer ${credentialResponse.credential}`,
                    },
                }
            );

            // Store the access token in a cookie or local storage
            setCookie("token", response.data.access_token);
            console.log(response.data.access_token)

            // Redirect to the landing page
            router.push("/components/Landingpage");

            // Call the onSuccess callback if needed
            onSuccess(credentialResponse);
        } catch (error) {
            console.error("Error fetching project data:", error);
        }
    };

    return (
        <GoogleOAuthProvider clientId="825803595408-bt5tc0r25fsoll2fdevn9p81hvajrgt8.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => {
                    console.log("Google login failed");
                    toast.error("Failed to login !");
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleSignUpButton;
