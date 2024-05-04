'use client';
import React from 'react';
import { ColorRing } from 'react-loader-spinner';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-opacity-50">
      <ColorRing
        visible={true}
        height={60}
        width={60}
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#0B6C79', '#0B6C79', '#0B6C79', '#0B6C79', '#0B6C79']}
      />
    </div>
  );
};

export default Loader;
