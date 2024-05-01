import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setCookie } from "cookies-next";

interface GoogleButtonProps {
  onSuccess: (credentialResponse: any) => void;
  onError: () => void;
  buttonText?: string;
}


const GoogleButton: React.FC<GoogleButtonProps> = ({ onSuccess, onError, buttonText = 'Sign In With Google' }) => {
  const router = useRouter();
  return (
    <GoogleOAuthProvider clientId="825803595408-bt5tc0r25fsoll2fdevn9p81hvajrgt8.apps.googleusercontent.com">
    <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
    toast.success('Logged in successfully !')
    router.push('/components/Landingpage')
    setCookie("token",credentialResponse.credential)
  }}
  onError={() => {
    console.log('Login Failed');
    toast.error('Failed to login !')
    router.push('/Pages/signIn')
  }}
/>
    </GoogleOAuthProvider>
  );
};

export default GoogleButton;
