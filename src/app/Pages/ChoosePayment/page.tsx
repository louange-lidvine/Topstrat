"use client"
import React, { useState } from "react";
import Stepper from "react-stepper-horizontal";
import Image from "next/image";
import Background from "../../../../public/assets/bg.png";
import payPic from '../../../../public/assets/payment.png';
import Package from "./package";

function Payment() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Subscription Method" },
    { title: "Payment Method" },
    { title: "Finish" },
  ];

  const handleStepClick = (step: React.SetStateAction<number>) => {
    setCurrentStep(step);
  };

  return (
    <div>
      <Image
        src={Background}
        className="w-full h-full fixed left-0 top-0 -z-10"
        alt="background-img"
      />
      <div className="lg:flex w-full my-6">
        <div className="pic w-[50%]">
          <Image
            src={payPic}
            className="hidden lg:block lg:w-[600px] lg:h-[700px] lg:pt-32 lg:ml-16"

            alt="background-img"
          />
        </div>
        <div className="text w-50% block">
          <div className="h-40">
            <h1 className='text-2xl font-bold text-center'>Payments details</h1>
            <Stepper
              steps={steps}
              activeStep={currentStep}
              onClick={handleStepClick}
              activeColor="#0B6C79"
              completeColor="#0B6C79"
              size={32}
              circleFontSize={15}
            />
          </div>

          <div className="packages">
            <h1 className='text-xl font-bold'>Choose an appropriate package</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10">
              <Package title="Topstrat Free" />
              <Package title="Topstrat Pro" />
              <Package title="Topstrat Plus" />
              <Package title="Topstrat elite" />
            </div>
            <button type="submit" className="flex m-auto py-2 px-12 rounded-md text-white bg-blue-default">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
