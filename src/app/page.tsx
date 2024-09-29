"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Office from "../../public/assets/At the office.png";
import Background from "../../public/assets/bg.png";
import logo from '../../public/assets/logo.png'
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // For hamburger and close icons



function Page() {
    const navigate = useRouter()
    
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            <Image
                src={Background}
                className="w-full h-full fixed left-0 top-0 object-cover"
                alt="background-img"
            />
            <div className="relative min-h-screen  text-gray-900">
                {/* <nav className="flex justify-between items-center p-4 fixed top-0 w-full bg-white shadow-lg z-20">
                    <div className="flex items-center">
                        <a
                            href="#home"
                            className="text-2xl font-bold text-blue-default"
                        >
                            <Image
                                src={logo}
                                alt="alt"
                                width={50}
                                height={50}
                            />
                        </a>
                        <h1 className="font-bold text-xl text-blue-default">
                            TOPSTRAT
                        </h1>
                    </div>

                    <div className="flex items-center space-x-6 font-semibold text-gray-700">
                        <Link
                            href="#home"
                            className="hover:text-blue-default transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="#services"
                            className="hover:text-blue-default transition-colors"
                        >
                            Services
                        </Link>
                        <Link
                            href="#about"
                            className="hover:text-blue-default transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="#pricing"
                            className="hover:text-blue-default transition-colors"
                        >
                            Payment
                        </Link>
                        <Link
                            href="#contacts"
                            className="hover:text-blue-default transition-colors"
                        >
                            Contacts
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            href="/Pages/signIn"
                            className="font-semibold hover:text-blue-default transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link href="/Pages/signup">
                            <button className="bg-blue-default text-white px-6 py-2 rounded-full  transition-all">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </nav> */}

 <nav className="fixed top-0 w-full bg-white shadow-lg z-20">
            <div className="flex justify-between items-center p-4">
                {/* Logo */}
                <div className="flex items-center">
                    <a href="#home" className="text-2xl font-bold text-blue-default">
                        <Image src={logo} alt="alt" width={50} height={50} />
                    </a>
                    <h1 className="font-bold text-xl text-blue-default ml-2">TOPSTRAT</h1>
                </div>

                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>

                {/* Desktop Menu Links */}
                <div className="hidden md:flex items-center space-x-6 font-semibold text-gray-700">
                    <Link href="#home" className="hover:text-blue-default transition-colors">Home</Link>
                    <Link href="#services" className="hover:text-blue-default transition-colors">Services</Link>
                    <Link href="#about" className="hover:text-blue-default transition-colors">About</Link>
                    <Link href="#pricing" className="hover:text-blue-default transition-colors">Payment</Link>
                    <Link href="#contacts" className="hover:text-blue-default transition-colors">Contacts</Link>
                </div>

                {/* Sign In and Sign Up Buttons (Desktop) */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/Pages/signIn" className="font-semibold hover:text-blue-default transition-colors">Sign In</Link>
                    <Link href="/Pages/signup">
                        <button className="bg-blue-default text-white px-6 py-2 rounded-full transition-all">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>

            <div className={`absolute top-0 left-0 w-full bg-white transition-all duration-300 ${menuOpen ? 'h-screen' : 'h-0'} overflow-hidden`}>
                <div className="flex flex-col items-center justify-center space-y-6 mt-20 font-semibold text-gray-700">
                    <Link href="#home" className="hover:text-blue-default transition-colors" onClick={toggleMenu}>Home</Link>
                    <Link href="#services" className="hover:text-blue-default transition-colors" onClick={toggleMenu}>Services</Link>
                    <Link href="#about" className="hover:text-blue-default transition-colors" onClick={toggleMenu}>About</Link>
                    <Link href="#pricing" className="hover:text-blue-default transition-colors" onClick={toggleMenu}>Payment</Link>
                    <Link href="#contacts" className="hover:text-blue-default transition-colors" onClick={toggleMenu}>Contacts</Link>
                    <Link href="/Pages/signIn" className="hover:text-blue-default transition-colors" onClick={toggleMenu}>Sign In</Link>
                    <Link href="/Pages/signup">
                        <button className="bg-blue-default text-white px-6 py-2 rounded-full transition-all">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </nav>




                <section
                    id="home"
                    className="flex flex-col-reverse md:flex-row items-center justify-between py-20 px-8 md:px-20 min-h-screen"
                >
                    <div className="flex flex-col gap-6 md:w-1/2">
                        <h1 className="text-5xl font-bold text-blue-default">
                            Strategic Planning
                        </h1>
                        <p className="text-lg leading-relaxed">
                            A strategic plan is a comprehensive document that
                            outlines an organization's long-term goals and the
                            actions necessary to achieve those goals.
                        </p>
                        <Link href="/Pages/signup">
                            <button className="bg-blue-default text-white rounded-full px-10 py-3 font-bold shadow-lg hover:bg-blue-default transition-all">
                                Get Started
                            </button>
                        </Link>
                    </div>
                    <Image
                        src={Office}
                        alt="Office"
                        width={600}
                        height={600}
                        className=" object-cover"
                    />
                </section>

                <section id="about" className="bg-gray-100 py-24 px-8 md:px-28">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-blue-default">
                            Who We Are
                        </h2>
                        <p className="mt-6 text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto">
                            We are a team of seasoned professionals committed to
                            empowering organizations through strategic planning
                            and innovative, data-driven solutions. Our mission
                            is to partner with companies, crafting unique
                            strategies that ensure sustainable growth and
                            long-term success.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                        <div className="bg-white shadow-md p-8 rounded-lg">
                            <h3 className="text-2xl font-semibold text-blue-default mb-4">
                                Our Core Values
                            </h3>
                            <ul className="space-y-4 text-lg leading-relaxed text-gray-700">
                                <li>
                                    <strong>Client-Centered Solutions:</strong>{" "}
                                    Tailored strategies that focus on
                                    client-specific needs and goals.
                                </li>
                                <li>
                                    <strong>Innovative Thinking:</strong>{" "}
                                    Creative problem-solving leveraging the
                                    latest technologies.
                                </li>
                                <li>
                                    <strong>Integrity & Transparency:</strong>{" "}
                                    Upholding ethical standards in all our work.
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white shadow-md p-8 rounded-lg">
                            <h3 className="text-2xl font-semibold text-blue-default mb-4">
                                Our Vision
                            </h3>
                            <p className="text-lg leading-relaxed text-gray-700">
                                To be the trusted global leader in strategic
                                consulting, enabling organizations to transform
                                their vision into sustainable success and
                                measurable outcomes.
                            </p>
                        </div>
                    </div>
                </section>

                <section
                    id="services"
                    className="bg-gray-50 py-24 px-8 md:px-20 text-center"
                >
                    <h2 className="text-4xl font-bold text-blue-default mb-8">
                        Our Services
                    </h2>
                    <p className="text-lg leading-relaxed mb-8">
                        We offer a range of strategic services designed to help
                        organizations achieve their long-term goals. Our
                        services include:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-blue-default">
                                Strategic Planning
                            </h3>
                            <p className="mt-4 text-gray-700">
                                Comprehensive planning to help businesses and
                                organizations structure their goals and
                                strategies.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-blue-default">
                                Market Research
                            </h3>
                            <p className="mt-4 text-gray-700">
                                In-depth market research to provide valuable
                                insights for business growth and
                                decision-making.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-blue-default">
                                Operational Consulting
                            </h3>
                            <p className="mt-4 text-gray-700">
                                Improve operational efficiency with targeted
                                solutions to streamline processes and increase
                                productivity.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold text-blue-default">
                                Leadership Training
                            </h3>
                            <p className="mt-4 text-gray-700">
                                Empower your team with top-notch leadership and
                                management training programs.
                            </p>
                        </div>
                    </div>
                </section>

                <section
                    id="pricing"
                    className="bg-gray-100 py-24 px-8 md:px-20 text-center"
                >
                    <h2 className="text-4xl font-bold text-blue-default mb-8">
                        Pricing Plans for Everyone
                    </h2>
                    <p className="text-lg mb-12">
                        Choose a plan that best suits your needs. Whether you're
                        just starting out or looking for advanced features, we
                        have something for everyone. Each package comes with a
                        free trial for the first month, offering all features of
                        the selected plan except for data retention after the
                        trial, and exporting to Word. During the trial, all PDFs
                        will include our TopSkills logo
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-1  gap-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* <h1 className="text-2xl font-bold mb-4 text-blue-default">
                                Premium Packages
                            </h1> */}
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-bold mb-4 text-blue-default">
                                    Basic
                                </h3>
                                <p className="text-xl font-bold text-gray-700 mb-4">
                                    $25/month or $260/year
                                </p>
                                <ul className="text-left mb-6">
                                    <li className="mb-2">
                                        ✓ View the platform
                                    </li>
                                    <li className="mb-2">
                                        ✓ Receive information about strategic
                                        planning
                                    </li>
                                    <li className="mb-2">✓ General advice</li>
                                    <li className="mb-2">✓ 1 Project</li>
                                    <li className="mb-2">
                                        ✓ 2 Devices Supported
                                    </li>
                                    <li className="mb-2">✓ 1 Team Member</li>
                                    <li className="mb-2">
                                        ✓ Export Strategic plan as PDF
                                    </li>
                                </ul>
                                <button className="bg-blue-default text-white rounded-full px-6 py-3 font-bold hover:bg-blue-700 transition-all"     onClick={()=>navigate.push('/Pages/signup')}>
                                    Buy Plan
                                </button>
                            </div>

                            {/* Professional Plan */}
                            <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-blue-default">
                                <h3 className="text-2xl font-bold mb-4 text-blue-default">
                                    Professional
                                </h3>
                                <p className="text-xl font-bold text-gray-700 mb-4">
                                    $65/month or $675/year
                                </p>
                                <ul className="text-left mb-6">
                                    <li className="mb-2">
                                        ✓ All features in Basic plan
                                    </li>
                                    <li className="mb-2">
                                        ✓ Editable projects
                                    </li>
                                    <li className="mb-2">
                                        ✓ Reporting possibilities
                                    </li>
                                    <li className="mb-2">✓ Team working</li>
                                    <li className="mb-2">✓ 5 Projects</li>
                                    <li className="mb-2">
                                        ✓ 5 Devices Supported
                                    </li>
                                    <li className="mb-2">✓ 5 Team Members</li>
                                    <li className="mb-2">✓ 5 Team Members</li>
                                    <li className="mb-2">
                                        ✓ Export Strategic plan as PDF
                                    </li>
                                </ul>
                                <button className="bg-blue-default text-white rounded-full px-6 py-3 font-bold hover:bg-blue-700 transition-all"     onClick={()=>navigate.push("/Pages/signup")}>
                                    Buy Plan
                                </button>
                            </div>

                            {/* Elite Plan */}
                            <div className="bg-white p-8 rounded-lg shadow-lg">
                                <h3 className="text-2xl font-bold mb-4 text-blue-default">
                                    Elite
                                </h3>
                                <p className="text-xl font-bold text-gray-700 mb-4">
                                    $95/month or $980/year
                                </p>
                                <ul className="text-left mb-6">
                                    <li className="mb-2">
                                        ✓ All features in Professional plan
                                    </li>
                                    <li className="mb-2">✓ M&E Framework</li>
                                    <li className="mb-2">
                                        ✓ Unlimited Projects
                                    </li>
                                    <li className="mb-2">
                                        ✓ Unlimited Devices Supported
                                    </li>
                                    <li className="mb-2">
                                        ✓ Unlimited Team Members
                                    </li>
                                    <li className="mb-2">
                                        ✓ Export Strategic plan as Word
                                    </li>
                                </ul>
                                <button className="bg-blue-default text-white rounded-full px-6 py-3 font-bold hover:bg-blue-700 transition-all"     onClick={()=>navigate.push("/Pages/signup")}>
                                    Buy Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <footer
                    id="contacts"
                    className="bg-gray-900 py-16 px-8 md:px-28 text-white"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white">
                                TOPSTRAT
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                We help organizations achieve their strategic
                                goals through tailored solutions and
                                professional consulting. Contact us for
                                personalized strategies that will help your
                                business thrive.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white">
                                Quick Links
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <Link
                                        href="/"
                                        className="text-white transition-all"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/pages/services"
                                        className="text-white transition-all"
                                    >
                                        Services
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/pages/about"
                                        className="text-white transition-all"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/pages/contacts"
                                        className="text-white transition-all"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white">
                                Contact Us
                            </h3>
                            <p className="text-white">
                                Email:{" "}
                                <a
                                    href="mailto:topstrat@gmail.com"
                                    className="text-white hover:underline"
                                >
                                    info@company.com
                                </a>
                            </p>
                            <p className="text-white">
                                Phone:{" "}
                                <a
                                    href="tel:+250786021869"
                                    className="text-white hover:underline"
                                >
                                    +250 788 602 1869
                                </a>
                            </p>
                            <p className="text-white">Address: Kigali-Rwanda</p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white">
                                Follow Us
                            </h3>
                            <div className="flex space-x-6">
                                <a
                                    href="#"
                                    className="text-blue-default  transition-all text-2xl"
                                >
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a
                                    href="#"
                                    className="text-blue-default  transition-all text-2xl"
                                >
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a
                                    href="#"
                                    className="text-blue-default  transition-all text-2xl"
                                >
                                    <i className="fab fa-linkedin"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 border-t border-gray-700 pt-6 text-center">
                        <p className="text-gray-500">
                            © {new Date().getFullYear()} TOPSTRAT. All Rights
                            Reserved.
                        </p>
                        <Link href="#home">
                            <button className="mt-4 bg-blue-default text-white rounded-full px-6 py-3 font-bold shadow-lg transition-all">
                                Back to Top
                            </button>
                        </Link>
                    </div>
                </footer> */}


                <footer
    id="contacts"
    className="bg-gray-900 py-16 px-8 md:px-28 text-white"
