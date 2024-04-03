import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

interface GoogleButtonProps {
  onSuccess: (credentialResponse: any) => void;
  onError: () => void;
  buttonText?: string;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onSuccess, onError, buttonText = 'Sign In With Google' }) => {
  return (
    <GoogleOAuthProvider clientId="506167110485-m51fk31olmvegpiefnh636fajc5a6qe0.apps.googleusercontent.com">
    <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>
    </GoogleOAuthProvider>
  );
};

export default GoogleButton;
