import Button from "./Button";
import { Link } from "react-router-dom";

export default function SignUpForm() {
    return (
        <form className="w-full max-w-md mx-auto flex flex-col gap-4 px-4 sm:px-0">
            <label htmlFor="text" className="mb-2 font-medium text-primaryText">
                Full name
            </label>
            <input
                type="text"
                placeholder="Your name"
                className="border h-[78px] w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <label htmlFor="email" className="mb-2 font-medium text-primaryText">
                Email
            </label>
            <input
                type="email"
                placeholder="Your email"
                className="border h-[78px] w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <label htmlFor="password" className="mb-2 font-medium text-primaryText">
                Password
            </label>
            <input
                type="password"
                placeholder="Password"
                className="border h-[78px] w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <label htmlFor="confirmPassword" className="mb-2 font-medium text-primaryText">
                Confirm Password
            </label>
            <input
                type="password"
                placeholder="Confirm Password"
                className="border h-[78px] w-full border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="flex justify-start">
                <div className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        id="agree"
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary mt-1"
                    />
                    <label htmlFor="agree" className="body text-left">
                        I agree to the{" "}
                        <Link
                            to="/terms"
                            className="underline text-accent hover:text-accent/80"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            to="/privacy"
                            className="underline text-accent hover:text-accent/80"
                        >
                            Privacy Policy
                        </Link>
                    </label>
                </div>
            </div>

            <div className="mt-6 mb-4 w-full">
                <Button className="w-full" variant="primary">
                    Sign Up
                </Button>
            </div>

            <p className="body text-center mb-16">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="underline text-accent hover:text-accent/80"
                >
                    Log In
                </Link>
            </p>
        </form>
    );
}
