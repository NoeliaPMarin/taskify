import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

export default function LogIn() {
  return (
    <div className="min-h-screen bg-[url('/images/heroBg.png')] bg-secondaryBackground bg-cover bg-center flex justify-center items-center px-4 sm:px-6 py-12 sm:py-24">
      <div className="bg-background w-full max-w-[770px] rounded-[16px] border border-borderColor flex flex-col items-center py-12 sm:py-16">
        {/* Logo */}
        <Link to="/">
          <img
            src="/images/logo.svg"
            alt="Taskify Logo"
            className="h-12 w-40 mb-8 sm:mb-10"
          />
        </Link>

        {/* Header */}
        <div className="w-full px-6 sm:px-12 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl mb-4 text-primaryText leading-snug sm:leading-tight">
            Log in to your account
          </h1>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-2 mb-8 sm:mb-12 text-center sm:text-left">
            <h3 className="h3 text-primaryText">Don’t have an account?</h3>
            <Link
              to="/signup"
              className="body underline text-primary hover:text-primary/80"
            >
              Sign up
            </Link>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full px-6 sm:px-12">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
