import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { setCookie } from "cookies-next";
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

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
    toast.success('Logged in successfully !')
    console.log(credentialResponse);  
    setCookie("token",credentialResponse.credential)
    router.push('/components/Landingpage')
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
