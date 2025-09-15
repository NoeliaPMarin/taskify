import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

export default function LogIn() {
  return (
    <div className="min-h-screen bg-[url('/images/heroBg.png')] bg-secondaryBackground bg-cover bg-center flex justify-center items-center">
      <div className="bg-background  w-[770px] rounded-[16px] border border-borderColor justifify-center items-center flex flex-col my-24">
        <img
          src="/images/logo.svg"
          alt="Taskify Logo"
          className="h-12 w-40 m-16 mb-10"
        />
        <div className="justify-start">
          <h1 className="h1 mb-6 text-primaryText">Log in to your account</h1>
          <div className="flex gap-2 mb-12">
            <h3 className="h3 text-primaryText">Don&rsquo;t have an account?</h3>
            <Link
              to="/signup"
              className="body underline text-primary hover:text-primary/80"
            >
              Sign up
            </Link>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}