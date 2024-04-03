import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

interface GoogleButtonProps {
    onSuccess?: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
    onFailure?: (error: any) => void;
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onSuccess, onFailure }) => {
    const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log(response);
        if (onSuccess) onSuccess(response);
    };

    const errorGoogle = (error: any) => {
        console.error(error);
        if (onFailure) onFailure(error);
    };

    return (
        <GoogleLogin
            clientId="506167110485-m51fk31olmvegpiefnh636fajc5a6qe0.apps.googleusercontent.com"
            buttonText="Sign up with Google"
            onSuccess={responseGoogle}
            onFailure={errorGoogle}
            cookiePolicy={'single_host_origin'}
            className='flex  p-4 border border-black rounded-md items-center justify-center text-center'
        />
    );
};

export default GoogleButton;
