import React, { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";

interface NavbarProps {
  isLoggedIn?: boolean;
  onAddTaskClick?: () => void;
}

export default function Navbar({ isLoggedIn = false, onAddTaskClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="h-20 bg-tertiary shadow-primaryShadow px-6 flex items-center justify-between">

      {/* Logo + Menu links (invitados o Task) */}
      <div className="flex items-center gap-12">
        <Link to="/">
          <img src="/images/logo.svg" alt="Taskify Logo" className="h-12 w-40 m-4" />
        </Link>

        {!isLoggedIn ? (
          <ul className="hidden min-[1180px]:flex gap-10 text-primaryText font-semibold text-[18px] leading-[20px]">
            <li><Link to={"/features"}>Features</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        ) : (
          <Link
            to="/tasks"
            className="hidden min-[1180px]:flex text-primaryText font-semibold text-[18px] leading-[20px] hover:text-primary"
          >
            Task
          </Link>
        )}
      </div>

      {/* Right block: search bar + button + avatar or login/signup */}
      {isLoggedIn ? (
        <div className="hidden min-[1180px]:flex items-center ml-auto gap-4">
          <input
            type="text"
            placeholder="Search..."
            className="border border-secondaryBackground rounded-lg px-4 py-2 w-[340px] lg:w-[491px]"
          />
          <Button variant="secondary" onClick={onAddTaskClick}>+ Add Task</Button>
          <Link to="/profile" className="h-[55px] w-[55px] flex-shrink-0">
            <UserCircleIcon className="h-full w-full text-primary" />
          </Link>
        </div>
      ) : (
        <div className="hidden min-[1180px]:flex items-center ml-auto gap-4">
          <Link to="/login" className="text-primaryText font-semibold hover:text-primary">Log In</Link>
          <Link to="/signup"><Button variant="secondary">Sign Up</Button></Link>
        </div>
      )}

      {/* Hamburger menu */}
      <div className="min-[1180px]:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <XMarkIcon className="h-8 w-8 text-gray-800" /> : <Bars3Icon className="h-8 w-8 text-gray-800" />}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-tertiary shadow-lg p-6 flex flex-col gap-4 min-[1180px]:hidden z-50">
          {!isLoggedIn ? (
            <>
              <Link to="/features">Features</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/login"><Button variant="primary" className="w-full">Log In</Button></Link>
              <Link to="/signup"><Button variant="secondary" className="w-full">Sign Up</Button></Link>
            </>
          ) : (
            <>
              <Link to="/tasks" className="text-primaryText font-semibold">Tasks</Link>
              <input
                type="text"
                placeholder="Search..."
                className="border border-secondaryBackground rounded-lg px-4 py-2 w-full"
              />
              <Button variant="secondary" onClick={onAddTaskClick}>+ Add Task</Button>
              <Link to="/profile" className="flex items-center gap-2 text-primary">
                <UserCircleIcon className="h-6 w-6" /> Profile
              </Link>
            </>
          )}
        </div>
      )}

    </nav>
  );
}
