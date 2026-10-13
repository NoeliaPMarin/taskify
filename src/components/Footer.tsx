import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { user } = useAuth();
  return (
    <footer className="bg-primary">
      <div className="px-6 py-8 flex flex-col items-center md:flex-row md:justify-between md:px-[112px]">

        {/* Logo */}
        <Link to="/">
          <img
            src="/images/logoWhite.svg"
            alt="Taskify Logo"
            className="h-12 w-40 mb-6 md:mb-0"
          />
        </Link>

        {/* Links */}
        <ul className="flex flex-col items-center gap-4 text-background font-semibold text-[18px] md:flex-row md:gap-10">
          {user ? <><li><Link to="/tasks">Tasks</Link></li><li><Link to="/profile">Profile</Link></li></> : <><li><Link to="/features">Features</Link></li><li><Link to="/pricing">Pricing</Link></li><li><Link to="/contact">Contact</Link></li></>}
        </ul>
      </div>

      <div className="h-[2px] bg-background opacity-30 my-8"></div>

      <p className="text-background text-center pb-8 font-body">
        © {new Date().getFullYear()} Taskify. All rights reserved.
      </p>
    </footer>
  );
}
