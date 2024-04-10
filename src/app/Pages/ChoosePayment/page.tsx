// "use client"
// import React, { useState } from "react";
// import Stepper from "react-stepper-horizontal";
// import Image from "next/image";
// import Background from "../../../../public/assets/bg.png";
// import payPic from "../../../../public/assets/payment.png";
// import Package from "./package";
// import { Project } from "./project"; // Adjust the path accordingly

// // Array of projects
// const projects = [
//     {
//         name: "topstratfree",
//         price: 0,
//         maxProjects: 1,
//         maxDevices: 1,
//         teamMembers: 1,
//         features: ["Feature 1", "Feature 2"],
//         isUnlimitedProjects: true,
//         isUnlimitedTeamMembers: true,
//         userId: {},
//     },
//     {
//         name: "topstratpro",
//         price: 10,
//         maxProjects: 5,
//         maxDevices: 10,
//         teamMembers: 5,
//         features: ["Feature 1", "Feature 2", "Feature 3"],
//         isUnlimitedProjects: false,
//         isUnlimitedTeamMembers: false,
//         userId: {},
//     },
//     {
//         name: "topstratplus",
//         price: 20,
//         maxProjects: 10,
//         maxDevices: 20,
//         teamMembers: 10,
//         features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
//         isUnlimitedProjects: false,
//         isUnlimitedTeamMembers: false,
//         userId: {},
//     },
//     {
//         name: "topstratelite",
//         price: 30,
//         maxProjects: 20,
//         maxDevices: 50,
//         teamMembers: 20,
//         features: [
//             "Feature 1",
//             "Feature 2",
//             "Feature 3",
//             "Feature 4",
//             "Feature 5",
//         ],
//         isUnlimitedProjects: false,
//         isUnlimitedTeamMembers: false,
//         userId: {},
//     },
// ];

// function Payment() {
//     const [currentStep, setCurrentStep] = useState(0);
//     const [isLoading, setIsLoading] = useState(false);
//     const [selectedProject, setSelectedProject] = useState<Project | null>(
//         null
//     );

//     const steps = [
//         { title: "Subscription Method" },
//         { title: "Payment Method" },
//         { title: "Finish" },
//     ];

//     const handleStepClick = (step: number) => {
//         setCurrentStep(step);
//     };

//     const handlePaymentSelection = async () => {
//         setIsLoading(true);
//         try {
//             const userId = localStorage.getItem("userId");
//             if (userId) {
//                 console.log("Payment selected");
//                 // Implement your logic for payment selection, e.g., navigate to checkout
//                 // router.push(`/checkout?userId=${userId}`);
//             } else {
//                 console.error("User session not found");
//             }
//         } catch (error) {
//             console.error("Error selecting payment method:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handlePackageClick = (project: Project) => {
//         setSelectedProject(project); // Set the selected project in state
//     };

//     return (
//         <div>
//             <Image
//                 src={Background}
//                 className="w-full h-full fixed left-0 top-0 -z-10"
//                 alt="background-img"
//             />
//             <div className="lg:flex w-full my-6">
//                 <div className="pic w-[50%]">
//                     <Image
//                         src={payPic}
//                         className="hidden lg:block lg:w-[600px] lg:h-[700px] lg:pt-32 lg:ml-16"
//                         alt="background-img"
//                     />
//                 </div>
//                 <div className="text w-50% block">
//                     <div className="h-40">
//                         <h1 className="text-2xl font-bold text-center">
//                             Payments details
//                         </h1>
//                         <Stepper
//                             steps={steps}
//                             activeStep={currentStep}
//                             onClick={handleStepClick}
//                             activeColor="#0B6C79"
//                             completeColor="#0B6C79"
//                             size={32}
//                             circleFontSize={15}
//                         />
//                     </div>

//                     <div className="packages">
//                         <h1 className="text-xl font-bold">
//                             Choose an appropriate package
//                         </h1>
//                         <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10">
//                             {projects.map((project) => (
//                                 <Package
//                                     title={project.name}
//                                     onClick={handlePackageClick} // Pass handlePackageClick as onClick callback
//                                 />
//                             ))}
//                         </div>
//                         <button
//                             onClick={handlePaymentSelection}
//                             className="flex m-auto py-2 px-12 rounded-md text-white bg-blue-default"
//                             disabled={isLoading}
//                         >
//                             Pay
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Payment;
"use client"
import React, { useState } from "react";
import Stepper from "react-stepper-horizontal";
import Image from "next/image";
import Background from "../../../../public/assets/bg.png";
import payPic from "../../../../public/assets/payment.png";
import Package from "./package";
import { Project } from "./project"; // Adjust the path accordingly
import { useRouter } from "next/navigation";

// Array of projects
const projects = [
    {
        name: "topstratfree",
        price: 0,
        maxProjects: 1,
        maxDevices: 1,
        teamMembers: 1,
        features: ["Feature 1", "Feature 2"],
        isUnlimitedProjects: true,
        isUnlimitedTeamMembers: true,
        userId: {},
    },
    {
        name: "topstratpro",
        price: 10,
        maxProjects: 5,
        maxDevices: 10,
        teamMembers: 5,
        features: ["Feature 1", "Feature 2", "Feature 3"],
        isUnlimitedProjects: false,
        isUnlimitedTeamMembers: false,
        userId: {},
    },
    {
        name: "topstratplus",
        price: 20,
        maxProjects: 10,
        maxDevices: 20,
        teamMembers: 10,
        features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
        isUnlimitedProjects: false,
        isUnlimitedTeamMembers: false,
        userId: {},
    },
    {
        name: "topstratelite",
        price: 30,
        maxProjects: 20,
        maxDevices: 50,
        teamMembers: 20,
        features: [
            "Feature 1",
            "Feature 2",
            "Feature 3",
            "Feature 4",
            "Feature 5",
        ],
        isUnlimitedProjects: false,
        isUnlimitedTeamMembers: false,
        userId: {},
    },
];


function Payment() {
    const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null
    );

    const steps = [
        { title: "Subscription Method" },
        { title: "Payment Method" },
        { title: "Finish" },
    ];

    const handleStepClick = (step: number) => {
        setCurrentStep(step);
    };

    const handlePaymentSelection = async () => {
        setIsLoading(true);
        try {
            const userId = localStorage.getItem("userId");
            if (userId) {
                console.log("Payment selected");
                // Implement your logic for payment selection, e.g., navigate to checkout
                router.push(`/Pages/Payment?userId=${userId}`);
            } else {
                console.error("User session not found");
            }
        } catch (error) {
            console.error("Error selecting payment method:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePackageClick = (project: Project) => {
        setSelectedProject(project); // Set the selected project in state
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
                        <h1 className="text-2xl font-bold text-center">
                            Payments details
                        </h1>
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
                        <h1 className="text-xl font-bold">
                            Choose an appropriate package
                        </h1>
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10">
                            {projects.map((project, index) => (
                                <Package
                                    key={index}
                                    title={project.name}
                                    onClick={() => handlePackageClick(project)} // Pass handlePackageClick as onClick callback
                                />
                            ))}
                        </div>
                        <button
                            onClick={handlePaymentSelection}
                            className="flex m-auto py-2 px-12 rounded-md text-white bg-blue-default"
                            disabled={isLoading}
                        >
                            Pay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
