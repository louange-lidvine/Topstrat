import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface ProfileProps {
  pic: string;
  name: string;
}

const Profile: React.FC<ProfileProps> = ({ pic, name }) => {
  return (
    <div className='flex ml-4 my-3'>
      <Image
        src={pic}
        alt="user-profile"
        width={50} 
        height={50}
      />
      <h2 className='mt-2 ml-4 font-bold'>{name}</h2>
    </div>
  );
};

export default Profile;
