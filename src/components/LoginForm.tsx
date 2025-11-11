import Button from "./Button";
import { Link } from "react-router-dom";

export default function LoginForm() {
    return (
        <form className="w-full max-w-[507px] mx-auto flex flex-col gap-4 px-6 sm:px-0">
            <input
                type="email"
                placeholder="Email"
                className="border h-[78px] sm:h-[78px] border-secondaryBackground rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
                type="password"
                placeholder="Password"
                className="border h-[78px] sm:h-[78px] border-secondaryBackground rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Link
                to="/forgot-password"
                className="body underline text-accent hover:text-primary/80 justify-end self-end mb-6"
            >
                Forgot password?
            </Link>
            <div className="mb-16">
                <Button variant="primary" className="w-full">
                    Log In
                </Button>
            </div>
        </form>
    );
}
