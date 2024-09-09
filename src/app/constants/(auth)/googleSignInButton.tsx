import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import { baseURL,ApiURL } from "../index"; // Adjust the path accordingly

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
            const response = await ApiURL.get(
                `${baseURL}/auth/login_with_google?token=${credentialResponse.credential}`
            );
            // console.log(response);
            setCookie("token", response.data.access_token);

            const userId = response.data.userInfo._id;
            localStorage.setItem("userId", userId);
            
            console.log("dataaaa"+JSON.stringify(response))
            toast.success("Logged in successfully");
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
