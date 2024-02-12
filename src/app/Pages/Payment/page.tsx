 "use client";
import React, { ChangeEvent, useState } from "react";
import DateInput from "../DateInput";
import Airtel from "../../../../public/assets/Airtel 1.png"
import Momo from "../../../../public/assets/momo 1.png"
import Paypal from "../../../../public/assets/paypal 1.png"
import Credit from "../../../../public/assets/credit 1.png"
import Image from "next/image";
import Background from "../../../../public/assets/bg.png";
import Link from "next/link";
function Payment() {

    const [selectedDate, setSelectedDate] = useState<string>("");

    // Function to handle date change
    const handleDateChange = (date: string) => {
        // Update the state with the selected date
        setSelectedDate(date);

        // Extract the month and day from the selected date
        const parsedDate = new Date(date);
        const month = parsedDate.getMonth() + 1; // Months are zero-indexed
        const day = parsedDate.getDate();

        // Display the selected date (month and day) without the year
        alert(`Selected Date: ${month}-${day}`);
    };

    return (
        <div>
            <Image
                src={Background}
                className="w-full h-full fixed left-0 top-0 -z-10"
                alt="background-img"
            />
            <div className="flex flex-col justify-center items-center p-32 gap-8">
                <h1 className="font-bold text-3xl">
                    <span>Thank you for choosing </span>
                    <span className="text-blue-default ">TopStrat Pro</span>
                </h1>
                <div className="flex w-full flex-col lg:flex-row  items-center justify-center  ">
                    {" "}
                    {/* ... (other components) ... */}
                    <div className="border border-gray-400  flex flex-col gap-6 w-full  lg:w-[40%] items-center ">
                        <div className="bg-blue-default text-white w-full text-center">
                            <h3>Total amount to pay</h3>
                            <p>$27.5</p>{" "}
                        </div>
                        <p className="text-black">How would you like to pay?</p>
                        <div className="w-[60%] p-2">
                            {" "}
                            {/* ... Other radio button options ... */}
                            <div className=" border border-gray-700 rounded-md text-black flex justify-between px-3 py-2">
                                <div className="flex gap-2 items-center">
                                    <input type="radio" id="card1" name=""/>
                                    Credit card
                                </div>
                                <span>
                                    <Image
                                        src={Airtel}
                                        alt="graphics-image"
                                        width={40}
                                        height={40}
                                    />
                                </span>
                            </div>
                            <div className=" border border-gray-700 rounded-md text-black flex justify-between px-3 py-4">
                                <div className="flex gap-2 items-center">
                                    <input type="radio" id="card2" />
                                    Credit card
                                </div>
                                <span>
                                    {" "}
                                    <Image
                                        src={Momo}
                                        alt="graphics-image"
                                        width={40}
                                        height={40}
                                    />
                                </span>
                            </div>
                            <div className=" border border-gray-700 rounded-md text-black flex justify-between px-3 py-2">
                                <div className="flex gap-2 items-center">
                                    <input type="radio" id="card3" />
                                    Credit card
                                </div>
                                <span>
                                    <Image
                                        src={Paypal}
                                        alt="graphics-image"
                                        width={40}
                                        height={40}
                                    />
                                </span>
                            </div>
                            <div className=" border border-gray-700 rounded-md text-black flex justify-between px-3 py-2">
                                <div className="flex gap-2 items-center">
                                    <input type="radio" id="card4" />
                                    Credit card
                                </div>
                                <span>
                                    <Image
                                        src={Credit}
                                        alt="graphics-image"
                                        width={40}
                                        height={40}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="bg-gray-300  w-full  text-center py-5">
                            Back to subscription Packages
                        </div>
                    </div>
                    <div className="flex flex-col  px-48 gap-5 border  border-gray-400 rounded-md items-center justify-center  lg: w-[30%] py-20  lg:px-16 ">
                        <h2 className="font-bold">Your payment details</h2>
                        <div>
                            <label>Name on card</label>
                            <div>
                                <input
                                    type="text"
                                    id="card-name"
                                    className="p-5 border border-gray-400 rounded-md py-2 "
                                />
                            </div>
                        </div>
                        <div>
                            <label> card number</label>
                            <div>
                                <input
                                    type="number"
                                    id="card-num"
                                    placeholder="xxxx xxxx xxxx"
                                    className="p-5 border border-gray-400 rounded-md py-2 "
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <label>card number:</label>
                            <div className="flex gap-5">
                                <DateInput
                                    value={selectedDate}
                                    onDateChange={handleDateChange}
                                />
                                <input
                                    type="number"
                                    id="yearInput"
                                    name="yearInput"
                                    placeholder="2024"
                                    min="1900"
                                    max="2100"
                                    pattern="\d{4}"
                                    className="border border-gray-400 rounded-md py-2"
                                ></input>
                                <input
                                    type="number"
                                    id="cvv"
                                    placeholder="CVV"
                                    className="w-[20%] border border-gray-400 rounded-md py-2"
                                />
                            </div>
                        </div>
                        <div className="text-white bg-blue-default font-bold rounded-md px-14 py-2 ">
                            Pay now
                        </div>
                    </div>
                </div>
                <div className="bg-blue-default text-white font-bold px-6 py-2 absolute right-2 bottom-2 rounded-md">
                    {/* Your content goes here */}
                    <Link href="../../components/step/page.tsx">
                        Continue
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Payment;
