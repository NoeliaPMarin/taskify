import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-20 bg-tertiary shadow-primaryShadow px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-12 ml-[112px] ">
        <Link
          to="/">
          <img
            src="/images/logo.svg"
            alt="Taskify Logo"
            className="h-12 w-40 m-4"
          />
        </Link>

        {/* Menu links (desktop) */}
        <ul className="hidden md:flex gap-10 text-primaryText font-semibold text-[18px] leading-[20px]">
          <li><a href="#features" className="hover:text-primary">Features</a></li>
          <li><a href="#pricing" className="hover:text-primary">Pricing</a></li>
          <li><a href="#contact" className="hover:text-primary">Contact</a></li>
        </ul>
      </div>

      {/* Button Login (desktop) */}
      <div className="hidden md:flex items-center gap-4 mr-[112px]">
        <Link
          to="/login"
          className="text-primaryText font-semibold text-[18px] leading-[20px] hover:text-primary"
        >
          Log In
        </Link>
        <Link to="/signup">
          <Button variant="secondary">Sign Up</Button>
        </Link>
      </div>

      {/* Burguer menu (mobile) */}
      <div className="md:hidden">
        {isOpen ? (
          <XMarkIcon
            className="h-8 w-8 text-gray-800 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <Bars3Icon
            className="h-8 w-8 text-gray-800 cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>

      {/* Burguer menu content (mobile) */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-lg p-6 flex flex-col gap-4 md:hidden">
          <a href="#features" className="hover:text-black">Features</a>
          <a href="#pricing" className="hover:text-black">Pricing</a>
          <a href="#contact" className="hover:text-black">Contact</a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
