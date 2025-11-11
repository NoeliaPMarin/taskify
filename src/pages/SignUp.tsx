import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-[url('/images/heroBg.png')] bg-secondaryBackground bg-cover bg-center flex justify-center items-center px-4 sm:px-6 py-12">
      <div className="bg-background w-full max-w-md sm:max-w-lg md:max-w-xl rounded-[16px] border border-borderColor flex flex-col items-center px-6 py-10 sm:py-16">
        {/* Logo */}
        <Link to="/" className="mb-8">
          <img
            src="/images/logo.svg"
            alt="Taskify Logo"
            className="h-12 w-40"
          />
        </Link>

        {/* Título */}
        <h1 className="text-3xl  text-primaryText text-center mb-8 text-[24px] sm:text-[32px] md:text-[36px]">
          Create Your Account
        </h1>

        {/* Formulario */}
        <SignUpForm />
      </div>
    </div>
  );
}