>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">
                TOPSTRAT
            </h3>
            <p className="text-gray-300 leading-relaxed">
                We help organizations achieve their strategic goals through
                tailored solutions and professional consulting. Contact us for
                personalized strategies that will help your business thrive.
            </p>
        </div>

        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">
                Quick Links
            </h3>
            <ul className="space-y-4">
                <li>
                    <Link
                        href="/"
                        className="text-white transition-all"
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href="/pages/services"
                        className="text-white transition-all"
                    >
                        Services
                    </Link>
                </li>
                <li>
                    <Link
                        href="/pages/about"
                        className="text-white transition-all"
                    >
                        About Us
                    </Link>
                </li>
                <li>
                    <Link
                        href="/pages/contacts"
                        className="text-white transition-all"
                    >
                        Contact
                    </Link>
                </li>
            </ul>
        </div>

        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">
                Contact Us
            </h3>
            <p className="text-white">
                Email:{" "}
                <a
                    href="mailto:topstrat@gmail.com"
                    className="text-white hover:underline"
                >
                    info@company.com
                </a>
            </p>
            <p className="text-white">
                Phone:{" "}
                <a
                    href="tel:+250786021869"
                    className="text-white hover:underline"
                >
                    +250 788 602 1869
                </a>
            </p>
            <p className="text-white">Address: Kigali-Rwanda</p>
        </div>

        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">
                Follow Us
            </h3>
            <div className="flex space-x-6">
                <a
                    href="#"
                    className="text-blue-default  transition-all text-2xl"
                >
                    <i className="fab fa-facebook"></i>
                </a>
                <a
                    href="#"
                    className="text-blue-default  transition-all text-2xl"
                >
                    <i className="fab fa-twitter"></i>
                </a>
                <a
                    href="#"
                    className="text-blue-default  transition-all text-2xl"
                >
                    <i className="fab fa-linkedin"></i>
                </a>
            </div>
        </div>
    </div>

    {/* Terms and Conditions, Privacy Policy, Data Management Links */}
    <div className="mt-12 text-center space-y-4">
        <Link href="https://acrobat.adobe.com/id/urn:aaid:sc:EU:02f8bcc9-0062-4a47-8fb4-d43664dccf55" className="text-white hover:underline">
            Terms and Conditions
        </Link>
        <span className="text-gray-400 mx-2">|</span>
        <Link href="https://acrobat.adobe.com/id/urn:aaid:sc:EU:37ac33dd-809a-4234-baff-c7d9b944fb19" className="text-white hover:underline">
            Privacy and data management policy
        </Link>
   
    </div>

    <div className="mt-16 border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-500">
            © {new Date().getFullYear()} TOPSTRAT. All Rights Reserved.
        </p>
        <Link href="#home">
            <button className="mt-4 bg-blue-default text-white rounded-full px-6 py-3 font-bold shadow-lg transition-all">
                Back to Top
            </button>
        </Link>
    </div>
</footer>

            </div>
        </div>
    );
}

export default Page;
