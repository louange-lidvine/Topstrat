"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Background from "../../../../public/assets/bg.png";
import Image from "next/image";
import Prompt from "../prompt/page";

function page() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSecModalOpen, setIsSecModalOpen] = useState<boolean>(false);
    const [prompts, setPrompts] = useState<string[]>([]);
   


    const [title, setTitle] = useState("untitled");
    const handleInputChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setTitle(event.target.value);
    };

    const handleButtonClick = () => {
        setIsModalOpen(false);
        setIsSecModalOpen(true);
    };

    return (
        
      <div></div>
    );
}

export default page;
