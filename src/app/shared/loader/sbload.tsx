import React from 'react';
import { ColorRing } from 'react-loader-spinner';

const SbLoad: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-opacity-50 m-20">
      <ColorRing
        visible={true}
        height={40}
        width={40}
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']}
      />
    </div>
  );
};

export default SbLoad;
