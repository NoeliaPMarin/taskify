import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen bg-[url('/images/heroBg.png')] bg-secondaryBackground bg-cover bg-center flex justify-center items-center">
      <div className="bg-background  w-[770px] rounded-[16px] border border-borderColor justifify-center items-center flex flex-col my-24">
        <Link
          to="/">
          <img
            src="/images/logo.svg"
            alt="Taskify Logo"
            className="h-12 w-40 m-16 mb-10"
          />
        </Link>
        <div className="justify-start">
          <h1 className="h1 mb-8 text-primaryText">Create Your Account</h1>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}