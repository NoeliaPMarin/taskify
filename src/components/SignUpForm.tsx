import Button from "./Button";
import { Link } from "react-router-dom";

export default function LoginForm() {
    return (
        <form className="w-[507px] flex flex-col gap-4">
            <label htmlFor="text" className="mb-2 font-medium text-primaryText">
                Full name
            </label>
            <input
                type="text"
                placeholder="Your name"
                className="border h-[78px] border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <label htmlFor="email" className="mb-2 font-medium text-primaryText">
                Email
            </label>
            <input
                type="email"
                placeholder="Your email"
                className="border h-[78px] border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <label htmlFor="password" className="mb-2 font-medium text-primaryText">
                Password
            </label>
            <input
                type="password"
                placeholder="Password"
                className="border h-[78px] border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <label htmlFor="password" className="mb-2 font-medium text-primaryText">
                Confirm Password
            </label>
            <input
                type="confirmPassword"
                placeholder="Confirm Password"
                className="border h-[78px] border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="flex justify-end">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="agree"
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                    />
                    <label htmlFor="agree" className="body text-right">
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

            <div className="mb-6 mt-7">
                <Button size="lg" variant="primary">
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
                </Link>{" "}
            </p>
        </form>
    );
}